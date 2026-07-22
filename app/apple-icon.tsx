import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon, generated from the same brand mark as the main
 * favicon (`app/icon.png`) rather than a separate hand-cut asset —
 * one source of truth for the logo, rendered at the 180x180 size iOS
 * expects for home-screen bookmarks.
 */
export default async function AppleIcon() {
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0B0C",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- satori (next/og) renders this JSX to a raster image, not the DOM; next/image and alt text don't apply here */}
        <img
          // @ts-expect-error -- ImageResponse (satori) accepts ArrayBuffer image sources directly
          src={logoData}
          width={140}
          height={140}
        />
      </div>
    ),
    { ...size }
  );
}
