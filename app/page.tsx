"use client";

import CustomColorPicker from "@/components/CustomColorPicker";
import ColorSection from "@/components/ColorSection";
import Wrapper from "@/components/ui/wrapper";
import Nav from "@/components/ui/nav";
import RefreshButton from "@/components/RefreshButton";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <Wrapper>
        <Nav />

        <ColorSection />
        <CustomColorPicker />
        <RefreshButton />
      </Wrapper>
      <Loader />
    </>
  );
}
