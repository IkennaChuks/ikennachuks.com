"use client";

import { useRef, useState, type FormEvent } from "react";
import { Check, Copy, FileDown, Link2, LoaderCircle, Upload, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { resumeFilename, resumeToPdf } from "@/lib/resume-pdf";
import type { ResumeDraft } from "@/lib/resume-types";

type Mode = "url" | "paste";

function toPlainText(draft: ResumeDraft) {
  const heading = draft.credential
    ? `${draft.name}, ${draft.credential}`
    : draft.name;
  const lines = [
    heading,
    draft.headline,
    [draft.location, draft.email, draft.phone, draft.linkedinLabel]
      .filter(Boolean)
      .join("  |  "),
    "",
    "PROFESSIONAL SUMMARY",
    draft.summary,
    "",
  ];

  if (draft.skills.length > 0) {
    lines.push("SKILLS");
    for (const group of draft.skills) {
      lines.push(`${group.label}: ${group.items.join(", ")}`);
    }
    lines.push("");
  }

  lines.push("EXPERIENCE");
  for (const position of draft.experience) {
    lines.push("");
    lines.push(`${position.company}  |  ${position.span}`);
    for (const role of position.roles) {
      lines.push(
        [role.title, role.period, role.location].filter(Boolean).join("  |  "),
      );
    }
    for (const bullet of position.bullets) {
      lines.push(`- ${bullet}`);
    }
  }

  if (draft.education.length > 0) {
    lines.push("", "EDUCATION");
    for (const item of draft.education) {
      lines.push(
        `${item.qualification}, ${item.school}, ${item.place} (${item.period})`,
      );
    }
  }

  if (draft.certifications.length > 0) {
    lines.push("", "CERTIFICATIONS");
    for (const cert of draft.certifications) {
      lines.push(`${cert.name}, ${cert.issuer}`);
    }
  }

  return lines.join("\n");
}

export function QuickResumeForm() {
  const [mode, setMode] = useState<Mode>("url");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<ResumeDraft | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const sheetRef = useRef<HTMLElement>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;

    setError("");
    setBusy(true);
    setCopied(false);

    try {
      const body = new FormData();
      body.set("url", mode === "url" ? url : "");
      body.set("description", description);
      if (resumeFile) body.set("resume", resumeFile);

      const response = await fetch("/api/resume", {
        method: "POST",
        body,
      });
      const payload = (await response.json()) as {
        error?: string;
        draft?: ResumeDraft;
      };
      if (!response.ok || !payload.draft) {
        setError(payload.error ?? "Could not draft a resume from that posting.");
        return;
      }
      setDraft(payload.draft);
      requestAnimationFrame(() => {
        sheetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setError("Could not reach the drafter. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function copyText() {
    if (!draft) return;
    await navigator.clipboard.writeText(toPlainText(draft));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function downloadPdf() {
    if (!draft || downloading) return;
    setDownloading(true);
    try {
      const bytes = await resumeToPdf(draft);
      const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = resumeFilename(draft);
      link.click();
      URL.revokeObjectURL(href);
    } catch {
      setError("Could not build the PDF. Try again.");
    } finally {
      setDownloading(false);
    }
  }

  const covered = draft?.checklist.filter((item) => item.covered).length ?? 0;
  const total = draft?.checklist.length ?? 0;
  const displayName = draft
    ? draft.credential
      ? `${draft.name}, ${draft.credential}`
      : draft.name
    : "";

  return (
    <div className="space-y-12">
      <form onSubmit={submit} className="panel print:hidden p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["url", "Job URL"],
              ["paste", "Paste description"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={cn(
                "rounded-lg px-4 py-2 font-mono text-[0.65rem] tracking-[0.16em] uppercase transition-colors duration-300",
                mode === value
                  ? "bg-signal text-white"
                  : "border border-line bg-card text-muted hover:text-text",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === "url" ? (
          <label className="mt-6 block">
            <span className="kicker">Posting URL</span>
            <input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://"
              required
              className="mt-3 w-full rounded-lg border border-line bg-card px-4 py-3 text-sm text-text placeholder:text-dim focus:border-signal/60 focus:outline-none"
            />
            <span className="mt-2 block text-xs leading-relaxed text-muted">
              Public pages work best. If the board hides the text, paste the description below as well.
            </span>
          </label>
        ) : null}

        <label className="mt-6 block">
          <span className="kicker">
            {mode === "url" ? "Optional paste" : "Job description"}
          </span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required={mode === "paste"}
            rows={mode === "paste" ? 12 : 5}
            placeholder="Paste the full job description, including requirements and nice-to-haves."
            className="mt-3 w-full resize-y rounded-lg border border-line bg-card px-4 py-3 text-sm leading-relaxed text-text placeholder:text-dim focus:border-signal/60 focus:outline-none"
          />
        </label>

        <div className="mt-6">
          <span className="kicker">Your resume (optional)</span>
          {resumeFile ? (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-line bg-card px-4 py-3">
              <p className="truncate text-sm text-text">{resumeFile.name}</p>
              <button
                type="button"
                onClick={() => setResumeFile(null)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted transition-colors hover:text-text"
                aria-label="Remove resume"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-line bg-card px-4 py-4 text-sm text-muted transition-colors hover:border-signal/50 hover:text-text">
              <Upload className="h-4 w-4 shrink-0 text-signal" />
              <span>
                Upload a PDF or .txt resume.
              </span>
              <input
                type="file"
                accept=".pdf,.txt,application/pdf,text/plain"
                className="sr-only"
                onChange={(event) => {
                  setResumeFile(event.target.files?.[0] ?? null);
                  event.target.value = "";
                }}
              />
            </label>
          )}
        </div>

        {error ? (
          <p className="mt-5 rounded-lg border border-ember/30 bg-ember/8 px-4 py-3 text-sm text-ember">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3.5 font-mono text-[0.7rem] tracking-[0.16em] text-white uppercase transition-all duration-300 hover:bg-text disabled:cursor-not-allowed disabled:bg-line disabled:text-dim"
          >
            {busy ? (
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <FileDown className="h-3.5 w-3.5" />
            )}
            {busy ? "Drafting ATS resume" : "Draft resume"}
          </button>
          {busy ? (
            <p className="max-w-sm text-xs leading-relaxed text-muted">
              {resumeFile
                ? "Reading the posting against the resume you uploaded."
                : "Reading the posting against Ikenna's CV."}{" "}
              This usually takes under a minute.
            </p>
          ) : null}
        </div>
      </form>

      {draft ? (
        <div className="grid gap-8 print:block xl:grid-cols-12">
          <aside className="print:hidden space-y-6 xl:col-span-4">
            <div className="panel p-6">
              <p className="kicker text-signal/80">Match check</p>
              <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-text">
                {draft.targetRole}
              </p>
              {draft.companyHint ? (
                <p className="mt-1 text-sm text-muted">{draft.companyHint}</p>
              ) : null}
              <p className="mt-4 font-mono text-[0.65rem] tracking-[0.16em] text-dim uppercase">
                {covered} of {total} requirements covered
              </p>
              <ul className="mt-5 space-y-3">
                {draft.checklist.map((item) => (
                  <li key={item.item} className="flex gap-3 text-sm">
                    <span
                      className={cn(
                        "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                        item.covered ? "bg-signal" : "bg-ember",
                      )}
                    />
                    <span>
                      <span className="text-text">{item.item}</span>
                      {item.evidence ? (
                        <span className="mt-1 block text-xs text-muted">
                          {item.evidence}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
              {draft.notes ? (
                <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                  {draft.notes}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={downloadPdf}
                disabled={downloading}
                className="inline-flex items-center gap-2 rounded-lg bg-signal px-4 py-2.5 font-mono text-[0.65rem] tracking-[0.16em] text-white uppercase transition-colors duration-300 hover:bg-text disabled:bg-line disabled:text-dim"
              >
                {downloading ? (
                  <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <FileDown className="h-3.5 w-3.5" />
                )}
                Download PDF
              </button>
              <button
                type="button"
                onClick={copyText}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 font-mono text-[0.65rem] tracking-[0.16em] text-text uppercase transition-colors duration-300 hover:border-signal/50 hover:text-signal"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy text"}
              </button>
            </div>
          </aside>

          <article
            ref={sheetRef}
            id="resume-print"
            className="resume-sheet xl:col-span-8 rounded-xl border border-line p-8 shadow-[0_18px_40px_-28px_rgb(26_35_48_/_0.18)] sm:p-10"
          >
            <header className="border-b border-neutral-300 pb-3 text-center">
              <h2 className="font-serif text-[1.65rem] font-semibold tracking-tight text-neutral-900">
                {displayName}
              </h2>
              <p className="mt-1 text-[11pt] text-neutral-800">{draft.headline}</p>
              <p className="mt-1.5 text-[9.5pt] text-neutral-700">
                {[draft.location, draft.email, draft.phone]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {draft.linkedinLabel || draft.linkedin ? (
                <p className="mt-0.5 text-[9.5pt] text-neutral-700">
                  <a
                    href={draft.linkedin || undefined}
                    className="text-neutral-700 underline-offset-2"
                  >
                    {draft.linkedinLabel || draft.linkedin}
                  </a>
                </p>
              ) : null}
            </header>

            <section className="mt-4">
              <h3 className="border-b border-neutral-300 pb-0.5 text-[10.5pt] font-bold tracking-[0.12em] text-neutral-900 uppercase">
                Professional Summary
              </h3>
              <p className="mt-2 text-justify text-[10.5pt] text-neutral-800">
                {draft.summary}
              </p>
            </section>

            {draft.skills.length > 0 ? (
              <section className="mt-4">
                <h3 className="border-b border-neutral-300 pb-0.5 text-[10.5pt] font-bold tracking-[0.12em] text-neutral-900 uppercase">
                  Skills
                </h3>
                <ul className="mt-2 space-y-0.5 text-[10.5pt] text-neutral-800">
                  {draft.skills.map((group) => (
                    <li key={group.label}>
                      <span className="font-semibold">{group.label}: </span>
                      {group.items.join(", ")}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="mt-4">
              <h3 className="border-b border-neutral-300 pb-0.5 text-[10.5pt] font-bold tracking-[0.12em] text-neutral-900 uppercase">
                Experience
              </h3>
              <div className="mt-2 space-y-3">
                {draft.experience.map((position) => (
                  <div key={`${position.company}-${position.span}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                      <p className="text-[11pt] font-bold text-neutral-900">
                        {position.company}
                      </p>
                      <p className="text-[10pt] text-neutral-700">{position.span}</p>
                    </div>
                    {position.roles.map((role) => (
                      <div
                        key={`${role.title}-${role.period}`}
                        className="flex flex-wrap items-baseline justify-between gap-x-4"
                      >
                        <p className="text-[10.5pt] italic text-neutral-800">{role.title}</p>
                        <p className="text-[10pt] text-neutral-700">
                          {[role.period, role.location].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    ))}
                    <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[10.5pt] text-neutral-800">
                      {position.bullets.map((bullet) => (
                        <li key={bullet} className="text-pretty">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {draft.education.length > 0 ? (
              <section className="mt-4">
                <h3 className="border-b border-neutral-300 pb-0.5 text-[10.5pt] font-bold tracking-[0.12em] text-neutral-900 uppercase">
                  Education
                </h3>
                <ul className="mt-2 space-y-1 text-[10.5pt] text-neutral-800">
                  {draft.education.map((item) => (
                    <li
                      key={item.qualification}
                      className="flex flex-wrap items-baseline justify-between gap-x-4"
                    >
                      <span>
                        <span className="font-semibold">{item.qualification}</span>
                        {`, ${item.school}, ${item.place}`}
                      </span>
                      <span className="text-[10pt] text-neutral-700">{item.period}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {draft.certifications.length > 0 ? (
              <section className="mt-4">
                <h3 className="border-b border-neutral-300 pb-0.5 text-[10.5pt] font-bold tracking-[0.12em] text-neutral-900 uppercase">
                  Certifications
                </h3>
                <ul className="mt-2 list-disc space-y-0.5 pl-5 text-[10.5pt] text-neutral-800">
                  {draft.certifications.map((cert) => (
                    <li key={`${cert.name}-${cert.issuer}`}>
                      {cert.name}, {cert.issuer}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>
        </div>
      ) : (
        <p className="print:hidden flex items-start gap-2 text-sm text-muted">
          <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
          Upload your own CV to tailor it. If you skip the upload, the draft uses Ikenna&apos;s CV. Nothing is saved in this browser tab.
        </p>
      )}
    </div>
  );
}
