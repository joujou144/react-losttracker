import { useCallback } from "react";

function useInfiniteScroll(callbackParam: () => void) {
  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callbackParam();
        }
      });
    },
    [callbackParam]
  );

  const infiniteScrollRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) {
        return;
      }

      const options: IntersectionObserverInit = {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 1.0, // Trigger callback when the element is fully visible
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(node);

      return () => {
        observer.unobserve(node);
        observer.disconnect();
      };
    },
    [callback]
  );

  return infiniteScrollRef;
}

export default useInfiniteScroll;
