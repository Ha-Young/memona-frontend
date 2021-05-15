import { useCallback, useEffect, useState } from "react";

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

  const intersectionCallbackFuncThrottle = useCallback((entries, observer) => {
    if (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsFetching(true);
        }
      });
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    let observer;
    let targetElement;

    if (targetElementRef.current) {
      targetElement = targetElementRef.current;
      observer = new IntersectionObserver(intersectionCallbackFuncThrottle, options);
      observer.observe(targetElement);
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
