import { generateRandomColor } from "@/utils/functions";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useColorStore: () => IColorStore = create<IColorStore>()(
  persist(
    (set) => ({
      color: generateRandomColor(),
      randomColor: generateRandomColor(),
      setColor: (color: TColorHSL) => set({ color }),
      changeRandomColor: () => set({ randomColor: generateRandomColor() }),
    }),
    { name: "__R::ColorStore" }
  )
);
