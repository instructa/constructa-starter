import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDoubleClick, useDoubleClickOnly } from '../src/hooks/use-double-click';

describe('useDoubleClick', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('double-click detection', () => {
    it('should call onDoubleClick when two clicks occur within delay window', () => {
      const onDoubleClick = vi.fn();
      const onSingleClick = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClick({ onDoubleClick, onSingleClick, delay: 300 })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      // First click
      act(() => {
        result.current.onClick?.(mockEvent);
      });

      // Second click within delay
      act(() => {
        result.current.onClick?.(mockEvent);
      });

      expect(onDoubleClick).toHaveBeenCalledTimes(1);
      expect(onSingleClick).not.toHaveBeenCalled();
    });

    it('should call onSingleClick when only one click occurs', () => {
      const onDoubleClick = vi.fn();
      const onSingleClick = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClick({ onDoubleClick, onSingleClick, delay: 300 })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      // Single click
      act(() => {
        result.current.onClick?.(mockEvent);
      });

      // Advance time past delay
      act(() => {
        vi.advanceTimersByTime(301);
      });

      expect(onSingleClick).toHaveBeenCalledTimes(1);
      expect(onDoubleClick).not.toHaveBeenCalled();
    });

    it('should call onSingleClick when clicks are too far apart', () => {
      const onDoubleClick = vi.fn();
      const onSingleClick = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClick({ onDoubleClick, onSingleClick, delay: 300 })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      // First click
      act(() => {
        result.current.onClick?.(mockEvent);
      });

      // Advance time past delay
      act(() => {
        vi.advanceTimersByTime(301);
      });

      // Second click (too late)
      act(() => {
        result.current.onClick?.(mockEvent);
      });

      // Advance time for the second click's timer
      act(() => {
        vi.advanceTimersByTime(301);
      });

      expect(onSingleClick).toHaveBeenCalledTimes(2);
      expect(onDoubleClick).not.toHaveBeenCalled();
    });

    it('should use custom delay value', () => {
      const onDoubleClick = vi.fn();
      const customDelay = 500;

      const { result } = renderHook(() =>
        useDoubleClick({ onDoubleClick, delay: customDelay })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      // First click
      act(() => {
        result.current.onClick?.(mockEvent);
      });

      // Second click just before custom delay expires
      act(() => {
        vi.advanceTimersByTime(499);
        result.current.onClick?.(mockEvent);
      });

      expect(onDoubleClick).toHaveBeenCalledTimes(1);
    });

    it('should reset click count after double-click', () => {
      const onDoubleClick = vi.fn();
      const onSingleClick = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClick({ onDoubleClick, onSingleClick, delay: 300 })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      // First double-click sequence
      act(() => {
        result.current.onClick?.(mockEvent);
        result.current.onClick?.(mockEvent);
      });

      expect(onDoubleClick).toHaveBeenCalledTimes(1);

      // Third click should start a new sequence
      act(() => {
        result.current.onClick?.(mockEvent);
      });

      act(() => {
        vi.advanceTimersByTime(301);
      });

      expect(onSingleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('iOS-specific behavior', () => {
    let originalNavigator: Navigator;

    beforeEach(() => {
      originalNavigator = global.navigator;
      // Mock iOS device
      Object.defineProperty(global.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',
        configurable: true,
      });
      Object.defineProperty(global.navigator, 'platform', {
        value: 'iPhone',
        configurable: true,
      });
      Object.defineProperty(global.navigator, 'maxTouchPoints', {
        value: 5,
        configurable: true,
      });
    });

    afterEach(() => {
      global.navigator = originalNavigator;
    });

    it('should provide touch event handlers on iOS', () => {
      const onDoubleClick = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClick({ onDoubleClick })
      );

      expect(result.current.onTouchEnd).toBeDefined();
      expect(result.current.onClick).toBeDefined();
      expect(result.current.onContextMenu).toBeDefined();
    });

    it('should handle touch events on iOS', () => {
      const onDoubleClick = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClick({ onDoubleClick, delay: 300 })
      );

      const mockTouchEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      // First touch
      act(() => {
        result.current.onTouchEnd?.(mockTouchEvent);
      });

      // Advance time slightly to avoid ghost click prevention
      act(() => {
        vi.advanceTimersByTime(100);
      });

      // Second touch within delay
      act(() => {
        result.current.onTouchEnd?.(mockTouchEvent);
      });

      expect(onDoubleClick).toHaveBeenCalledTimes(1);
    });

    it('should prevent ghost clicks on iOS', () => {
      const onDoubleClick = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClick({ onDoubleClick })
      );

      const mockTouchEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      // Two touches in rapid succession (< 50ms)
      act(() => {
        result.current.onTouchEnd?.(mockTouchEvent);
        vi.advanceTimersByTime(30);
        result.current.onTouchEnd?.(mockTouchEvent);
      });

      // The second touch should be prevented
      expect(mockTouchEvent.preventDefault).toHaveBeenCalled();
      // Only the first touch should count
      expect(onDoubleClick).not.toHaveBeenCalled();
    });

    it('should prevent mouse click duplicates after touch on iOS', () => {
      const onSingleClick = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClick({ onSingleClick })
      );

      const mockTouchEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      const mockMouseEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      // Touch event
      act(() => {
        result.current.onTouchEnd?.(mockTouchEvent);
      });

      // Immediate mouse click (ghost click)
      act(() => {
        vi.advanceTimersByTime(100);
        result.current.onClick?.(mockMouseEvent);
      });

      // Should prevent the duplicate mouse event
      expect(mockMouseEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('useDoubleClickOnly', () => {
    it('should only trigger on double-click', () => {
      const callback = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClickOnly(callback, 300)
      );

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      // Single click
      act(() => {
        result.current.onClick?.(mockEvent);
      });

      act(() => {
        vi.advanceTimersByTime(301);
      });

      expect(callback).not.toHaveBeenCalled();

      // Double-click
      act(() => {
        result.current.onClick?.(mockEvent);
        result.current.onClick?.(mockEvent);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should use default delay if not specified', () => {
      const callback = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClickOnly(callback)
      );

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      // Two clicks within default 300ms delay
      act(() => {
        result.current.onClick?.(mockEvent);
        vi.advanceTimersByTime(200);
        result.current.onClick?.(mockEvent);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should clean up timers on unmount', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      const onSingleClick = vi.fn();

      const { result, unmount } = renderHook(() =>
        useDoubleClick({ onSingleClick })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      act(() => {
        result.current.onClick?.(mockEvent);
      });

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('should handle rapid triple-clicks correctly', () => {
      const onDoubleClick = vi.fn();
      const onSingleClick = vi.fn();

      const { result } = renderHook(() =>
        useDoubleClick({ onDoubleClick, onSingleClick, delay: 300 })
      );

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      // Three rapid clicks
      act(() => {
        result.current.onClick?.(mockEvent);
        result.current.onClick?.(mockEvent);
        result.current.onClick?.(mockEvent);
      });

      // Should trigger one double-click (first two clicks)
      expect(onDoubleClick).toHaveBeenCalledTimes(1);

      // Wait for the third click's timer
      act(() => {
        vi.advanceTimersByTime(301);
      });

      // The third click should be treated as a single click
      expect(onSingleClick).toHaveBeenCalledTimes(1);
    });

    it('should work without callbacks', () => {
      const { result } = renderHook(() => useDoubleClick({}));

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.MouseEvent;

      // Should not throw
      expect(() => {
        act(() => {
          result.current.onClick?.(mockEvent);
          result.current.onClick?.(mockEvent);
        });
      }).not.toThrow();
    });
  });
});
