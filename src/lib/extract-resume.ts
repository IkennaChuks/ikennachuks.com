import { extractText } from "unpdf";

const MAX_BYTES = 4_000_000;
const MAX_CHARS = 24_000;

export async function textFromResumeFile(file: File) {
  if (file.size > MAX_BYTES) {
    throw new Error("That resume is too large. Use a file under 4 MB.");
  }

  const name = file.name.toLowerCase();
  const type = file.type;

  if (type === "text/plain" || name.endsWith(".txt")) {
    const text = (await file.text()).trim();
    if (text.length < 200) {
      throw new Error("That text file does not look like a resume.");
    }
    return text.slice(0, MAX_CHARS);
  }

  if (type === "application/pdf" || name.endsWith(".pdf")) {
    const data = new Uint8Array(await file.arrayBuffer());
    const extracted = await extractText(data, { mergePages: true });
    const text = extracted.text.replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    if (text.length < 200) {
      throw new Error("Could not read enough text from that PDF. Try a text-based PDF.");
    }
    return text.slice(0, MAX_CHARS);
  }

  throw new Error("Upload a PDF or a .txt resume.");
}
