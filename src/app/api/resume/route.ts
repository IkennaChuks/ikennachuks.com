import { extractJsonObject } from "@/lib/extract-json";
import { fetchJobDescription } from "@/lib/fetch-job";
import { resumeSystemPrompt } from "@/lib/resume-prompt";
import { parseResumeDraft } from "@/lib/resume-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = "openai/gpt-oss-120b";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const MAX_JD = 16_000;

function readContent(payload: unknown): string {
  if (typeof payload !== "object" || payload === null) return "";
  const choice = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choice) || choice.length === 0) return "";
  const message = (choice[0] as { message?: { content?: unknown } }).message;
  if (typeof message?.content === "string") return message.content;
  if (Array.isArray(message?.content)) {
    return message.content
      .map((part) =>
        typeof part === "string"
          ? part
          : typeof part === "object" && part !== null && "text" in part
            ? String((part as { text: unknown }).text)
            : "",
      )
      .join("");
  }
  return "";
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY ?? process.env.OPENROUTER;

  if (!apiKey) {
    return Response.json(
      { error: "Quick Resume is not configured. Set OPENROUTER in .env." },
      { status: 500 },
    );
  }

  let url = "";
  let description = "";
  try {
    const body = await request.json();
    url = typeof body?.url === "string" ? body.url.trim() : "";
    description = typeof body?.description === "string" ? body.description.trim() : "";
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (url === "" && description === "") {
    return Response.json(
      { error: "Paste a job description or provide a posting URL." },
      { status: 400 },
    );
  }

  let jobText = description.slice(0, MAX_JD);
  let source: "url" | "paste" = "paste";

  if (url !== "") {
    try {
      jobText = await fetchJobDescription(url);
      source = "url";
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not read that URL.";
      if (description.length < 80) {
        return Response.json({ error: message }, { status: 400 });
      }
      jobText = description.slice(0, MAX_JD);
      source = "paste";
    }
  }

  if (jobText.length < 80) {
    return Response.json(
      { error: "That job description is too short to tailor a resume." },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": new URL(request.url).origin,
        "X-Title": "Ikenna Chuks Okolo Quick Resume",
      },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        temperature: 0.35,
        max_tokens: 4500,
        reasoning: { effort: "low" },
        provider: { sort: "throughput" },
        messages: [
          { role: "system", content: resumeSystemPrompt },
          {
            role: "user",
            content: `Draft the tailored resume JSON for this job posting:\n\n${jobText}`,
          },
        ],
      }),
    });
  } catch (error) {
    console.error("OpenRouter resume request failed", error);
    return Response.json(
      { error: "Could not reach the drafting service. Check your connection." },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error("OpenRouter resume error", upstream.status, detail);
    return Response.json(
      { error: `The drafter is unavailable right now (${upstream.status}).` },
      { status: 502 },
    );
  }

  let payload: unknown;
  try {
    payload = await upstream.json();
  } catch {
    return Response.json(
      { error: "The drafter returned an unreadable response." },
      { status: 502 },
    );
  }

  const content = readContent(payload);
  if (content.trim() === "") {
    return Response.json(
      { error: "The drafter returned an empty draft. Please try again." },
      { status: 502 },
    );
  }

  try {
    const draft = parseResumeDraft(extractJsonObject(content));
    if (!draft) {
      return Response.json(
        { error: "The draft could not be parsed. Please try again." },
        { status: 502 },
      );
    }
    return Response.json({ source, draft });
  } catch (error) {
    console.error("Resume JSON parse failed", error, content.slice(0, 400));
    return Response.json(
      { error: "The draft could not be parsed. Please try again." },
      { status: 502 },
    );
  }
}
