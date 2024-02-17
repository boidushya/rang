"use client";

import { useColorStore } from "@/store/ColorUtils";
import { LIGHTNESS_FOREGROUND, LIGHTNESS_SHADOW } from "@/utils/constants";
import { getStringFromHSL } from "@/utils/functions";
import React from "react";

const Title = () => {
  const { randomColor } = useColorStore();
  const color = getStringFromHSL({
    ...randomColor,
    l: LIGHTNESS_FOREGROUND,
  });
  const shadowColor = {
    ...randomColor,
    l: LIGHTNESS_SHADOW,
  };
  const textShadow = `4px 4px 0 ${getStringFromHSL(shadowColor)}`;
  return (
    <h1
      style={{
        color,
        textShadow,
      }}
      className="font-black text-5xl"
    >
      Rang!
    </h1>
  );
};

export default Title;
