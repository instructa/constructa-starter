import * as React from 'react';

/**
 * Configuration options for the useDoubleClick hook
 */
interface UseDoubleClickOptions {
  /**
   * Time window (in milliseconds) to detect a double click/tap
   * Default: 300ms
   */
  delay?: number;
  
  /**
   * Callback for single click events
   * Only fires if a second click doesn't occur within the delay window
   */
  onSingleClick?: (event: React.MouseEvent | React.TouchEvent) => void;
  
  /**
   * Callback for double click events
   */
  onDoubleClick?: (event: React.MouseEvent | React.TouchEvent) => void;
}

/**
 * Custom hook that handles double-click/double-tap events reliably across all platforms,
 * with special optimizations for iOS devices.
 * 
 * This hook addresses common iOS touch event issues:
 * - 300ms click delay on older iOS versions
 * - Touch event vs mouse event conflicts
 * - Unreliable native double-click detection
 * 
 * @param options - Configuration options for click handling
 * @returns Object containing event handlers to spread onto the target element
 * 
 * @example
 * ```tsx
 * const doubleClickHandlers = useDoubleClick({
 *   onSingleClick: () => console.log('Single click'),
 *   onDoubleClick: () => console.log('Double click'),
 *   delay: 300
 * });
 * 
 * return <div {...doubleClickHandlers}>Click me!</div>;
 * ```
 */
export function useDoubleClick(options: UseDoubleClickOptions = {}) {
  const {
    delay = 300,
    onSingleClick,
    onDoubleClick,
  } = options;

  const clickCount = React.useRef(0);
  const clickTimer = React.useRef<NodeJS.Timeout | null>(null);
  const lastClickTime = React.useRef(0);
  const lastTouchEnd = React.useRef(0);

  // Detect if we're on iOS
  const isIOS = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }, []);

  // Clear any pending timers on unmount
  React.useEffect(() => {
    return () => {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, []);

  const handleClick = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const currentTime = Date.now();
      const timeSinceLastClick = currentTime - lastClickTime.current;

      // Increment click count
      clickCount.current += 1;
      lastClickTime.current = currentTime;

      // Clear existing timer
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }

      // If this is the second click within the delay window
      if (clickCount.current === 2 && timeSinceLastClick < delay) {
        clickCount.current = 0;
        onDoubleClick?.(event);
      } else {
        // Set a timer to handle single click
        clickTimer.current = setTimeout(() => {
          if (clickCount.current === 1) {
            onSingleClick?.(event);
          }
          clickCount.current = 0;
        }, delay);
      }
    },
    [delay, onSingleClick, onDoubleClick]
  );

  // iOS-specific touch event handlers to improve responsiveness
  const handleTouchEnd = React.useCallback(
    (event: React.TouchEvent) => {
      if (!isIOS) return;

      const currentTime = Date.now();
      const timeSinceLastTouch = currentTime - lastTouchEnd.current;

      // Prevent ghost clicks on iOS
      if (timeSinceLastTouch < 50) {
        event.preventDefault();
        return;
      }

      lastTouchEnd.current = currentTime;
      handleClick(event);
    },
    [isIOS, handleClick]
  );

  const handleMouseClick = React.useCallback(
    (event: React.MouseEvent) => {
      // On touch devices, prevent duplicate events
      if (isIOS && Date.now() - lastTouchEnd.current < 500) {
        event.preventDefault();
        return;
      }

      handleClick(event);
    },
    [isIOS, handleClick]
  );

  // Return appropriate handlers based on platform
  if (isIOS) {
    return {
      onTouchEnd: handleTouchEnd,
      onClick: handleMouseClick,
      // Prevent context menu on long press for better UX
      onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
    };
  }

  return {
    onClick: handleMouseClick,
  };
}

/**
 * Simpler hook that only handles double-click without single-click detection
 * 
 * @param callback - Function to call on double click
 * @param delay - Time window in milliseconds to detect double click (default: 300ms)
 * @returns Event handlers to spread onto the target element
 * 
 * @example
 * ```tsx
 * const doubleClickHandlers = useDoubleClickOnly(
 *   () => console.log('Double clicked!'),
 *   300
 * );
 * 
 * return <button {...doubleClickHandlers}>Double click me!</button>;
 * ```
 */
export function useDoubleClickOnly(
  callback: (event: React.MouseEvent | React.TouchEvent) => void,
  delay = 300
) {
  return useDoubleClick({
    onDoubleClick: callback,
    delay,
  });
}
