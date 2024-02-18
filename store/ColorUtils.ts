import {
  fetchRandomColor,
  generateRandomColor,
  hslToHex,
} from "@/utils/functions";
import { create } from "zustand";
import { hexToHsl } from "../utils/functions";
import { persist } from "zustand/middleware";

export type TColorHSL = {
  h: number;
  s: number;
  l: number;
};

export interface IColorStore {
  edition: number;
  color: TColorHSL;
  randomColor: TColorHSL;
  setFixedRandomColor: () => void;
  getColorHex: () => string;
  setColor: (value: TColorHSL) => void;
  setColorHex: (value: string) => void;
  changeRandomColor: () => void;
}

export interface IWinStore {
  cutoff: number;
  setCutoff: (value: number) => void;
  resetCutoff: () => void;
  isTryhardMode: () => boolean;
  setTryhardMode: () => void;
  turnTryhardModeOff: () => void;
  win: boolean;
  isTryhardModeSolved: boolean;
  setWin: (value: boolean) => void;
  winText: string;
  setWinTryhard: () => void;
  setWinNormal: () => void;
}

export const useColorStore: () => IColorStore = create<IColorStore>()(
  (set, get) => {
    const initialColor = generateRandomColor();
    const initialRandomColor = null as unknown as TColorHSL;
    return {
      color: initialColor,
      edition: 0,
      randomColor: initialRandomColor,
      setFixedRandomColor: async () => {
        const { edition, ...hsl } = await fetchRandomColor();
        set({ randomColor: hsl });
        set({ edition });
      },
      getColorHex: () => hslToHex(get().color),
      setColor: (color: TColorHSL) => set({ color }),
      setColorHex: (hexColor: string) => set({ color: hexToHsl(hexColor) }),
      changeRandomColor: () => set({ randomColor: generateRandomColor() }),
    };
  }
);

const initialCutoff = 98.5;

export const useWinStore: () => IWinStore = create<IWinStore>()(
  persist(
    (set, get) => ({
      cutoff: initialCutoff,
      setCutoff: (value: number) => set({ cutoff: value }),
      resetCutoff: () => set({ cutoff: initialCutoff }),
      isTryhardMode: () => get().cutoff === 100,
      setTryhardMode: () => set({ cutoff: 100, win: false }),
      turnTryhardModeOff: () => set({ cutoff: initialCutoff, win: false }),
      win: false,
      isTryhardModeSolved: false,
      winText: "Up for a challenge?",
      setWin: (value: boolean) => set({ win: value }),
      setWinTryhard: () =>
        set({
          winText:
            "You really know your colors! Come back tomorrow for a new challenge 👋",
          isTryhardModeSolved: true,
          win: true,
        }),
      setWinNormal: () =>
        set({
          winText: "Up for a challenge? Tryhard Mode is waiting for you 👀",
          win: true,
        }),
    }),
    {
      name: "__RB::winStore__",
    }
  )
);
