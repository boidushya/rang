"use client";

import CustomColorPicker from "@/components/CustomColorPicker";
import ColorSection from "@/components/ColorSection";
import Wrapper from "@/components/ui/wrapper";
import Nav from "@/components/ui/nav";
import RefreshButton from "@/components/RefreshButton";
import Loader from "@/components/Loader";
import WinScreen from "@/components/WinScreen";
import Date from "@/components/Date";
import { TimerProvider } from "@layerhub-io/use-timer";
import { useColorStore } from "@/store/ColorUtils";
import React from "react";
import Points from "@/components/Points";

export const LoadingScreen = () => {
  return (
    <main
      style={{
        backgroundColor: `hsl(240, 5%, 10%)`,
        backgroundImage: `radial-gradient(hsl(240, 5%, 18%) 2px, transparent 0)`,
        backgroundSize: "48px 48px",
        backgroundPosition: "-22px -22px",
      }}
      className="h-d-screen w-full p-4 grid place-items-center text-center overflow-hidden relative"
    >
      <h1 className="font-bold text-lg md:text-3xl animate-pulse text-zinc-200">
        Hang on a sec, cooking up some colors...
      </h1>
    </main>
  );
};

export default function Home() {
  const { randomColor, setFixedRandomColor } = useColorStore();

  React.useEffect(() => {
    setFixedRandomColor();
  }, [setFixedRandomColor]);

  return (
    <TimerProvider>
      <>
        {randomColor === null ? (
          <LoadingScreen />
        ) : (
          <Wrapper>
            <Nav />

            <ColorSection />
            <CustomColorPicker />
            <div className="flex items-center justify-between w-full p-4 py-6 md:py-12 md:p-12 fixed bottom-0 left-0">
              <Date />
              <Points />
            </div>
          </Wrapper>
        )}
      </>
      <Loader />
      <WinScreen />
    </TimerProvider>
  );
}
