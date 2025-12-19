import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Disable browser's default scroll restoration to prevent fighting
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Immediately scroll to top-left before the browser paints the new screen
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' skips animation for a snappy feel (prevents the "scroll up" visual)
    });
  }, [pathname]);

  return null;
};