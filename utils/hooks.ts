// https://usehooks-ts.com/react-hook/use-media-query

import { useColorStore } from "@/store/ColorUtils";
import { useState } from "react";

import { useEffect, useLayoutEffect } from "react";

/**
 * Custom hook for using either `useLayoutEffect` or `useEffect` based on the environment (client-side or server-side).
 * @param {Function} effect - The effect function to be executed.
 * @param {Array<any>} [dependencies] - An array of dependencies for the effect (optional).
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect)
 * @example
 * useIsomorphicLayoutEffect(() => {
 *   // Code to be executed during the layout phase on the client side
 * }, [dependency1, dependency2]);
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query: string,
  options?: UseMediaQueryOptions
): boolean;
/**
 * Custom hook for tracking the state of a media query.
 * @deprecated - this useMediaQuery's signature is deprecated, it now accepts an query parameter and an options object.
 * @param {string} query - The media query to track.
 * @param {?boolean} [defaultValue] - The default value to return if the hook is being run on the server (default is `false`).
 * @returns {boolean} The current state of the media query (true if the query matches, false otherwise).
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-media-query)
 * @see [MDN Match Media](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
 * @example
 * const isSmallScreen = useMediaQuery('(max-width: 600px)');
 * // Use `isSmallScreen` to conditionally apply styles or logic based on the screen size.
 */
export function useMediaQuery(query: string, defaultValue: boolean): boolean; // defaultValue should be false by default
/**
 * Custom hook for tracking the state of a media query.
 * @param {string} query - The media query to track.
 * @param {boolean | ?UseMediaQueryOptions} [options] - The default value to return if the hook is being run on the server (default is `false`).
 * @param {?boolean} [options.defaultValue] - The default value to return if the hook is being run on the server (default is `false`).
 * @param {?boolean} [options.initializeWithValue] - If `true` (default), the hook will initialize reading the media query. In SSR, you should set it to `false`, returning `options.defaultValue` or `false` initially.
 * @returns {boolean} The current state of the media query (true if the query matches, false otherwise).
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-media-query)
 * @see [MDN Match Media](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
 * @example
 * const isSmallScreen = useMediaQuery('(max-width: 600px)');
 * // Use `isSmallScreen` to conditionally apply styles or logic based on the screen size.
 */
export function useMediaQuery(
  query: string,
  options?: boolean | UseMediaQueryOptions
): boolean {
  // TODO: Refactor this code after the deprecated signature has been removed.
  const defaultValue =
    typeof options === "boolean" ? options : options?.defaultValue ?? false;
  const initializeWithValue =
    typeof options === "boolean"
      ? undefined
      : options?.initializeWithValue ?? undefined;

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  /** Handles the change event of the media query. */
  function handleChange() {
    setMatches(getMatches(query));
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);

  return matches;
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 768px)");
}

export function useIsFetching() {
  const { randomColor } = useColorStore();
  return randomColor === null;
}
