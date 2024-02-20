import { useColorStore, useWinStore } from "@/store/ColorUtils";
import {
  LIGHTNESS_BACKGROUND,
  LIGHTNESS_FOREGROUND,
  LIGHTNESS_SHADOW,
} from "@/utils/constants";
import { calculatePoints, getStringFromHSL } from "@/utils/functions";
import React, { useMemo } from "react";
import InfoDialog from "./InfoDialog";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";

const getWarmth = (points: number) => {
  if (points < 20) {
    return "❄️❄️❄️";
  } else if (points < 50) {
    return "❄️❄️";
  } else if (points < 80) {
    return "❄️";
  } else if (points < 90) {
    return "🔥";
  } else if (points < 95) {
    return "🔥🔥";
  } else {
    return "🔥🔥🔥";
  }
};

const Points = () => {
  const { isTryhardMode } = useWinStore();
  const { color: currentColor, randomColor } = useColorStore();

  const tryhardMode = isTryhardMode();
  const showPercent = process.env.NODE_ENV === "development" || tryhardMode;

  const points = useMemo(
    () => calculatePoints(currentColor, randomColor),
    [currentColor, randomColor]
  );

  const warmth = useMemo(() => getWarmth(Number(points)), [points]);

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
    <div className="flex items-center justify-center gap-3">
      <InfoDialog />
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className="flex items-center justify-center uppercase font-medium text-sm"
            style={{ boxShadow }}
          >
            <div
              style={{
                backgroundColor: currentBackgroundColor,
                color: currentForegroundColor,
              }}
              className="p-2.5 font-medium"
            >
              {showPercent ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M9 16a3.001 3.001 0 0 0 6 0c0-.353-.072-.686-.184-1H9.184A2.962 2.962 0 0 0 9 16z"></path>
                  <path d="M18 6V4h-3.185A2.995 2.995 0 0 0 12 2c-1.654 0-3 1.346-3 3v5.8A6.027 6.027 0 0 0 6 16c0 3.309 2.691 6 6 6s6-2.691 6-6a6.027 6.027 0 0 0-3-5.2V10h3V8h-3V6h3zm-4.405 6.324A4.033 4.033 0 0 1 16 16c0 2.206-1.794 4-4 4s-4-1.794-4-4c0-1.585.944-3.027 2.405-3.676l.595-.263V5a1 1 0 0 1 2 0v7.061l.595.263z"></path>
                </svg>
              )}
            </div>
            <div
              style={{
                backgroundColor,
                color,
              }}
              className="p-3 py-2 flex items-center gap-1 justify-center font-mono"
            >
              {showPercent ? (
                <>
                  {points}
                  <span className="text-sm">%</span>
                </>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    key={warmth}
                    className="text-sm"
                  >
                    {warmth}
                  </motion.span>
                </AnimatePresence>
              )}
              <></>
            </div>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="z-20 fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide" />
          <Dialog.Content className="z-20 data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-white p-8 shadow-md focus:outline-none">
            <Dialog.Title className="font-bold text-2xl">Points</Dialog.Title>
            <Dialog.Description className="mt-4">
              <h1 className="text-lg font-semibold mt-2">Normal Mode</h1>
              <p>You get hints based on how close you are.</p>
              <p className="mt-1">
                For example
                <ul className="list-disc list-inside">
                  <li>❄️❄️❄️ means you are quite far away</li>
                  <li>🔥🔥🔥 means you are super close.</li>
                </ul>
              </p>
              <h1 className="text-lg font-semibold mt-2">Tryhard Mode</h1>

              <p>You get access to a similarity percentage scoreboard.</p>
              <p>
                {" "}
                You can only win if you select a color that is 100% similar to
                the given color.
              </p>
            </Dialog.Description>
            <div className="flex justify-end items-center gap-4 mt-8">
              <Dialog.Close asChild>
                <button
                  className="px-4 py-2 text-lg font-medium text-indigo-900 bg-indigo-200 rounded-md flex items-center justify-center gap-2"
                  aria-label="Close"
                >
                  Gotcha!
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Points;
