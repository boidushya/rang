"use client";

import { useColorStore, useWinStore } from "@/store/ColorUtils";
import {
  LIGHTNESS_BACKGROUND,
  LIGHTNESS_FOREGROUND,
  LIGHTNESS_MID,
  LIGHTNESS_SHADOW,
} from "@/utils/constants";
import {
  calculatePoints,
  getStringFromHSL,
  timeToString,
} from "@/utils/functions";
import React, { useMemo } from "react";
import TryhardDialog from "./TryhardDialog";
import { useTimerStore } from "@/store/TimerUtils";
import { useTimer } from "@layerhub-io/use-timer";
const Timer = () => {
  const { color: currentColor, randomColor } = useColorStore();
  const {
    setWin,
    cutoff,
    win,
    isTryhardMode,
    setWinTryhard,
    setWinNormal,
    isTryhardModeSolved,
  } = useWinStore();
  const { time, reset, start } = useTimer();
  const { stopTimer } = useTimerStore();
  const formattedTime = timeToString(time);

  const tryhardMode = isTryhardMode();

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

  React.useEffect(() => {
    if (Number(points) >= cutoff && win === false) {
      reset();
      stopTimer();
      console.log(points);
      cutoff === 100 ? setWinTryhard() : setWinNormal();
    }
  }, [
    points,
    setWin,
    cutoff,
    win,
    reset,
    stopTimer,
    setWinTryhard,
    setWinNormal,
  ]);

  React.useEffect(() => {
    setTimeout(() => {
      start();
    }, 2000);
  }, [start]);

  React.useEffect(() => {
    if (cutoff === 100 && !isTryhardModeSolved && !win) {
      reset();
    }
  }, [cutoff, reset, win, isTryhardModeSolved]);

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      {tryhardMode && <TryhardDialog />}

      <div
        className="flex items-center justify-center uppercase font-medium text-lg md:text-2xl"
        style={{ boxShadow }}
      >
        <div
          style={{
            backgroundColor,
            color,
          }}
          className="p-2.5 md:p-3 md:py-3 font-medium"
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
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div
          style={{
            backgroundColor: currentBackgroundColor,
            color: currentForegroundColor,
          }}
          className="p-3 py-2 font-mono transition-[width] duration-500 ease-in-out"
        >
          <>{formattedTime}</>
        </div>
      </div>
    </div>
  );
};

export default Timer;
