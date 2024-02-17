import { generateRandomColor, hslToHex } from "@/utils/functions";
import { create } from "zustand";
import { hexToHsl } from "../utils/functions";

export type TColorHSL = {
  h: number;
  s: number;
  l: number;
};

export interface IColorStore {
  color: TColorHSL;
  randomColor: TColorHSL;
  getColorHex: () => string;
  setColor: (value: TColorHSL) => void;
  setColorHex: (value: string) => void;
  changeRandomColor: () => void;
}

const initialColor = generateRandomColor();
const initialRandomColor = generateRandomColor();

export const useColorStore: () => IColorStore = create<IColorStore>()(
  (set, get) => ({
    color: initialColor,
    randomColor: initialRandomColor,
    getColorHex: () => hslToHex(get().color),
    setColor: (color: TColorHSL) => set({ color }),
    setColorHex: (hexColor: string) => set({ color: hexToHsl(hexColor) }),
    changeRandomColor: () => set({ randomColor: generateRandomColor() }),
  })
);
