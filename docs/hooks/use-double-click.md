# useDoubleClick Hook

## Overview

The `useDoubleClick` hook provides reliable double-click and double-tap detection across all platforms, with special optimizations for iOS devices. It solves common iOS issues such as ghost clicks, delayed touch responses, and inconsistent double-tap behavior.

## Problem Statement

On iOS devices, double-click/tap interactions often fail or require multiple attempts due to:

- **Ghost Clicks**: iOS adds a 300ms delay after touch events and can fire both touch and click events
- **Touch Event Handling**: Standard `onDoubleClick` doesn't work reliably with touch events
- **Event Timing**: Inconsistent timing between touch and click events
- **Context Menu**: Long presses can interfere with double-tap detection

## Solution

This hook addresses all these issues by:

1. Using both touch and click event handlers
2. Preventing ghost clicks with smart event deduplication
3. Implementing custom double-tap detection with configurable timing
4. Supporting both single and double click callbacks

## Installation

The hook is located at `src/hooks/use-double-click.ts` and is ready to use in your project.

## API

### Parameters

```typescript
interface UseDoubleClickOptions {
  /**
   * Callback for single click events
   */
  onSingleClick?: (event: MouseEvent | TouchEvent) => void;
  
  /**
   * Callback for double click events (required)
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
```

### Return Value

```typescript
interface UseDoubleClickReturn {
  onClick: (event: MouseEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}
```

## Usage Examples

### Basic Usage (Single and Double Click)

```tsx
import { useDoubleClick } from '@/hooks/use-double-click';

function MyComponent() {
  const { onClick, onTouchEnd } = useDoubleClick({
    onSingleClick: () => {
      console.log('Single click detected');
    },
    onDoubleClick: () => {
      console.log('Double click detected');
    },
  });

  return (
    <button onClick={onClick} onTouchEnd={onTouchEnd}>
      Click or Tap Me
    </button>
  );
}
```

### Double-Click Only Mode

```tsx
const { onClick, onTouchEnd } = useDoubleClick({
  onDoubleClick: () => {
    console.log('Double click only!');
  },
  doubleClickOnly: true, // Single clicks are ignored
});
```

### Custom Delay

```tsx
const { onClick, onTouchEnd } = useDoubleClick({
  onDoubleClick: () => {
    console.log('Slower double click');
  },
  delay: 500, // Wait up to 500ms for second click
});
```

### With State Management

```tsx
function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { onClick, onTouchEnd } = useDoubleClick({
    onSingleClick: () => {
      setIsLiked(!isLiked);
    },
    onDoubleClick: () => {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    },
  });

  return (
    <button onClick={onClick} onTouchEnd={onTouchEnd}>
      ❤️ {likes} {isLiked ? '(Liked)' : ''}
    </button>
  );
}
```

## How It Works

### 1. Click Counting
- Tracks the number of clicks within the specified delay
- Resets counter after double click or timeout

### 2. Ghost Click Prevention
- Records timestamp of touch events
- Ignores click events that occur within 500ms of a touch event
- Prevents duplicate event firing on iOS

### 3. Timer Management
- Uses a timer to detect when clicking has stopped
- Clears timer when new click arrives
- Fires appropriate callback based on click count

### 4. Event Handling
- `onClick`: Handles mouse clicks (desktop)
- `onTouchEnd`: Handles touch events (mobile/iOS)
- Both handlers share the same logic

## Platform Support

- ✅ iOS 18+ (primary target)
- ✅ Android
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile web browsers

## Testing

The hook includes comprehensive tests covering:

- Basic double-click detection
- Single click callback
- Double-click only mode
- Custom delay timing
- iOS touch events
- Ghost click prevention
- Triple-click handling
- Event type mixing

Run tests with:

```bash
pnpm test tests/use-double-click.test.ts --run
```

## Demo Component

A demo component is available at `src/components/examples/DoubleClickDemo.tsx` that showcases:

- Standard mode (single + double click)
- Double-click only mode
- Visual feedback
- Click counters
- Usage examples

## Best Practices

1. **Always include both handlers**: Use both `onClick` and `onTouchEnd` for cross-platform support
2. **Prevent default carefully**: The hook handles `preventDefault` on touch events to prevent ghost clicks
3. **Consider delay timing**: Default 300ms works well, but adjust based on your use case
4. **Test on real devices**: Always test on actual iOS devices when possible
5. **Provide visual feedback**: Give users immediate feedback on interaction

## Troubleshooting

### Double clicks not working on iOS
- Ensure both `onClick` and `onTouchEnd` are attached to your element
- Check that no parent element is calling `stopPropagation()`
- Verify element is not disabled or hidden

### Single clicks firing too early
- Increase the `delay` parameter
- Check that you're not mixing native `onDoubleClick` with this hook

### Ghost clicks still occurring
- The hook should prevent these automatically
- Verify you're using the returned handlers correctly
- Check for conflicting click handlers in parent components

## Related Issues

- [INS-5: iOS Double-Click Bug](linear-issue-url)

## License

Part of the Constructa Starter project.
