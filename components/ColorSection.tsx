"use client";

import { useColorStore } from "@/store/ColorUtils";
import { useInstructionStore } from "@/store/InstructionsUtils";
import {
  LIGHTNESS_BACKGROUND,
  LIGHTNESS_FOREGROUND,
  LIGHTNESS_LIGHTEST,
  LIGHTNESS_SHADOW,
  SHARED_MIDDLE_VARIANT,
} from "@/utils/constants";
import { getStringFromHSL, hslToHex } from "@/utils/functions";
import { useIsDesktop } from "@/utils/hooks";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const leftVariants = {
  initial: {
    opacity: 0,
    x: -200,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -200,
  },
};

const rightVariants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 200,
  },
};

const ColorSection = () => {
  const { randomColor, color } = useColorStore();
  const { shownInstructions, setShownInstructions } = useInstructionStore();
  const isDesktop = useIsDesktop();

  const colorHEX = hslToHex(color);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShownInstructions(true);
    }, 10000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      variants={SHARED_MIDDLE_VARIANT}
      initial="initial"
      animate="animate"
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
      className="h-auto md:h-96 w-full aspect-square md:aspect-auto md:w-96 grid grid-rows-2 grid-cols-2 overflow-hidden border-4 md:border-8 relative"
    >
      <AnimatePresence>
        {!shownInstructions && (
          <motion.div
            variants={leftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key="instructions"
            style={{
              color: getStringFromHSL({
                ...randomColor,
                l:
                  randomColor.l > 50
                    ? LIGHTNESS_FOREGROUND
                    : LIGHTNESS_BACKGROUND,
              }),
            }}
            className="absolute top-0 left-0 p-12 text-3xl font-bold font-mono uppercase h-full w-full"
            onClick={() => setShownInstructions(true)}
          >
            Match this color
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="col-start-2 row-start-2 grid place-items-center uppercase font-bold font-mono text-2xl text-left p-8"
        style={{
          backgroundColor: getStringFromHSL(color),
          color: getStringFromHSL({
            ...color,
            l: color.l > 50 ? LIGHTNESS_LIGHTEST : LIGHTNESS_BACKGROUND,
          }),
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!shownInstructions ? (
            <motion.p
              variants={rightVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key="instruction"
            >
              with this one using {isDesktop ? "➡️" : "⬇️"}
            </motion.p>
          ) : (
            <motion.p
              variants={rightVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key="color"
            >
              {colorHEX.slice(1)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ColorSection;
