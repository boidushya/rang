"use client";

import { useColorStore } from "@/store/ColorUtils";
import {
  LIGHTNESS_BACKGROUND,
  LIGHTNESS_FOREGROUND,
  LIGHTNESS_SHADOW,
  SHARED_BOTTOM_VARIANT,
} from "@/utils/constants";
import { getStringFromHSL } from "@/utils/functions";
import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      variants={SHARED_BOTTOM_VARIANT}
      initial="initial"
      animate="animate"
      style={{ color, backgroundColor }}
      className="py-2 px-4 text-sm grid place-items-center rounded-full group md:shadow-none shadow-2xl font-bold"
    >
      Edition #{edition}
    </motion.div>
  );
};

export default Edition;
