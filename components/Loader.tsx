"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/functions";
import { useTimerStore } from "@/store/TimerUtils";

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
    backdrop: "bg-pink-900",
    text: "text-pink-400",
  },
  {
    backdrop: "bg-red-900",
    text: "text-red-400",
  },
];

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { startTimer } = useTimerStore();

  //   const isLoading = true;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contentSlides.length);
    }, 200);

    setTimeout(() => {
      startTimer();
      setIsLoading(false);
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div className="z-10 flex items-center flex-col">
            <motion.h1
              key="div"
              variants={heroTextAnimStates}
              initial="hidden"
              animate="show"
              exit="exit"
              className={cn(
                "font-black text-7xl",
                contentSlides[currentSlide].text
              )}
            >
              Rang!
            </motion.h1>
            <motion.p
              key="hint"
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 18,
                delay: 0.2,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "text-lg z-10 text-opacity-50 mt-4",
                contentSlides[currentSlide].text
              )}
            >
              Hint: Get as close as possible to the color!
            </motion.p>
          </div>
          <motion.p
            key="loading"
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 18,
              delay: 0.2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "p-4 absolute bottom-0 right-0 font-semibold text-lg z-10 text-opacity-50",
              contentSlides[currentSlide].text
            )}
          >
            Loading game...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
