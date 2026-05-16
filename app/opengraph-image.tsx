import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Michael L. Hauge — AI training, implementation, and financial backing for ambitious companies in Southeast Asia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f7f6f3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7a7a7a",
          }}
        >
          Michael L. Hauge · hau.ge
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 60,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#111111",
            }}
          >
            AI training, implementation, and financial backing for ambitious
            companies in Southeast Asia.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#525252",
              maxWidth: "880px",
            }}
          >
            Workshops for leadership teams. Hands-on implementation. Capital
            for serious operators.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#7a7a7a",
            borderTop: "1px solid #d4d4d4",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex" }}>
            Pertama Group · Kuala Lumpur
          </div>
          <div style={{ display: "flex", gap: "32px" }}>
            <span>Training</span>
            <span>Implementation</span>
            <span>Capital</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
