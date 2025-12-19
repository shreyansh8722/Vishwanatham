import { useState, useEffect, useRef } from 'react';

/**
 * A hook to detect scroll direction ('up', 'down', 'top')
 * @param {number} [threshold=30] - The scroll distance from the top to be considered 'top'
 * @returns {'up' | 'down' | 'top' | null} The current scroll direction
 */
export function useScrollDirection(threshold = 30) {
  const [scrollDir, setScrollDir] = useState(null); // 'up', 'down', 'top', or null
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    // Set initial position
    lastScrollY.current = window.scrollY;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      // Prevent jittering
      if (Math.abs(scrollY - lastScrollY.current) < 10) {
        ticking.current = false;
        return;
      }
      
      if (scrollY <= threshold) {
        // We are at the top of the page
        setScrollDir('top');
      } else if (scrollY > lastScrollY.current) {
        // We are scrolling down
        setScrollDir('down');
      } else {
        // We are scrolling up
        setScrollDir('up');
      }
      
      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        // Use requestAnimationFrame for smooth performance
        window.requestAnimationFrame(updateScrollDir);
        ticking.current = true;
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // Clean up event listener
    return () => window.removeEventListener('scroll', onScroll);

  }, [threshold]); // Only re-run if threshold changes

  return scrollDir;
}
