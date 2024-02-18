import { useWinStore } from "@/store/ColorUtils";
import { useTimerStore } from "@/store/TimerUtils";
import { cn, elapsedTimeToString } from "@/utils/functions";
import { useTimer } from "@layerhub-io/use-timer";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { format } from "date-fns";

const WinScreen = () => {
  const { win, setTryhardMode, winText, isTryhardModeSolved } = useWinStore();
  const { start } = useTimer();
  const { elapsedTime, resetTimer } = useTimerStore();
  const formattedElapsedTime = elapsedTimeToString(elapsedTime);

  const date = new Date().toUTCString();
  const formattedDate = format(date, "MMMM d, yyyy");
  return (
    <AnimatePresence>
      {win && (
        <motion.div
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.4,
          }}
          initial={{
            x: "-100%",
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "100%",
          }}
          className={cn(
            "absolute top-0 left-0 z-[5] isolate bg-gradient-radial h-full w-full grid place-items-center overflow-hidden text-center",
            isTryhardModeSolved
              ? "from-zinc-900 to-zinc-950 text-zinc-300"
              : "from-zinc-100 to-zinc-400 text-zinc-800"
          )}
        >
          <h1
            className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 py-12 font-black text-xl md:text-4xl w-full",
              isTryhardModeSolved ? "text-zinc-300/75" : "text-zinc-900/75"
            )}
          >
            Rang!
          </h1>
          <div
            className={cn(
              "absolute bottom-0 left-0 px-6 py-4 text-xs md:text-lg font-medium",
              isTryhardModeSolved ? "text-zinc-300/50" : "text-zinc-900/50"
            )}
          >
            <a href="https://rang.boidushya.com" target="_blank">
              rang.boidushya.com
            </a>
          </div>
          <p
            className={cn(
              "absolute bottom-0 right-0 px-6 py-4 text-xs md:text-lg font-medium",
              isTryhardModeSolved ? "text-zinc-300/50" : "text-zinc-900/50"
            )}
          >
            {formattedDate}
          </p>
          <div className="flex flex-col items-center gap-4 px-12">
            <h1 className="text-4xl md:text-7xl font-black">
              {isTryhardModeSolved
                ? `Tryhard Mode solved in ${formattedElapsedTime}`
                : `Solved in ${formattedElapsedTime}`}
            </h1>
            <p className="text-base md:text-xl font-medium">{winText}</p>
            {!isTryhardModeSolved && (
              <button
                onClick={() => {
                  setTryhardMode();
                  resetTimer();
                  start();
                }}
                className="px-4 py-2 text-xl font-medium bg-zinc-900 text-zinc-200 rounded-md flex items-center justify-center gap-2 pr-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-orange-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                  />
                </svg>
                Tryhard Mode
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinScreen;
