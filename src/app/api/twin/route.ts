import { systemPrompt } from "@/lib/twin-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "openai/gpt-oss-120b";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const MAX_TURNS = 12;
const MAX_CHARS = 2000;

type Turn = { role: "user" | "assistant"; content: string };

function parseTurns(value: unknown): Turn[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;

  const turns = value.slice(-MAX_TURNS).map((item) => {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.trim() === "") return null;
    return { role, content: content.slice(0, MAX_CHARS) } satisfies Turn;
  });

  return turns.every((turn): turn is Turn => turn !== null) ? turns : null;
}

/** Converts OpenRouter's SSE stream into a plain text stream of content deltas. */
function toTextStream(body: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = body.getReader();
      let buffer = "";
      let sent = 0;

      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            // OpenRouter sends ": OPENROUTER PROCESSING" comments as keep-alives.
            if (trimmed === "" || trimmed.startsWith(":")) continue;
            if (!trimmed.startsWith("data:")) continue;

            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") {
              controller.close();
              await reader.cancel();
              return;
            }

            try {
              const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta !== "") {
                controller.enqueue(encoder.encode(delta));
                sent += delta.length;
              }
            } catch {
              // Ignore partial or malformed frames.
            }
          }
        }

        if (sent === 0) {
          controller.enqueue(
            encoder.encode("I could not put an answer together just then. Please try again."),
          );
        }
        controller.close();
      } catch (error) {
        console.error("Twin stream failed", error);
        controller.error(error);
      }
    },
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY ?? process.env.OPENROUTER;

  if (!apiKey) {
    return Response.json(
      { error: "The digital twin is not configured. Set OPENROUTER in .env." },
      { status: 500 },
    );
  }

  let turns: Turn[] | null;
  try {
    const body = await request.json();
    turns = parseTurns(body?.messages);
  } catch {
    turns = null;
  }

  if (!turns) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": new URL(request.url).origin,
        "X-Title": "Ikenna Chuks Okolo Digital Twin",
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.35,
        // gpt-oss spends tokens on reasoning before it emits any content, so the
        // ceiling has to cover both and reasoning effort stays low for latency.
        max_tokens: 1600,
        reasoning: { effort: "low" },
        provider: { sort: "throughput" },
        messages: [{ role: "system", content: systemPrompt }, ...turns],
      }),
    });
  } catch (error) {
    console.error("OpenRouter request failed", error);
    return Response.json(
      { error: "Could not reach OpenRouter. Check your connection." },
      { status: 502 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("OpenRouter error", upstream.status, detail);
    return Response.json(
      { error: `The twin is unavailable right now (${upstream.status}).` },
      { status: 502 },
    );
  }

  return new Response(toTextStream(upstream.body), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
