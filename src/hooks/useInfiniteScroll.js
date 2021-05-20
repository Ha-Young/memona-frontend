import { useCallback, useEffect, useRef, useState } from "react";

const defaultOptions = {
  root: null,
  rootMargin: "1px",
  threshold: "0.1",
};

function useInfiniteScroll(fetchCallback, options = defaultOptions) {
  const [isFetching, setIsFetching] = useState(false);
  const infiniteTargetElementRef = useRef();

  const intersectionCallbackFuncThrottle = useCallback((entries) => {
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

    if (infiniteTargetElementRef.current) {
      targetElement = infiniteTargetElementRef.current;
      observer = new IntersectionObserver(
        intersectionCallbackFuncThrottle,
        options
      );
      observer.observe(targetElement);
    }

    return () => {
      observer?.disconnect(targetElement);
    };
  }, [intersectionCallbackFuncThrottle, options]);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    fetchCallback();
  }, [fetchCallback, isFetching]);

  return { isFetching, setIsFetching, infiniteTargetElementRef };
}

export default useInfiniteScroll;
