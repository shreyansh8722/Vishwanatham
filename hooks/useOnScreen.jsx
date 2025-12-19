import { useState, useEffect } from "react";

/* ---------------------- Intersection Hook ---------------------- */
export const useOnScreen = (ref, rootMargin = "100px") => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    let currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      { rootMargin }
    );
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);
  return isIntersecting;
};