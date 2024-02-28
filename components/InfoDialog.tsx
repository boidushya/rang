import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useColorStore } from "@/store/ColorUtils";
import { getStringFromHSL } from "@/utils/functions";
import { LIGHTNESS_BACKGROUND, LIGHTNESS_FOREGROUND } from "@/utils/constants";
import ResetDialog from "./ResetDialog";
import { motion } from "framer-motion";

const InfoDialog = () => {
  const { randomColor } = useColorStore();

  const backgroundColor = getStringFromHSL({
    ...randomColor,
    l: LIGHTNESS_FOREGROUND,
  });
  const color = getStringFromHSL({
    ...randomColor,
    l: LIGHTNESS_BACKGROUND,
  });
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ color, backgroundColor }}
          className="h-9 w-9 grid place-items-center font-medium rounded-full shadow-none transition-shadow hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-20 fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide" />
        <Dialog.Content className="z-20 data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[90vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] bg-white p-8 shadow-md focus:outline-none">
          <Dialog.Title className="font-bold text-2xl">
            What is Rang?
          </Dialog.Title>
          <Dialog.Description className="mt-4">
            <h1 className="text-lg font-semibold">About</h1>
            <p>
              Rang (रंग) is a Hindi word that means color. This game is inspired
              by{" "}
              <a
                href="https://colormatch.pages.dev"
                target="blank"
                className="underline underline-offset-2"
              >
                colormatch.pages.dev
              </a>{" "}
              from this{" "}
              <a
                href="https://twitter.com/narrowd/status/1758278508868948212"
                target="blank"
                className="underline underline-offset-2"
              >
                tweet
              </a>
              .
            </p>
            <p>
              Each day there{`'`}s a new target color so you can flex your color
              matching skills everyday.
            </p>

            <h1 className="text-lg font-semibold mt-1.5">Normal Mode</h1>
            <p>
              You have to select a color that is closest to the given color.
              Normal mode has a similarity cutoff of 98%
            </p>
            <h1 className="text-lg font-semibold mt-1.5">Tryhard Mode</h1>

            <p>
              Tryhard Mode has a cutoff of 100% and is obviously much harder. In
              this mode you get access to a similarity scoreboard. You can only
              try this mode if you finish normal mode.
            </p>
            <h1 className="text-lg font-semibold mt-1.5">Feedback</h1>
            <p>
              If you{"'"}re experiencing site issues try the reset button below
              or reach out to me on Twitter:{" "}
              <a
                href="https://twitter.com/boidushya"
                target="blank"
                className="underline underline-offset-2"
              >
                @boidushya
              </a>
            </p>
          </Dialog.Description>
          <div className="flex justify-between items-center gap-4 mt-8">
            <ResetDialog />
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
  );
};

export default InfoDialog;
