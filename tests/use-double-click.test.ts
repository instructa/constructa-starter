import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDoubleClick } from '../src/hooks/use-double-click';
import type { MouseEvent, TouchEvent } from 'react';

describe('useDoubleClick', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Helper to create mock mouse event
  const createMouseEvent = (): Partial<MouseEvent> => ({
    type: 'click',
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
  });

  // Helper to create mock touch event
  const createTouchEvent = (): Partial<TouchEvent> => ({
    type: 'touchend',
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
  });

  it('should call onDoubleClick when clicked twice quickly', () => {
    const onDoubleClick = vi.fn();
    const onSingleClick = vi.fn();

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick, onSingleClick })
    );

    const event = createMouseEvent();

    act(() => {
      result.current.onClick(event as MouseEvent);
      result.current.onClick(event as MouseEvent);
    });

    expect(onDoubleClick).toHaveBeenCalledTimes(1);
    expect(onSingleClick).not.toHaveBeenCalled();
  });

  it('should call onSingleClick when clicked once', () => {
    const onDoubleClick = vi.fn();
    const onSingleClick = vi.fn();

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick, onSingleClick })
    );

    const event = createMouseEvent();

    act(() => {
      result.current.onClick(event as MouseEvent);
      vi.advanceTimersByTime(350);
    });

    expect(onSingleClick).toHaveBeenCalledTimes(1);
    expect(onDoubleClick).not.toHaveBeenCalled();
  });

  it('should not call onSingleClick if doubleClickOnly is true', () => {
    const onDoubleClick = vi.fn();
    const onSingleClick = vi.fn();

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick, onSingleClick, doubleClickOnly: true })
    );

    const event = createMouseEvent();

    act(() => {
      result.current.onClick(event as MouseEvent);
      vi.advanceTimersByTime(350);
    });

    expect(onSingleClick).not.toHaveBeenCalled();
    expect(onDoubleClick).not.toHaveBeenCalled();
  });

  it('should respect custom delay', () => {
    const onDoubleClick = vi.fn();
    const onSingleClick = vi.fn();
    const customDelay = 500;

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick, onSingleClick, delay: customDelay })
    );

    const event = createMouseEvent();

    act(() => {
      result.current.onClick(event as MouseEvent);
      vi.advanceTimersByTime(450);
    });

    expect(onSingleClick).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(60);
    });

    expect(onSingleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle touch events on iOS', () => {
    const onDoubleClick = vi.fn();
    const onSingleClick = vi.fn();

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick, onSingleClick })
    );

    const event = createTouchEvent();

    act(() => {
      result.current.onTouchEnd(event as TouchEvent);
      result.current.onTouchEnd(event as TouchEvent);
    });

    expect(onDoubleClick).toHaveBeenCalledTimes(1);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should prevent ghost clicks after touch events', () => {
    const onDoubleClick = vi.fn();
    const onSingleClick = vi.fn();

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick, onSingleClick })
    );

    const touchEvent = createTouchEvent();
    const mouseEvent = createMouseEvent();

    // Simulate touch event
    act(() => {
      result.current.onTouchEnd(touchEvent as TouchEvent);
    });

    // Simulate ghost click within 500ms
    act(() => {
      vi.advanceTimersByTime(100);
      result.current.onClick(mouseEvent as MouseEvent);
    });

    expect(mouseEvent.preventDefault).toHaveBeenCalled();
    
    // Should not count the ghost click
    act(() => {
      vi.advanceTimersByTime(350);
    });
    
    expect(onSingleClick).toHaveBeenCalledTimes(1); // Only from touch
  });

  it('should allow clicks after ghost click window expires', () => {
    const onDoubleClick = vi.fn();
    const onSingleClick = vi.fn();

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick, onSingleClick })
    );

    const touchEvent = createTouchEvent();
    const mouseEvent = createMouseEvent();

    // Simulate touch event
    act(() => {
      result.current.onTouchEnd(touchEvent as TouchEvent);
    });

    // Wait for ghost click window to expire
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // Now click should work normally
    act(() => {
      result.current.onClick(mouseEvent as MouseEvent);
      vi.advanceTimersByTime(350);
    });

    expect(mouseEvent.preventDefault).not.toHaveBeenCalled();
    expect(onSingleClick).toHaveBeenCalledTimes(2); // One from touch, one from click
  });

  it('should reset click count after delay', () => {
    const onDoubleClick = vi.fn();
    const onSingleClick = vi.fn();

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick, onSingleClick })
    );

    const event = createMouseEvent();

    // First click
    act(() => {
      result.current.onClick(event as MouseEvent);
      vi.advanceTimersByTime(350);
    });

    expect(onSingleClick).toHaveBeenCalledTimes(1);

    // Second click (should be treated as new single click)
    act(() => {
      result.current.onClick(event as MouseEvent);
      vi.advanceTimersByTime(350);
    });

    expect(onSingleClick).toHaveBeenCalledTimes(2);
    expect(onDoubleClick).not.toHaveBeenCalled();
  });

  it('should clear timer if second click arrives before delay', () => {
    const onDoubleClick = vi.fn();
    const onSingleClick = vi.fn();

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick, onSingleClick })
    );

    const event = createMouseEvent();

    act(() => {
      result.current.onClick(event as MouseEvent);
      vi.advanceTimersByTime(200);
      result.current.onClick(event as MouseEvent);
    });

    expect(onDoubleClick).toHaveBeenCalledTimes(1);
    
    // Wait for delay to ensure single click doesn't fire
    act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(onSingleClick).not.toHaveBeenCalled();
  });

  it('should handle multiple double-clicks in sequence', () => {
    const onDoubleClick = vi.fn();

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick })
    );

    const event = createMouseEvent();

    // First double-click
    act(() => {
      result.current.onClick(event as MouseEvent);
      result.current.onClick(event as MouseEvent);
    });

    expect(onDoubleClick).toHaveBeenCalledTimes(1);

    // Second double-click
    act(() => {
      result.current.onClick(event as MouseEvent);
      result.current.onClick(event as MouseEvent);
    });

    expect(onDoubleClick).toHaveBeenCalledTimes(2);
  });

  it('should handle three rapid clicks correctly', () => {
    const onDoubleClick = vi.fn();
    const onSingleClick = vi.fn();

    const { result } = renderHook(() =>
      useDoubleClick({ onDoubleClick, onSingleClick })
    );

    const event = createMouseEvent();

    act(() => {
      result.current.onClick(event as MouseEvent);
      result.current.onClick(event as MouseEvent);
      result.current.onClick(event as MouseEvent);
    });

    // First two clicks should trigger double-click
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
    
    // Third click should be treated as single click
    act(() => {
      vi.advanceTimersByTime(350);
    });
    
    expect(onSingleClick).toHaveBeenCalledTimes(1);
  });
});
