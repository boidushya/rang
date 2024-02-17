import { generateRandomColor } from "@/utils/functions";
import { create } from "zustand";

export type TColorHSL = {
  h: number;
  s: number;
  l: number;
};

export interface IColorStore {
  color: TColorHSL;
  randomColor: TColorHSL;
  setColor: (value: TColorHSL) => void;
  changeRandomColor: () => void;
}

const initialColor = generateRandomColor();
const initialRandomColor = generateRandomColor();

export const useColorStore: () => IColorStore = create<IColorStore>()(
  (set) => ({
    color: initialColor,
    randomColor: initialRandomColor,
    setColor: (color: TColorHSL) => set({ color }),
    changeRandomColor: () => set({ randomColor: generateRandomColor() }),
  })
);
