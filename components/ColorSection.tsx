"use client";

import { useColorStore } from "@/store/ColorUtils";
import { LIGHTNESS_FOREGROUND, LIGHTNESS_SHADOW } from "@/utils/constants";
import { getStringFromHSL } from "@/utils/functions";
import React from "react";

const ColorSection = () => {
  const { randomColor, color } = useColorStore();

  return (
    <div
      style={{
        backgroundColor: getStringFromHSL(randomColor),
        borderColor: getStringFromHSL({
          ...randomColor,
          l: LIGHTNESS_FOREGROUND,
        }),
        boxShadow: `8px 8px 0 0 ${getStringFromHSL({
          ...randomColor,
          l: LIGHTNESS_SHADOW,
        })}`,
      }}
      className="h-96 w-96 grid grid-rows-2 grid-cols-2 overflow-hidden border-8 "
    >
      <div
        className="col-start-2 row-start-2"
        style={{
          backgroundColor: getStringFromHSL(color),
        }}
      />
    </div>
  );
};

export default ColorSection;
