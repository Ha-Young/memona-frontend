import { useEffect, useState } from "react";

import throttleOnRendering from "../utils/throttleOnRendering";

const THROTTLE_WAIT = 500;

const defaultOptions = {
  root: null,
  rootMargin: "1px",
  threshold: "0.1",
};

function useInfiniteScroll(
  fetchCallback,
  targetElementRef,
  options = defaultOptions
) {
  const [isFetching, setIsFetching] = useState(false);

  const intersectionCallbackFuncThrottle = throttleOnRendering(entries => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsFetching(true);
      }
    });
    setIsFetching(false);
  }, THROTTLE_WAIT);

  useEffect(() => {
    let observer;
    let targetElement;

    if (targetElementRef.current) {
      console.log("hi", targetElementRef.current);
      targetElement = targetElementRef.current;
      observer = new IntersectionObserver(intersectionCallbackFuncThrottle, options);
      observer.observe(targetElementRef.current);
    }

    return () => observer?.disconnect(targetElement);
  }, [intersectionCallbackFuncThrottle, options, targetElementRef]);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    fetchCallback();
  }, [fetchCallback, isFetching]);

  return [isFetching, setIsFetching];
}

export default useInfiniteScroll;
