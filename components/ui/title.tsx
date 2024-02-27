"use client";

import { useColorStore } from "@/store/ColorUtils";
import {
  LIGHTNESS_FOREGROUND,
  LIGHTNESS_SHADOW,
  SHARED_TOP_VARIANT,
} from "@/utils/constants";
import { getStringFromHSL } from "@/utils/functions";
import React from "react";
import { motion } from "framer-motion";

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
    <motion.h1
      variants={SHARED_TOP_VARIANT}
      initial="initial"
      animate="animate"
      style={{
        color,
        textShadow,
      }}
      className="font-black text-5xl"
    >
      Rang!
    </motion.h1>
  );
};

export default Title;
