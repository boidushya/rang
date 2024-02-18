"use client";

import { useColorStore } from "@/store/ColorUtils";
import {
  LIGHTNESS_BACKGROUND,
  LIGHTNESS_FOREGROUND,
  LIGHTNESS_SHADOW,
} from "@/utils/constants";
import { getStringFromHSL } from "@/utils/functions";
import { format } from "date-fns";
import React from "react";

const Edition = () => {
  const { randomColor, edition } = useColorStore();

  const backgroundColor = getStringFromHSL({
    ...randomColor,
    l: LIGHTNESS_FOREGROUND,
  });
  const color = getStringFromHSL({
    ...randomColor,
    l: LIGHTNESS_BACKGROUND,
  });

  return (
    <div
      style={{ color, backgroundColor }}
      className="py-2 px-4 text-sm grid place-items-center rounded-full group md:shadow-none shadow-2xl font-bold"
    >
      Edition #{edition}
    </div>
  );
};

export default Edition;
