"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/functions";

const heroTextAnimStates = {
  hidden: {
    opacity: 0,
    scale: 2,
    rotate: -12,
  },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 18,
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    rotate: 12,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 18,
    },
  },
};

const contentSlides = [
  {
    backdrop: "bg-violet-900",
    text: "text-violet-400",
  },
  {
    backdrop: "bg-indigo-900",
    text: "text-indigo-400",
  },
  {
    backdrop: "bg-blue-900",
    text: "text-blue-400",
  },
  {
    backdrop: "bg-green-900",
    text: "text-green-400",
  },
  {
    backdrop: "bg-yellow-900",
    text: "text-yellow-400",
  },
  {
    backdrop: "bg-orange-900",
    text: "text-orange-400",
  },
  {
    backdrop: "bg-red-900",
    text: "text-red-400",
  },
  {
    backdrop: "bg-zinc-900",
    text: "text-zinc-400",
  },
];

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  //   const isLoading = true;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contentSlides.length);
    }, 200);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="div"
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.4,
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "100%",
          }}
          className="absolute top-0 left-0 z-10 isolate bg-white h-full w-full grid place-items-center overflow-hidden"
        >
          <div
            className={cn(
              "absolute h-full w-full scale-150",
              contentSlides[currentSlide].backdrop
            )}
          />
          <motion.h1
            key="h1"
            variants={heroTextAnimStates}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cn(
              "font-black text-7xl z-10",
              contentSlides[currentSlide].text
            )}
          >
            Rang!
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
