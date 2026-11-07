import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Gotham — Your finances are your business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/gotham-mark.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#081522",
          color: "#F3F7FA",
          padding: 72,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={210} height={114} />
        <div style={{ display: "flex", marginTop: 28, fontSize: 64, lineHeight: 1, letterSpacing: -1 }}>
          Your finances are your business.
        </div>
        <div style={{ display: "flex", marginTop: 22, maxWidth: 760, fontSize: 28, lineHeight: 1.35, color: "#91A8BA" }}>
          A privacy protocol in development for Elysium.
        </div>
      </div>
    ),
    { ...size },
  );
}
