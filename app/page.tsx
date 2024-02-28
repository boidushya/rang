"use client";

import CustomColorPicker from "@/components/CustomColorPicker";
import ColorSection from "@/components/ColorSection";
import Wrapper from "@/components/ui/wrapper";
import Nav from "@/components/ui/nav";
import Loader from "@/components/Loader";
import WinScreen from "@/components/WinScreen";
import Edition from "@/components/Edition";
import { TimerProvider } from "@layerhub-io/use-timer";
import { useColorStore } from "@/store/ColorUtils";
import React from "react";
import Points from "@/components/Points";
import { Toaster } from "sonner";
import { useIsFetching } from "@/utils/hooks";

export default function Home() {
  const { setFixedRandomColor } = useColorStore();
  const isFetching = useIsFetching();

  React.useLayoutEffect(() => {
    setFixedRandomColor();
  }, [setFixedRandomColor]);

  return (
    <TimerProvider>
      {!isFetching && (
        <Wrapper>
          <Nav />
          <div className="flex md:flex-row flex-col items-center justify-start md:justify-center md:h-full h-[calc(100%_-_5.25rem)] w-full gap-0 lg:gap-24 md:gap-8">
            <ColorSection />
            <CustomColorPicker />
          </div>
          <div className="flex items-center justify-between w-full p-4 py-6 md:py-12 md:p-12 fixed bottom-0 left-0">
            <Edition />
            <Points />
          </div>
        </Wrapper>
      )}
      <Loader />
      <WinScreen />
      <Toaster richColors />
    </TimerProvider>
  );
}
