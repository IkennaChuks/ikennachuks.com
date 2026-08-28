import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { ResumeDraft } from "./resume-types";

const PAGE = { width: 612, height: 792 };
const MARGIN = 50;
const LINE = 13;
const INK = rgb(0.12, 0.12, 0.12);
const MUTED = rgb(0.28, 0.28, 0.28);

export async function resumeToPdf(draft: ResumeDraft) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdf.embedFont(StandardFonts.HelveticaOblique);

  let page = pdf.addPage([PAGE.width, PAGE.height]);
  let y = PAGE.height - MARGIN;
  const maxWidth = PAGE.width - MARGIN * 2;

  function addPage() {
    page = pdf.addPage([PAGE.width, PAGE.height]);
    y = PAGE.height - MARGIN;
  }

  function ensure(space: number) {
    if (y - space < MARGIN) addPage();
  }

  function wrap(text: string, font: typeof regular, size: number) {
    const words = text.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const next = current === "" ? word : `${current} ${word}`;
      if (font.widthOfTextAtSize(next, size) > maxWidth) {
        if (current !== "") lines.push(current);
        current = word;
      } else {
        current = next;
      }
    }
    if (current !== "") lines.push(current);
    return lines.length > 0 ? lines : [""];
  }

  function write(
    text: string,
    font: typeof regular,
    size: number,
    color = INK,
    gap = LINE,
  ) {
    for (const line of wrap(text, font, size)) {
      ensure(gap);
      page.drawText(line, { x: MARGIN, y: y - size, size, font, color });
      y -= gap;
    }
  }

  function heading(label: string) {
    y -= 8;
    ensure(22);
    page.drawText(label.toUpperCase(), {
      x: MARGIN,
      y: y - 11,
      size: 11,
      font: bold,
      color: INK,
    });
    y -= 14;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE.width - MARGIN, y },
      thickness: 0.7,
      color: rgb(0.55, 0.55, 0.55),
    });
    y -= 10;
  }

  const displayName = draft.credential
    ? `${draft.name}, ${draft.credential}`
    : draft.name;
  write(displayName, bold, 18, INK, 22);
  if (draft.headline) write(draft.headline, regular, 10.5, MUTED, 14);

  const contact = [
    draft.location,
    draft.email,
    draft.phone,
    draft.linkedinLabel || draft.linkedin,
  ]
    .filter(Boolean)
    .join("  |  ");
  if (contact) write(contact, regular, 9.5, MUTED, 13);

  heading("Professional Summary");
  write(draft.summary, regular, 10.5, INK, 13.5);

  if (draft.skills.length > 0) {
    heading("Skills");
    for (const group of draft.skills) {
      write(`${group.label}: ${group.items.join(", ")}`, regular, 10.5, INK, 13.5);
    }
  }

  heading("Experience");
  for (const position of draft.experience) {
    ensure(36);
    write(`${position.company}    ${position.span}`, bold, 11, INK, 14);
    for (const role of position.roles) {
      const right = [role.period, role.location].filter(Boolean).join("  |  ");
      write(
        right ? `${role.title}    ${right}` : role.title,
        italic,
        10.5,
        INK,
        13.5,
      );
    }
    for (const bullet of position.bullets) {
      const lines = wrap(`- ${bullet}`, regular, 10.5);
      for (const line of lines) {
        ensure(LINE);
        page.drawText(line, {
          x: MARGIN + 10,
          y: y - 10.5,
          size: 10.5,
          font: regular,
          color: INK,
        });
        y -= 13.5;
      }
    }
    y -= 6;
  }

  if (draft.education.length > 0) {
    heading("Education");
    for (const item of draft.education) {
      write(
        `${item.qualification}, ${item.school}, ${item.place} (${item.period})`,
        regular,
        10.5,
        INK,
        13.5,
      );
    }
  }

  if (draft.certifications.length > 0) {
    heading("Certifications");
    for (const cert of draft.certifications) {
      const line = cert.issuer ? `${cert.name}, ${cert.issuer}` : cert.name;
      write(`- ${line}`, regular, 10.5, INK, 13.5);
    }
  }

  return pdf.save();
}

export function resumeFilename(draft: ResumeDraft) {
  const base = draft.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base || "resume"}.pdf`;
}
