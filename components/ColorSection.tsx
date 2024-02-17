"use client";

import { useColorStore } from "@/store/ColorUtils";
import {
  LIGHTNESS_BACKGROUND,
  LIGHTNESS_FOREGROUND,
  LIGHTNESS_LIGHTEST,
  LIGHTNESS_SHADOW,
} from "@/utils/constants";
import { getStringFromHSL, hslToHex } from "@/utils/functions";
import { useIsDesktop } from "@/utils/hooks";
import React from "react";

const ColorSection = () => {
  const { randomColor, color } = useColorStore();
  const isDesktop = useIsDesktop();

  const colorHEX = hslToHex(color);

  return (
    <div
      style={{
        backgroundColor: getStringFromHSL(randomColor),
        borderColor: getStringFromHSL({
          ...randomColor,
          l: LIGHTNESS_FOREGROUND,
        }),
        boxShadow: isDesktop
          ? `8px 8px 0 0 ${getStringFromHSL({
              ...randomColor,
              l: LIGHTNESS_SHADOW,
            })}`
          : `none`,
      }}
      className="h-auto md:h-96 w-full aspect-square md:aspect-auto md:w-96 grid grid-rows-2 grid-cols-2 overflow-hidden border-8 "
    >
      <div
        className="col-start-2 row-start-2 grid place-items-center uppercase font-bold font-mono text-2xl"
        style={{
          backgroundColor: getStringFromHSL(color),
          color: getStringFromHSL({
            ...color,
            l: color.l > 50 ? LIGHTNESS_LIGHTEST : LIGHTNESS_BACKGROUND,
          }),
        }}
      >
        {colorHEX.slice(1)}
      </div>
    </div>
  );
};

export default ColorSection;
