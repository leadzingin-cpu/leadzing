import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LeadZing — Building Brands People Remember";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at request/build time from the real brand mark (no stock
 * imagery, no fabricated logos) so every link share (Slack, WhatsApp,
 * LinkedIn, iMessage, X) gets a proper large-image preview instead of
 * the bare text card the site had with no og:image at all.
 */
export default async function Image() {
  const logoData = await fetch(new URL("./icon.png", import.meta.url)).then((res) =>
    res.arrayBuffer()
  );

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
          backgroundColor: "#0A0B0C",
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(18,225,242,0.16), rgba(10,11,12,0) 60%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- satori (next/og) renders this JSX to a raster image, not the DOM; next/image and alt text don't apply here */}
        <img
          // @ts-expect-error -- ImageResponse (satori) accepts ArrayBuffer image sources directly
          src={logoData}
          width={120}
          height={120}
          style={{ borderRadius: 24 }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 72,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          LeadZing
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            fontWeight: 500,
            color: "#B0B0B5",
          }}
        >
          Building Brands People Remember.
        </div>
      </div>
    ),
    { ...size }
  );
}
