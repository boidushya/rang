import Redirect from "@/components/Redirect";
import { elapsedTimeToString } from "@/utils/functions";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

const generateTitle = (
  isTryhardModeSolved: boolean,
  elapsedTime: string,
  edition: number
) => {
  if (isTryhardModeSolved) {
    return `#${edition} 🎉 | Tryhard Mode 🔥 (100%) | ${elapsedTime} 🏁 | Rang - The Color Accuracy Game!`;
  }
  return `#${edition} 🎉 | ${elapsedTime} 🏁 | Rang - The Color Accuracy Game!`;
};

const base64ToScore = (base64: string) => {
  try {
    const json = Buffer.from(base64, "base64").toString("utf-8");
    const data = JSON.parse(json) as { t: number; e: number; i: boolean };
    return {
      elapsedTime: data.t,
      edition: data.e,
      isTryHardMode: data.i,
    };
  } catch (err) {
    redirect(`/?utm_source=share&utm_medium=link&utm_campaign=${base64}`);
  }
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const { elapsedTime, edition, isTryHardMode } = base64ToScore(
    decodeURIComponent(params.slug)
  );

  const formattedElapsedTime = elapsedTimeToString(elapsedTime);

  return {
    title: generateTitle(Boolean(isTryHardMode), formattedElapsedTime, edition),
  };
}

export default function Share({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <div>
      <h1 className="font-black text-2xl md:text-5xl animate-pulse">
        <Redirect
          to={`/?utm_source=share&utm_medium=link&utm_campaign=${slug}`}
        />
      </h1>
    </div>
  );
}
