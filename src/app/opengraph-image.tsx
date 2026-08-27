import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name}, ${profile.credential} — Cloud, Data & AI Engineering`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f3ed",
          padding: 80,
          color: "#1a2330",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -240,
            left: -180,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: "rgba(26,79,140,0.22)",
            filter: "blur(130px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "rgba(196,92,38,0.20)",
            filter: "blur(130px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              background: "#1a4f8c",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 700,
              borderRadius: 12,
            }}
          >
            {profile.initials}
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#7a7468",
            }}
          >
            Cloud · Data · AI
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 34, color: "#4f5968", lineHeight: 1.3 }}>
            {`${profile.role} · ${profile.company}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#7a7468",
          }}
        >
          <div style={{ width: 48, height: 3, background: "#1a4f8c" }} />
          Ex-Google · GCP · AWS · Azure · Databricks
        </div>
      </div>
    ),
    size,
  );
}
