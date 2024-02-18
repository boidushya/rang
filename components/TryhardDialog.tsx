import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useWinStore } from "@/store/ColorUtils";

const TryhardDialog = () => {
  const {
    turnTryhardModeOff,
    setWin,
    setWinNormal: setWinTextNormal,
  } = useWinStore();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-orange-400 text-orange-900 h-12 w-12 grid place-items-center font-medium rounded-full hover:bg-orange-500 hover:text-orange-950 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 inline-block"
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
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-20 fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide" />
        <Dialog.Content className="z-20 data-[state=open]:animate-contentShow data-[state=open]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-white p-8 shadow-md focus:outline-none">
          <Dialog.Title className="font-bold text-2xl">
            Tryhard Mode!
          </Dialog.Title>
          <Dialog.Description className="mt-4">
            Tryhard mode is a challenge mode where you have to score 100 points.
            It{`'`}s not easy, but it{`'`}s possible!
          </Dialog.Description>
          <div className="flex justify-between items-center gap-4 mt-8">
            <button
              onClick={() => {
                turnTryhardModeOff();
                setWin(true);
                setWinTextNormal();
              }}
              className="px-4 py-2 text-lg font-medium text-orange-900 bg-orange-300 rounded-md flex items-center justify-center gap-2 "
            >
              Turn it off!
            </button>
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

export default TryhardDialog;
