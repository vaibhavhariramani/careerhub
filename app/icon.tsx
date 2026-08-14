import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="14" width="4" height="6" rx="1" fill="white" />
          <rect x="10" y="9" width="4" height="11" rx="1" fill="white" />
          <rect x="16" y="4" width="4" height="16" rx="1" fill="white" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
