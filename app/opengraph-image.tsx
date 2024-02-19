import { ImageResponse } from "next/og";
import React from "react";
export const runtime = "edge";

const GET = async () => {
  const fontData = await fetch(
    new URL("../assets/CabinetGrotesk.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage:
            "radial-gradient(circle at  center, transparent 0%, rgb(0,0,0,0.25) 100%)",
          fontFamily: "Cabinet Grotesk",
        }}
        tw="flex flex-col w-full h-full items-center justify-center bg-indigo-900 text-indigo-400"
      >
        <h1 tw="font-bold text-9xl text-indigo-300">Rang!</h1>
        <h1 tw="font-bold text-2xl -mt-2">The Color Accuracy Game!</h1>
      </div>
    ) as React.ReactElement,
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Cabinet Grotesk",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
};

export default GET;
