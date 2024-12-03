import { useState, useEffect } from 'react';

const useTouch = ({ onSwipeLeft, onSwipeRight, onPullDown, threshold = 50 }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [pullStart, setPullStart] = useState(null);

  // Minimum distance required for swipe
  const minSwipeDistance = 50;

  useEffect(() => {
    const preventDefault = (e) => {
      // Allow pull-to-refresh only at the top of the page
      if (window.scrollY === 0) return;
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, []);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
    setPullStart(window.scrollY);
  };

  const onTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    // Calculate distances
    const horizontalDistance = touchStart.x - touchEnd.x;
    const verticalDistance = touchStart.y - touchEnd.y;
    const isPullDown = touchEnd.y - touchStart.y > threshold && window.scrollY === 0;

    // Detect horizontal swipe
    if (Math.abs(horizontalDistance) > minSwipeDistance) {
      if (horizontalDistance > 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }

    // Detect pull-to-refresh
    if (isPullDown && onPullDown) {
      onPullDown();
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
    setPullStart(null);
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default useTouch;
