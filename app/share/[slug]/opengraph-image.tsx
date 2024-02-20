import { decodeScore, elapsedTimeToString } from "@/utils/functions";
import { ImageResponse } from "next/og";
import React from "react";
import { redirect } from "next/navigation";

export const runtime = "edge";

const base64ToScore = (base64: string) => {
  try {
    return decodeScore(base64);
  } catch (err) {
    redirect(`/?utm_source=share&utm_medium=link&utm_campaign=${base64}`);
  }
};

const GET = async ({ params }: { params: { slug: string } }) => {
  const { elapsedTime, edition, isTryHardMode } = base64ToScore(
    decodeURIComponent(params.slug)
  );

  const time = elapsedTimeToString(elapsedTime);

  const fontData = await fetch(
    new URL("../../../assets/CabinetGrotesk.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const bg = isTryHardMode ? "bg-zinc-800" : "bg-zinc-50";
  const text = isTryHardMode ? "text-zinc-400" : "text-zinc-700";
  const textOpacity = isTryHardMode ? "text-zinc-300/50" : "text-zinc-800/50";
  const textSecondary = isTryHardMode ? "text-zinc-300" : "text-zinc-800";
  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage:
            "radial-gradient(circle at center, transparent 50%, rgb(0,0,0,0.2) 100%)",
          fontFamily: "Cabinet Grotesk",
        }}
        tw={`flex flex-col w-full h-full items-center justify-center ${bg} ${text}`}
      >
        <h1
          tw={`flex items-center justify-center font-bold text-6xl ${textSecondary}`}
        >
          {time}
          <div tw={`mx-2 ${textOpacity}`}>{" · "}</div>#{edition}
          <div tw={`mx-2 ${textOpacity}`}>·</div>
          {isTryHardMode ? " TryHard Mode" : " Normal Mode"}
        </h1>
        <h2 tw="font-bold text-3xl -mt-2">Rang! - The Color Accuracy Game!</h2>
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
