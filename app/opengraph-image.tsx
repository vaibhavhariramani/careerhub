import { ImageResponse } from "next/og";
import { siteConfig } from "@/core/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0a1f",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 120,
            height: 120,
            alignItems: "center",
            justifyContent: "center",
            background: "#7c3aed",
            borderRadius: 28,
          }}
        >
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="14" width="4" height="6" rx="1" fill="white" />
            <rect x="10" y="9" width="4" height="11" rx="1" fill="white" />
            <rect x="16" y="4" width="4" height="16" rx="1" fill="white" />
          </svg>
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 76, fontWeight: 700, color: "white" }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 34, color: "#c4b5fd", textAlign: "center" }}>
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 24, color: "#9ca3af", textAlign: "center" }}>
          Free ATS resume scanner · resume builder · interview prep · job search
        </div>
      </div>
    ),
    { ...size },
  );
}
