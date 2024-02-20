import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface IInstructionStore {
  shownInstructions: boolean;
  setShownInstructions: (value: boolean) => void;
}

export const useInstructionStore: () => IInstructionStore =
  create<IInstructionStore>()(
    persist(
      (set) => ({
        shownInstructions: false,
        setShownInstructions: (value) => {
          set({ shownInstructions: value });
        },
      }),
      {
        name: "__RB::InstructionsStore",
      }
    )
  );
