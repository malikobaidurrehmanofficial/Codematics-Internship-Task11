import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook for infinite scroll functionality
 * @param {Function} onLoadMore - Callback when reaching the end
 * @param {Object} options - Configuration options
 * @returns {Object} Object containing ref to attach to trigger element
 */
export function useInfiniteScroll(onLoadMore, options = {}) {
  const { threshold = 0.1, disabled = false } = options;
  const observerTarget = useRef(null);

  const handleIntersection = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && !disabled && onLoadMore) {
        onLoadMore();
      }
    },
    [onLoadMore, disabled]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold]);

  return observerTarget;
}
