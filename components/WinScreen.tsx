import { useColorStore, useWinStore } from "@/store/ColorUtils";
import { useTimerStore } from "@/store/TimerUtils";
import { cn, elapsedTimeToString } from "@/utils/functions";
import { useTimer } from "@layerhub-io/use-timer";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const getTimeToNextEdition = () => {
  const nextEdition = new Date();
  nextEdition.setUTCHours(24, 0, 0, 0);
  const now = new Date();
  const diff = nextEdition.getTime() - now.getTime();
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return {
    minutes,
    hours,
  };
};

const getNextEditionText = () => {
  const { hours, minutes } = getTimeToNextEdition();

  let hoursText = "";
  let minutesText = "";

  if (hours > 0) {
    hoursText = `${hours} hour`;
    if (hours > 1) {
      hoursText += "s and";
    }
  }

  if (minutes > 0) {
    minutesText = `${minutes} minute`;
    if (minutes > 1) {
      minutesText += "s";
    }
  }

  return `Next edition in ${hoursText} ${minutesText}`;
};

const WinScreen = () => {
  const { win, setTryhardMode, winText, isTryhardModeSolved } = useWinStore();
  const { edition } = useColorStore();
  const { start } = useTimer();
  const { elapsedTime, resetTimer } = useTimerStore();
  const formattedElapsedTime = elapsedTimeToString(elapsedTime);

  const nextEditionText = getNextEditionText();

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
              "absolute top-0 left-1/2 -translate-x-1/2 py-12 font-black text-3xl md:text-5xl w-full",
              isTryhardModeSolved ? "text-zinc-300/75" : "text-zinc-900/75"
            )}
          >
            Rang!
          </h1>
          <div
            className={cn(
              "absolute bottom-0 left-0 px-6 py-4 text-base md:text-2xl font-medium",
              isTryhardModeSolved ? "text-zinc-300/60" : "text-zinc-900/60"
            )}
          >
            <a href="https://rang.boidushya.com" target="_blank">
              rang.boidushya.com
            </a>
          </div>
          <p
            className={cn(
              "absolute bottom-0 right-0 px-6 py-4 text-base md:text-2xl font-medium",
              isTryhardModeSolved ? "text-zinc-300/60" : "text-zinc-900/60"
            )}
          >
            Edition #{edition}
          </p>
          <div className="flex flex-col items-center gap-2 px-12">
            <h1 className="text-4xl md:text-7xl font-black">
              {isTryhardModeSolved
                ? `Tryhard Mode solved in ${formattedElapsedTime}`
                : `Solved in ${formattedElapsedTime}`}
            </h1>
            <p className="text-base md:text-xl font-medium mt-2">{winText}</p>
            <p className="text-base md:text-xl font-medium mb-2">
              {nextEditionText}
            </p>
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
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-orange-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                    clipRule="evenodd"
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
