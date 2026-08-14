import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7c3aed",
          borderRadius: 40,
        }}
      >
        <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="14" width="4" height="6" rx="1" fill="white" />
          <rect x="10" y="9" width="4" height="11" rx="1" fill="white" />
          <rect x="16" y="4" width="4" height="16" rx="1" fill="white" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
