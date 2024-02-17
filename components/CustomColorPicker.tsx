"use client";

import { useColorStore } from "@/store/ColorUtils";
import React from "react";
import { HslColorPicker } from "react-colorful";
import "@/styles/color-picker.css";
import { getStringFromHSL } from "@/utils/functions";
import {
  LIGHTNESS_BACKGROUND,
  LIGHTNESS_FOREGROUND,
  LIGHTNESS_SHADOW,
} from "@/utils/constants";

const CustomColorPicker = () => {
  const { color, setColor } = useColorStore();

  const borderColor = getStringFromHSL({
    ...color,
    l: LIGHTNESS_FOREGROUND,
  });

  const backgroundColor = getStringFromHSL({
    ...color,
    l: LIGHTNESS_BACKGROUND,
  });
  const boxShadow = `8px 8px 0 0 ${getStringFromHSL({
    ...color,
    l: LIGHTNESS_SHADOW,
  })}`;

  return (
    <div
      style={{
        borderColor,
        boxShadow,
        backgroundColor,
      }}
      className="custom-color-picker border-8 h-96 w-96"
    >
      <HslColorPicker color={color} onChange={setColor} />
    </div>
  );
};

export default CustomColorPicker;
