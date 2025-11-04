import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDoubleClick } from '../src/hooks/use-double-click';

describe('useDoubleClick', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call onDoubleClick when clicked twice within delay', () => {
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick({ onDoubleClick }));

    const mockEvent = { 
      type: 'click',
      preventDefault: vi.fn() 
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.onClick(mockEvent);
    });

    act(() => {
      result.current.onClick(mockEvent);
    });

    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('should call onSingleClick when clicked once and delay expires', () => {
    const onSingleClick = vi.fn();
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => 
      useDoubleClick({ onSingleClick, onDoubleClick })
    );

    const mockEvent = { 
      type: 'click',
      preventDefault: vi.fn() 
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.onClick(mockEvent);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSingleClick).toHaveBeenCalledTimes(1);
    expect(onDoubleClick).not.toHaveBeenCalled();
  });

  it('should not call onSingleClick in doubleClickOnly mode', () => {
    const onSingleClick = vi.fn();
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => 
      useDoubleClick({ 
        onSingleClick, 
        onDoubleClick, 
        doubleClickOnly: true 
      })
    );

    const mockEvent = { 
      type: 'click',
      preventDefault: vi.fn() 
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.onClick(mockEvent);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSingleClick).not.toHaveBeenCalled();
    expect(onDoubleClick).not.toHaveBeenCalled();
  });

  it('should respect custom delay', () => {
    const onSingleClick = vi.fn();
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => 
      useDoubleClick({ 
        onSingleClick, 
        onDoubleClick, 
        delay: 500 
      })
    );

    const mockEvent = { 
      type: 'click',
      preventDefault: vi.fn() 
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.onClick(mockEvent);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onSingleClick).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(onSingleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle touch events for iOS', () => {
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick({ onDoubleClick }));

    const mockTouchEvent = { 
      type: 'touchend',
      preventDefault: vi.fn() 
    } as unknown as React.TouchEvent;

    act(() => {
      result.current.onTouchEnd(mockTouchEvent);
    });

    act(() => {
      result.current.onTouchEnd(mockTouchEvent);
    });

    expect(onDoubleClick).toHaveBeenCalledTimes(1);
    expect(mockTouchEvent.preventDefault).toHaveBeenCalled();
  });

  it('should prevent ghost clicks on iOS', () => {
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick({ onDoubleClick }));

    const mockTouchEvent = { 
      type: 'touchend',
      preventDefault: vi.fn() 
    } as unknown as React.TouchEvent;

    const mockClickEvent = { 
      type: 'click',
      preventDefault: vi.fn() 
    } as unknown as React.MouseEvent;

    // First touch
    act(() => {
      result.current.onTouchEnd(mockTouchEvent);
    });

    // Ghost click that follows touch (within 500ms)
    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current.onClick(mockClickEvent);
    });

    // Should have prevented the ghost click
    expect(mockClickEvent.preventDefault).toHaveBeenCalled();
    // Should only have 1 call from the touch, not from the ghost click
    expect(onDoubleClick).not.toHaveBeenCalled();
  });

  it('should clear timer when new click comes before delay', () => {
    const onSingleClick = vi.fn();
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => 
      useDoubleClick({ onSingleClick, onDoubleClick })
    );

    const mockEvent = { 
      type: 'click',
      preventDefault: vi.fn() 
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.onClick(mockEvent);
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current.onClick(mockEvent);
    });

    // Double click should be called, not single click
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
    expect(onSingleClick).not.toHaveBeenCalled();
  });

  it('should reset click count after double click', () => {
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick({ onDoubleClick }));

    const mockEvent = { 
      type: 'click',
      preventDefault: vi.fn() 
    } as unknown as React.MouseEvent;

    // First double click
    act(() => {
      result.current.onClick(mockEvent);
      result.current.onClick(mockEvent);
    });

    expect(onDoubleClick).toHaveBeenCalledTimes(1);

    // Wait and click again - should not trigger anything yet
    act(() => {
      vi.advanceTimersByTime(400);
    });

    act(() => {
      result.current.onClick(mockEvent);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Still only 1 double click (the new clicks don't count as double)
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('should work with both onClick and onTouchEnd handlers', () => {
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick({ onDoubleClick }));

    const mockClickEvent = { 
      type: 'click',
      preventDefault: vi.fn() 
    } as unknown as React.MouseEvent;

    const mockTouchEvent = { 
      type: 'touchend',
      preventDefault: vi.fn() 
    } as unknown as React.TouchEvent;

    // Click once
    act(() => {
      result.current.onClick(mockClickEvent);
    });

    // Then touch (double click achieved through different event types)
    act(() => {
      result.current.onTouchEnd(mockTouchEvent);
    });

    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle rapid triple clicks correctly', () => {
    const onSingleClick = vi.fn();
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => 
      useDoubleClick({ onSingleClick, onDoubleClick })
    );

    const mockEvent = { 
      type: 'click',
      preventDefault: vi.fn() 
    } as unknown as React.MouseEvent;

    // Three rapid clicks
    act(() => {
      result.current.onClick(mockEvent);
      result.current.onClick(mockEvent);
      result.current.onClick(mockEvent);
    });

    // Should trigger double click once (first two clicks)
    expect(onDoubleClick).toHaveBeenCalledTimes(1);

    // Wait for delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // The third click should register as a single click
    expect(onSingleClick).toHaveBeenCalledTimes(1);
  });

  it('should allow touch events after ghost click window', () => {
    const onDoubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick({ onDoubleClick }));

    const mockTouchEvent = { 
      type: 'touchend',
      preventDefault: vi.fn() 
    } as unknown as React.TouchEvent;

    const mockClickEvent = { 
      type: 'click',
      preventDefault: vi.fn() 
    } as unknown as React.MouseEvent;

    // Touch event
    act(() => {
      result.current.onTouchEnd(mockTouchEvent);
    });

    // Wait longer than ghost click window (500ms)
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // This click should work normally
    act(() => {
      result.current.onClick(mockClickEvent);
    });

    expect(mockClickEvent.preventDefault).not.toHaveBeenCalled();
  });
});
