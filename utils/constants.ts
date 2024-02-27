export const LIGHTNESS_LIGHTEST = 10;
export const LIGHTNESS_FOREGROUND = 30;
export const LIGHTNESS_MID = 60;
export const LIGHTNESS_SHADOW = 80;
export const LIGHTNESS_BACKGROUND = 90;

const SHARED_TRANSITION = {
  delay: 1.8,
};

export const SHARED_TOP_VARIANT = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: SHARED_TRANSITION,
  },
};

export const SHARED_BOTTOM_VARIANT = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: SHARED_TRANSITION,
  },
};

export const SHARED_MIDDLE_VARIANT = {
  initial: {
    opacity: 0,
    scale: 1.075,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: SHARED_TRANSITION,
  },
};
