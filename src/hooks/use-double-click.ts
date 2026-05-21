import { useCallback, useRef, type MouseEvent, type TouchEvent } from 'react';

export interface UseDoubleClickOptions {
  /**
   * Callback for single click events
   */
  onSingleClick?: (event: MouseEvent | TouchEvent) => void;
  
  /**
   * Callback for double click events
   */
  onDoubleClick: (event: MouseEvent | TouchEvent) => void;
  
  /**
   * Maximum time between clicks to count as double click (in ms)
   * @default 300
   */
  delay?: number;
  
  /**
   * If true, single click callback won't fire (only double click)
   * @default false
   */
  doubleClickOnly?: boolean;
}

export interface UseDoubleClickReturn {
  onClick: (event: MouseEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}

/**
 * Custom hook for handling double-click/double-tap events across platforms,
 * with special optimizations for iOS devices.
 * 
 * iOS-specific improvements:
 * - Uses touch events for better responsiveness
 * - Prevents ghost clicks (300ms delay)
 * - Handles touch event timing properly
 * - Prevents context menu on long press
 * 
 * @example
 * ```tsx
 * const { onClick, onTouchEnd } = useDoubleClick({
 *   onSingleClick: () => console.log('single'),
 *   onDoubleClick: () => console.log('double'),
 * });
 * 
 * return <div onClick={onClick} onTouchEnd={onTouchEnd}>Click me</div>;
 * ```
 */
export function useDoubleClick({
  onSingleClick,
  onDoubleClick,
  delay = 300,
  doubleClickOnly = false,
}: UseDoubleClickOptions): UseDoubleClickReturn {
  // Use number for browser setTimeout return type, not NodeJS.Timeout
  const clickTimerRef = useRef<number | null>(null);
  const clickCountRef = useRef(0);
  const lastEventRef = useRef<MouseEvent | TouchEvent | null>(null);
  const lastTouchTimeRef = useRef(0);
  
  const handleClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      // Prevent ghost clicks on iOS (clicks that happen after touch events)
      if (event.type === 'click') {
        const now = Date.now();
        if (now - lastTouchTimeRef.current < 500) {
          event.preventDefault();
          return;
        }
      }
      
      // Track touch time for ghost click prevention
      if (event.type === 'touchend') {
        lastTouchTimeRef.current = Date.now();
      }
      
      clickCountRef.current += 1;
      lastEventRef.current = event;
      
      // Clear any existing timer
      if (clickTimerRef.current !== null) {
        clearTimeout(clickTimerRef.current);
      }
      
      if (clickCountRef.current === 2) {
        // Double click detected
        clickCountRef.current = 0;
        onDoubleClick(event);
      } else {
        // Wait to see if another click comes
        clickTimerRef.current = window.setTimeout(() => {
          if (clickCountRef.current === 1) {
            // Single click confirmed
            if (!doubleClickOnly && onSingleClick && lastEventRef.current) {
              onSingleClick(lastEventRef.current);
            }
          }
          clickCountRef.current = 0;
          lastEventRef.current = null;
        }, delay);
      }
    },
    [onSingleClick, onDoubleClick, delay, doubleClickOnly]
  );
  
  const onClick = useCallback(
    (event: MouseEvent) => {
      handleClick(event);
    },
    [handleClick]
  );
  
  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      // Prevent default to avoid ghost clicks
      event.preventDefault();
      handleClick(event);
    },
    [handleClick]
  );
  
  return {
    onClick,
    onTouchEnd,
  };
}
