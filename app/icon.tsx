import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#111111",
          color: "#f7f6f3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        MLH
      </div>
    ),
    { ...size },
  );
}
