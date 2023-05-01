import { RefObject, useEffect, useState } from "react";

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * ref. https://usehooks-ts.com/react-hook/use-intersection-observer
 * @param elementRef
 * @param param1
 * @returns
 */
function useIntersection(
  elementRef: RefObject<Element>,
  {
    threshold = 0.3,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(
    () => {
      /** DOM Ref */
      const node = elementRef?.current;
      const hasIOSupport = !!window.IntersectionObserver;

      if (!hasIOSupport || frozen || !node) return;

      const observerParams = { threshold, root, rootMargin };
      const observer = new IntersectionObserver(updateEntry, observerParams);

      observer.observe(node);

      return () => observer.disconnect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [elementRef?.current, frozen, root, rootMargin, JSON.stringify(threshold)]
  );

  return entry;
}

export default useIntersection;
