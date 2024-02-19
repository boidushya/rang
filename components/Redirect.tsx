"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Redirect = ({ to }: { to: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to, router]);
  return <></>;
};

export default Redirect;
