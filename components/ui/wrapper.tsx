"use client";

import { useColorStore, useWinStore } from "@/store/ColorUtils";
import { LIGHTNESS_BACKGROUND, LIGHTNESS_FOREGROUND } from "@/utils/constants";
import { cn, getStringFromHSL } from "@/utils/functions";
import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { randomColor } = useColorStore();
  const { isTryhardMode } = useWinStore();
  const tryhardMode = isTryhardMode();
  const backgroundColor = getStringFromHSL({
    ...randomColor,
    l: LIGHTNESS_BACKGROUND,
  });
  const dotColor = `hsla(${randomColor.h}, ${randomColor.s}%, ${LIGHTNESS_FOREGROUND}%, 0.15)`;

  return (
    <main
      style={{
        backgroundColor,
        backgroundImage: `radial-gradient(${dotColor} 2px, transparent 0)`,
        backgroundSize: "48px 48px",
        backgroundPosition: "-22px -22px",
      }}
      className={cn(
        "h-d-screen flex md:flex-row flex-col items-center pt-24 md:pt-0 justify-start md:justify-center gap-0 md:gap-24 w-full overflow-hidden relative",
        tryhardMode && "border-8 border-orange-500"
      )}
    >
      {children}
    </main>
  );
};

export default Wrapper;