"use client";

import { useColorStore } from "@/store/ColorUtils";
import React from "react";
import {
  HexColorInput,
  HslColorPicker,
  HslStringColorPicker,
  RgbStringColorPicker,
} from "react-colorful";
import "@/styles/color-picker.css";
import { getStringFromHSL } from "@/utils/functions";
import {
  LIGHTNESS_BACKGROUND,
  LIGHTNESS_FOREGROUND,
  LIGHTNESS_SHADOW,
} from "@/utils/constants";
import { useIsDesktop } from "@/utils/hooks";

const CustomColorPicker = () => {
  const { color, setColor, getColorHex, setColorHex } = useColorStore();

  const isDesktop = useIsDesktop();

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
        boxShadow: isDesktop ? boxShadow : `none`,
        backgroundColor,
      }}
      className="custom-color-picker border-4 md:border-8 h-48 md:h-96 w-full md:w-96 flex flex-col "
    >
      <HslColorPicker color={color} onChange={setColor} />
    </div>
  );
};

export default CustomColorPicker;
