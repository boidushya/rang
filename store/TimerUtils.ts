import { create } from "zustand";
import { persist } from "zustand/middleware";
import expiryStorage from "./storage";

type TTime = {
  sec: number;
  min: number;
  hr: number;
};

export interface ITimerStore {
  startTime: number;
  elapsedTime: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export const useTimerStore: () => ITimerStore = create<ITimerStore>()(
  persist(
    (set, get) => ({
      startTime: performance.now(),
      elapsedTime: 0,
      startTimer: () => {
        set({ startTime: performance.now() });
      },
      stopTimer: () => {
        set({
          elapsedTime: performance.now() - get().startTime + get().elapsedTime,
        });
      },
      resetTimer: () => {
        set({ elapsedTime: 0, startTime: performance.now() });
      },
    }),
    {
      name: "__RB::TimerStore",
      storage: expiryStorage,
    }
  )
);
