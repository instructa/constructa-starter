# useDoubleClick Hook

A custom React hook for handling double-click and double-tap events reliably across all platforms, with special optimizations for iOS devices.

## Problem Statement

iOS devices have historically had issues with double-click detection due to:
- The 300ms click delay on older iOS versions
- Conflicts between touch and mouse events
- Unreliable native double-click detection
- Ghost clicks (duplicate events after touch events)

## Solution

The `useDoubleClick` hook provides a robust solution that:
- Uses native touch events for better iOS responsiveness
- Prevents ghost clicks through intelligent timing detection
- Handles both single and double-click scenarios
- Works consistently across iOS, Android, and Desktop platforms

## Installation

The hook is located at `src/hooks/use-double-click.ts` and can be imported directly:

```typescript
import { useDoubleClick } from '@/hooks/use-double-click';
```

## API Reference

### Options

```typescript
interface UseDoubleClickOptions {
  onSingleClick?: (event: MouseEvent | TouchEvent) => void;
  onDoubleClick: (event: MouseEvent | TouchEvent) => void;
  delay?: number; // Default: 300ms
  doubleClickOnly?: boolean; // Default: false
}
```

### Return Value

```typescript
interface UseDoubleClickReturn {
  onClick: (event: MouseEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}
```

## Usage Examples

### Example 1: Standard Behavior (Single + Double Click)

```tsx
import { useDoubleClick } from '@/hooks/use-double-click';

function MyComponent() {
  const handlers = useDoubleClick({
    onSingleClick: () => {
      console.log('Single click detected');
    },
    onDoubleClick: () => {
      console.log('Double click detected');
    },
  });

  return (
    <div {...handlers}>
      Click me once or twice!
    </div>
  );
}
```

### Example 2: Double-Click Only

```tsx
import { useDoubleClick } from '@/hooks/use-double-click';

function MyComponent() {
  const handlers = useDoubleClick({
    onDoubleClick: () => {
      console.log('Double click detected');
    },
    doubleClickOnly: true, // Ignore single clicks
  });

  return (
    <div {...handlers}>
      Double-click me!
    </div>
  );
}
```

### Example 3: Custom Delay

```tsx
import { useDoubleClick } from '@/hooks/use-double-click';

function MyComponent() {
  const handlers = useDoubleClick({
    onSingleClick: () => {
      console.log('Single click');
    },
    onDoubleClick: () => {
      console.log('Double click');
    },
    delay: 500, // 500ms window for double-click detection
  });

  return (
    <button {...handlers}>
      Click with custom timing
    </button>
  );
}
```

## iOS-Specific Optimizations

### 1. Touch Event Handling

The hook uses native `touchend` events for better responsiveness on iOS:

```typescript
onTouchEnd: (event: TouchEvent) => {
  event.preventDefault(); // Prevent ghost clicks
  handleClick(event);
}
```

### 2. Ghost Click Prevention

iOS can fire both touch and click events for the same user interaction. The hook prevents this:

```typescript
if (event.type === 'click') {
  const now = Date.now();
  if (now - lastTouchTimeRef.current < 500) {
    event.preventDefault();
    return; // Ignore ghost click
  }
}
```

### 3. Timing Accuracy

Uses `Date.now()` for precise timing measurements instead of relying on event timestamps:

```typescript
lastTouchTimeRef.current = Date.now();
```

## Testing

Comprehensive tests are available in `tests/use-double-click.test.ts` covering:

- ✅ Double-click detection
- ✅ Single-click detection with delay
- ✅ Double-click only mode
- ✅ Custom delay timing
- ✅ iOS touch events
- ✅ Ghost click prevention
- ✅ Multiple sequential double-clicks
- ✅ Edge cases (3+ rapid clicks)

Run tests with:

```bash
pnpm vitest --run tests/use-double-click.test.ts
```

## Demo

A complete interactive demo is available at:
- **Component**: `src/components/examples/DoubleClickDemo.tsx`
- **Route**: Create a route that renders `<DoubleClickDemo />` to see it in action

The demo showcases:
- Standard single + double click behavior
- Double-click only mode
- Click counters
- Visual feedback
- iOS-specific optimizations explanation

## Browser Compatibility

| Platform | Supported | Notes |
|----------|-----------|-------|
| iOS 12+ | ✅ | Fully tested with touch events |
| iOS 18+ | ✅ | All features working |
| Android | ✅ | Touch events supported |
| Desktop | ✅ | Standard mouse events |
| Safari | ✅ | Optimized for iOS Safari |
| Chrome | ✅ | All platforms |
| Firefox | ✅ | All platforms |

## Technical Details

### Type Safety

The hook uses correct browser types:
- `number` for `setTimeout` return value (not `NodeJS.Timeout`)
- `window.setTimeout` explicitly used for browser environment
- Proper TypeScript event types (`MouseEvent`, `TouchEvent`)

### Memory Management

- Clears timers properly to prevent memory leaks
- Resets state after each interaction
- No memory retained between hook re-renders

### Performance

- Minimal re-renders using `useCallback` and `useRef`
- No state updates for internal timing logic
- Efficient event handling

## Migration from Native Events

If you're currently using native double-click:

```tsx
// Before (unreliable on iOS)
<div onDoubleClick={handleDoubleClick}>
  Click me
</div>

// After (reliable on all platforms)
import { useDoubleClick } from '@/hooks/use-double-click';

const handlers = useDoubleClick({
  onDoubleClick: handleDoubleClick,
});

<div {...handlers}>
  Click me
</div>
```

## Troubleshooting

### Issue: Single clicks are detected as double-clicks

**Solution**: Increase the `delay` option:

```tsx
const handlers = useDoubleClick({
  onDoubleClick: handleDoubleClick,
  delay: 400, // Increase from default 300ms
});
```

### Issue: Double-clicks are too slow

**Solution**: Decrease the `delay` option:

```tsx
const handlers = useDoubleClick({
  onDoubleClick: handleDoubleClick,
  delay: 200, // Decrease from default 300ms
});
```

### Issue: Touch events not working on desktop

**Solution**: This is expected behavior. Desktop uses mouse events. The hook automatically handles both.

## Contributing

When modifying this hook:
1. Ensure all tests pass: `pnpm vitest --run tests/use-double-click.test.ts`
2. Test on actual iOS devices (iOS 12+)
3. Verify no regressions on Android and Desktop
4. Update documentation if API changes

## License

This hook is part of the project and follows the same license terms.
