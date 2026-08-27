import { isIP } from "node:net";
import { lookup } from "node:dns/promises";

const MAX_BYTES = 450_000;
const MAX_TEXT = 16_000;
const MAX_HOPS = 4;

function isBlockedHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/\.+$/, "");
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".arpa") ||
    host === "metadata.google.internal" ||
    host === "metadata" ||
    host === "instance-data"
  ) {
    return true;
  }
  return false;
}

function isBlockedIp(ip: string) {
  const address = ip.toLowerCase();
  if (address === "127.0.0.1" || address === "0.0.0.0" || address === "::" || address === "::1") {
    return true;
  }

  if (address.startsWith("::ffff:")) {
    return isBlockedIp(address.slice(7));
  }

  const v4 = address.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const a = Number(v4[1]);
    const b = Number(v4[2]);
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return false;
  }

  return (
    address.startsWith("fe80:") ||
    address.startsWith("fc") ||
    address.startsWith("fd") ||
    address.startsWith("ff")
  );
}

async function assertPublicUrl(url: URL) {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http and https URLs are allowed.");
  }
  if (url.username || url.password) {
    throw new Error("That URL is not allowed.");
  }
  if (isBlockedHost(url.hostname)) {
    throw new Error("That URL is not allowed.");
  }

  if (isIP(url.hostname)) {
    if (isBlockedIp(url.hostname)) throw new Error("That URL is not allowed.");
    return;
  }

  try {
    const records = await lookup(url.hostname, { all: true });
    if (records.length === 0 || records.some((record) => isBlockedIp(record.address))) {
      throw new Error("That URL is not allowed.");
    }
  } catch (error) {
    if (error instanceof Error && error.message === "That URL is not allowed.") throw error;
    throw new Error("Could not resolve that host.");
  }
}

function htmlToText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|tr|section|article)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, MAX_TEXT);
}

export async function fetchJobDescription(rawUrl: string) {
  let current: URL;
  try {
    current = new URL(rawUrl);
  } catch {
    throw new Error("That does not look like a valid URL.");
  }

  for (let hop = 0; hop < MAX_HOPS; hop++) {
    await assertPublicUrl(current);

    const response = await fetch(current, {
      redirect: "manual",
      headers: {
        Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8",
        "User-Agent":
          "Mozilla/5.0 (compatible; IkennaOkoloResume/1.0; +https://ikennachuks.com)",
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("The job page redirected without a destination.");
      current = new URL(location, current);
      continue;
    }

    if (!response.ok) {
      throw new Error(`Could not read that page (${response.status}). Paste the description instead.`);
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_BYTES) {
      throw new Error("That page is too large. Paste the job description instead.");
    }

    const text = htmlToText(new TextDecoder().decode(buffer));
    if (text.length < 180) {
      throw new Error(
        "That page did not yield a readable job description. Paste the posting instead.",
      );
    }

    return text;
  }

  throw new Error("Too many redirects. Paste the job description instead.");
}
