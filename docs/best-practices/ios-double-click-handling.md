# iOS Double-Click Handling

## Overview

This document describes the implementation and usage of the iOS double-click fix, which addresses reliability issues with double-click/tap interactions on iOS devices (iOS 18+).

## Problem Statement

iOS devices have historically had issues with double-click event detection due to:

1. **300ms Click Delay**: Older iOS versions introduced a delay to distinguish between single taps and double taps
2. **Touch vs Mouse Events**: iOS fires both touch and mouse events, which can cause conflicts
3. **Ghost Clicks**: After a touch event, iOS may fire a duplicate mouse click event 300ms later
4. **Event Timing**: Inconsistent timing between rapid touches on iOS Safari

## Solution

We've implemented a custom React hook (`useDoubleClick`) that provides:

- Reliable double-click/tap detection across all platforms
- Special optimizations for iOS devices
- Configurable delay timing
- Separate handling for single and double clicks
- Ghost click prevention

## Usage

### Basic Double-Click Detection

```typescript
import { useDoubleClick } from '~/hooks/use-double-click';

function MyComponent() {
  const handlers = useDoubleClick({
    onDoubleClick: () => {
      console.log('Double clicked!');
    },
    delay: 300, // optional, defaults to 300ms
  });

  return <button {...handlers}>Double Click Me</button>;
}
```

### Distinguishing Single and Double Clicks

```typescript
import { useDoubleClick } from '~/hooks/use-double-click';

function MyComponent() {
  const handlers = useDoubleClick({
    onSingleClick: () => {
      console.log('Single click - select item');
    },
    onDoubleClick: () => {
      console.log('Double click - open item');
    },
    delay: 300,
  });

  return <div {...handlers}>Click or Double-Click Me</div>;
}
```

### Double-Click Only (Simplified)

```typescript
import { useDoubleClickOnly } from '~/hooks/use-double-click';

function MyComponent() {
  const handlers = useDoubleClickOnly(() => {
    console.log('Double clicked!');
  }, 300);

  return <div {...handlers}>Double-Click Only</div>;
}
```

## API Reference

### `useDoubleClick(options)`

Main hook for handling double-click events.

#### Parameters

- `options` (object):
  - `delay` (number, optional): Time window in milliseconds to detect double-click. Default: 300
  - `onSingleClick` (function, optional): Callback for single click events
  - `onDoubleClick` (function, optional): Callback for double click events

#### Returns

Object containing event handlers to spread onto target element:
- `onClick`: Mouse click handler
- `onTouchEnd`: Touch event handler (iOS only)
- `onContextMenu`: Context menu handler (iOS only, prevents long-press menu)

### `useDoubleClickOnly(callback, delay)`

Simplified hook that only handles double-clicks.

#### Parameters

- `callback` (function): Function to call on double-click
- `delay` (number, optional): Time window in milliseconds. Default: 300

#### Returns

Event handlers object (same as `useDoubleClick`)

## Implementation Details

### iOS Detection

The hook automatically detects iOS devices using:

```typescript
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
```

### Ghost Click Prevention

On iOS, after a touch event, the hook prevents duplicate mouse clicks within 500ms:

```typescript
if (isIOS && Date.now() - lastTouchEnd.current < 500) {
  event.preventDefault();
  return;
}
```

### Touch Event Handling

For iOS devices, the hook provides `onTouchEnd` handlers that:
1. Prevent rapid duplicate touches (< 50ms apart)
2. Track touch timing separately from mouse clicks
3. Properly handle the click sequence

### Timer Management

The hook uses `setTimeout` to distinguish between single and double clicks:
- On first click, starts a timer
- If second click occurs within delay, triggers double-click
- If timer expires, triggers single-click

All timers are cleaned up on component unmount.

## Testing

The implementation includes comprehensive tests covering:

- Basic double-click detection
- Single click detection
- Custom delay timing
- iOS-specific behavior
- Ghost click prevention
- Touch event handling
- Edge cases (triple-clicks, rapid clicks, etc.)

Run tests with:

```bash
pnpm vitest --run tests/use-double-click.test.ts
```

## Examples

See the demo component at `src/components/examples/DoubleClickDemo.tsx` for interactive examples.

## Browser Compatibility

- **iOS Safari**: iOS 12+
- **Chrome (iOS)**: iOS 12+
- **Firefox (iOS)**: iOS 12+
- **Desktop Browsers**: All modern browsers
- **Android**: All modern browsers

## Performance Considerations

- Minimal overhead: Uses refs and callbacks to avoid unnecessary re-renders
- No external dependencies
- Automatic cleanup of timers
- Efficient event handler memoization

## Troubleshooting

### Double-clicks not registering on iOS

1. Verify the delay is appropriate (300ms is recommended)
2. Check that the element isn't being re-rendered between clicks
3. Ensure no other event handlers are preventing propagation
4. Test with actual device (simulator behavior may differ)

### Single clicks firing when they shouldn't

1. Increase the delay value
2. Use `useDoubleClickOnly` if you don't need single-click detection
3. Check for conflicting onClick handlers

### Ghost clicks occurring

The hook should prevent this automatically on iOS. If issues persist:
1. Verify the hook's event handlers are properly spread onto the element
2. Ensure no parent elements have conflicting touch handlers
3. Check that `preventDefault` isn't being called elsewhere

## References

- [iOS Touch Event Handling](https://developer.apple.com/documentation/webkitjs/handling_events/touchevents)
- [MDN: Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [300ms Click Delay](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away)

## Contributing

When modifying the double-click implementation:

1. Run the test suite to ensure no regressions
2. Test on actual iOS devices (multiple versions if possible)
3. Update this documentation with any behavior changes
4. Add tests for new features or bug fixes
