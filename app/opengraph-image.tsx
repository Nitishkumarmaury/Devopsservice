import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const alt = `${siteConfig.name} DevOps and cloud engineering`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(180deg, #05070B 0%, #090D14 100%)",
        color: "white",
        padding: 64,
      }}
    >
      <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#7dd3fc" }}>
        {siteConfig.name}
      </div>
      <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
        Cloud infrastructure engineered for speed, reliability, and scale.
      </div>
      <div style={{ fontSize: 28, color: "#cbd5e1", maxWidth: 860 }}>
        DevOps, CI/CD, monitoring, cloud architecture, web development, and application engineering.
      </div>
    </div>,
    size,
  );
}
