"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, RotateCcw, Sparkles, Square } from "lucide-react";
import { profile } from "@/lib/profile";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

type Message = { id: number; role: "user" | "assistant"; content: string };

const suggestions = [
  "What did you work on at Google?",
  "Which clouds are you certified in?",
  "Tell me about the MedWatch lakehouse.",
  "Do you have Terraform and Kubernetes experience?",
  "What kind of role are you looking for?",
];

const greeting = `Hi, I'm Ikenna's digital twin. Ask me anything about his twelve years in data engineering: Google, PwC, the hyperscaler certifications, or the lakehouse and MLOps work.`;

const BULLET = /^([-*•]|\d+[.)])\s+/;

/** The twin is told to write prose, but render any stray markdown cleanly anyway. */
function toBlocks(content: string) {
  return content
    .split(/\n{2,}/)
    .map((chunk) =>
      chunk
        .split("\n")
        .map((line) => line.trim().replace(/\*\*/g, ""))
        .filter((line) => line !== ""),
    )
    .filter((lines) => lines.length > 0)
    .map((lines) =>
      lines.every((line) => BULLET.test(line))
        ? { type: "list" as const, items: lines.map((line) => line.replace(BULLET, "")) }
        : { type: "text" as const, items: [lines.join(" ")] },
    );
}

export function DigitalTwin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const nextId = useRef(0);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const question = text.trim();
    if (question === "" || streaming) return;

    const history = [...messages, { id: nextId.current++, role: "user" as const, content: question }];
    const replyId = nextId.current++;

    setMessages([...history, { id: replyId, role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const detail = await response.json().catch(() => null);
        throw new Error(detail?.error ?? "The twin is unavailable right now.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((message) =>
            message.id === replyId
              ? { ...message, content: message.content + chunk }
              : message,
          ),
        );
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      const detail = error instanceof Error ? error.message : "Something went wrong.";
      setMessages((current) =>
        current.map((message) =>
          message.id === replyId
            ? { ...message, content: `${detail} You can always reach Ikenna at ${profile.email}.` }
            : message,
        ),
      );
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function reset() {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setStreaming(false);
  }

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36">
      <div className="shell">
        <SectionHeading
          index="04"
          kicker="Digital twin"
          title="Ask my digital twin."
          lede="An AI trained on my CV, answering questions about my career in my own voice. Ask it what I actually did at Google, or whether I have shipped what you need."
        />

        <Reveal delay={0.1}>
          <div className="panel mt-14 overflow-hidden">
            <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="relative grid h-10 w-10 place-items-center rounded-lg bg-signal font-display text-sm font-bold text-white">
                  {profile.initials}
                  <span
                    className={cn(
                      "absolute -right-1 -bottom-1 h-2.5 w-2.5 rounded-full border-2 border-card",
                      streaming ? "animate-pulse-dot bg-ember" : "bg-signal",
                    )}
                  />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-text">
                    Digital Twin
                  </p>
                  <p className="font-mono text-[0.6rem] tracking-[0.16em] text-dim uppercase">
                    {streaming ? "Thinking" : "Online"} · gpt-oss-120b
                  </p>
                </div>
              </div>

              {messages.length > 0 ? (
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 font-mono text-[0.6rem] tracking-[0.16em] text-dim uppercase transition-colors duration-300 hover:border-signal/50 hover:text-signal"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              ) : null}
            </header>

            <div
              ref={scrollRef}
              className="max-h-[26rem] min-h-[14rem] space-y-6 overflow-y-auto px-5 py-7 sm:px-7"
            >
              {messages.length === 0 ? (
                <div className="flex gap-4">
                  <Sparkles
                    className="mt-0.5 h-4 w-4 shrink-0 text-signal"
                    strokeWidth={1.8}
                  />
                  <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {greeting}
                  </p>
                </div>
              ) : null}

              {messages.map((message) =>
                message.role === "user" ? (
                  <div key={message.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-xl border border-signal/25 bg-tint px-4 py-3 text-sm leading-relaxed text-text sm:text-base">
                      {message.content}
                    </p>
                  </div>
                ) : (
                  <div key={message.id} className="flex gap-4">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-signal font-mono text-[0.6rem] font-bold text-white">
                      {profile.initials}
                    </span>
                    <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-muted sm:text-base">
                      {message.content === "" ? (
                        <span className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.16em] text-dim uppercase">
                          Thinking
                          <span className="animate-blink">_</span>
                        </span>
                      ) : (
                        toBlocks(message.content).map((block, i) =>
                          block.type === "list" ? (
                            <ul key={i} className="space-y-2">
                              {block.items.map((item, j) => (
                                <li key={j} className="flex gap-3">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p key={i}>{block.items[0]}</p>
                          ),
                        )
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="border-t border-line bg-card/60 px-5 py-5 sm:px-7">
              {messages.length === 0 ? (
                <ul className="mb-4 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => send(suggestion)}
                      className="rounded-md border border-line bg-card px-3 py-2 text-left text-xs text-muted transition-colors duration-300 hover:border-signal/50 hover:bg-tint hover:text-signal"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-3"
              >
                <label htmlFor="twin-input" className="sr-only">
                  Ask the digital twin a question
                </label>
                <textarea
                  id="twin-input"
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Ask about my career..."
                  maxLength={2000}
                  className="max-h-32 min-h-11 flex-1 resize-none rounded-lg border border-line bg-card px-4 py-3 text-sm text-text placeholder:text-dim focus:border-signal/60 focus:outline-none"
                />

                {streaming ? (
                  <button
                    type="button"
                    onClick={() => abortRef.current?.abort()}
                    aria-label="Stop generating"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors duration-300 hover:border-signal/50 hover:text-signal"
                  >
                    <Square className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={input.trim() === ""}
                    aria-label="Send question"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-signal text-white transition-all duration-300 hover:bg-text disabled:cursor-not-allowed disabled:bg-line disabled:text-dim"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                )}
              </form>

              <p className="mt-3 font-mono text-[0.58rem] leading-relaxed tracking-[0.12em] text-dim uppercase">
                AI generated from Ikenna&apos;s CV · May be imprecise · Verify anything
                that matters
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
