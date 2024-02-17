"use client";

import { useColorStore } from "@/store/ColorUtils";
import {
  LIGHTNESS_BACKGROUND,
  LIGHTNESS_FOREGROUND,
  LIGHTNESS_MID,
  LIGHTNESS_SHADOW,
} from "@/utils/constants";
import { calculatePoints, getStringFromHSL } from "@/utils/functions";
import React, { useMemo } from "react";

const Points = () => {
  const { color: currentColor, randomColor } = useColorStore();

  const points = useMemo(
    () => calculatePoints(currentColor, randomColor),
    [currentColor, randomColor]
  );

  const backgroundColor = getStringFromHSL({
    ...randomColor,
    l: LIGHTNESS_FOREGROUND,
  });
  const color = getStringFromHSL({
    ...randomColor,
    l: LIGHTNESS_BACKGROUND,
  });

  const currentBackgroundColor = getStringFromHSL({
    ...currentColor,
    l: LIGHTNESS_FOREGROUND,
  });

  const currentForegroundColor = getStringFromHSL({
    ...currentColor,
    l: LIGHTNESS_BACKGROUND,
  });

  const boxShadow = `6px 6px 0 0 ${getStringFromHSL({
    ...randomColor,
    l: LIGHTNESS_SHADOW,
  })}`;

  return (
    <div
      className="flex items-center justify-center uppercase font-medium text-2xl"
      style={{ boxShadow }}
    >
      <div
        style={{
          backgroundColor,
          color,
        }}
        className="p-3 py-3 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      </div>
      <div
        style={{
          backgroundColor: currentBackgroundColor,
          color: currentForegroundColor,
        }}
        className="p-3 py-2 flex items-center justify-center font-mono"
      >
        {points}
      </div>
    </div>
  );
};

export default Points;
