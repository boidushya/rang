import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

const ResetDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="px-4 py-2 text-lg font-medium text-pink-900 bg-pink-200 rounded-md flex items-center justify-center gap-2"
          aria-label="Reset"
        >
          Reset
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-20 fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide" />
        <Dialog.Content className="z-20 data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-white p-8 shadow-md focus:outline-none">
          <Dialog.Title className="font-bold text-2xl">Hang on!</Dialog.Title>
          <Dialog.Description className="mt-4">
            Are you sure you want to reset your progress? Once you reset, you
            will lose all your points and the game will start from the
            beginning. This action cannot be undone.
          </Dialog.Description>
          <div className="flex justify-end items-center gap-4 mt-8">
            <button
              onClick={() => {
                window.localStorage.clear();
                window.location.reload();
              }}
              className="px-4 py-2 text-lg font-medium text-orange-900 bg-orange-300 rounded-md flex items-center justify-center gap-2 "
            >
              Yes
            </button>
            <Dialog.Close asChild>
              <button
                className="px-4 py-2 text-lg font-medium text-indigo-900 bg-indigo-200 rounded-md flex items-center justify-center gap-2"
                aria-label="Close"
              >
                No
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ResetDialog;
