import * as React from 'react';
import { useDoubleClick, useDoubleClickOnly } from '~/hooks/use-double-click';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

/**
 * Demo component showcasing double-click functionality that works reliably on iOS
 * 
 * This component demonstrates:
 * 1. Basic double-click detection
 * 2. Differentiating between single and double clicks
 * 3. iOS-specific optimizations
 */
export function DoubleClickDemo() {
  const [singleClickCount, setSingleClickCount] = React.useState(0);
  const [doubleClickCount, setDoubleClickCount] = React.useState(0);
  const [onlyDoubleClickCount, setOnlyDoubleClickCount] = React.useState(0);
  const [lastAction, setLastAction] = React.useState<string>('');

  // Example 1: Distinguishing between single and double clicks
  const dualHandlers = useDoubleClick({
    onSingleClick: () => {
      setSingleClickCount((prev) => prev + 1);
      setLastAction('Single Click');
    },
    onDoubleClick: () => {
      setDoubleClickCount((prev) => prev + 1);
      setLastAction('Double Click');
    },
    delay: 300,
  });

  // Example 2: Only handling double clicks (ignoring single clicks)
  const doubleOnlyHandlers = useDoubleClickOnly(() => {
    setOnlyDoubleClickCount((prev) => prev + 1);
    setLastAction('Double-Click Only');
  }, 300);

  // Example 3: Double-click with custom actions
  const [cardColor, setCardColor] = React.useState('bg-background');
  const colorChangeHandlers = useDoubleClickOnly(() => {
    const colors = ['bg-background', 'bg-blue-50', 'bg-green-50', 'bg-purple-50', 'bg-orange-50'];
    setCardColor((prev) => {
      const currentIndex = colors.indexOf(prev);
      return colors[(currentIndex + 1) % colors.length];
    });
    setLastAction('Card Color Changed');
  }, 300);

  const resetCounters = () => {
    setSingleClickCount(0);
    setDoubleClickCount(0);
    setOnlyDoubleClickCount(0);
    setLastAction('Counters Reset');
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>iOS Double-Click Demo</CardTitle>
          <CardDescription>
            Demonstrations of reliable double-click/tap detection that works across all platforms,
            including iOS devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Display */}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Last Action: <span className="text-primary">{lastAction || 'None'}</span></p>
          </div>

          {/* Example 1: Dual Click Handler */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Example 1: Single vs Double Click</h3>
            <p className="text-sm text-muted-foreground">
              This button can detect both single and double clicks separately
            </p>
            <Button
              {...dualHandlers}
              variant="default"
              size="lg"
              className="w-full"
            >
              Click Me (Single or Double)
            </Button>
            <div className="flex gap-4 text-sm">
              <div className="flex-1 p-3 bg-secondary rounded">
                <p className="font-medium">Single Clicks</p>
                <p className="text-2xl font-bold">{singleClickCount}</p>
              </div>
              <div className="flex-1 p-3 bg-secondary rounded">
                <p className="font-medium">Double Clicks</p>
                <p className="text-2xl font-bold">{doubleClickCount}</p>
              </div>
            </div>
          </div>

          {/* Example 2: Double-Click Only */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Example 2: Double-Click Only</h3>
            <p className="text-sm text-muted-foreground">
              This button only responds to double clicks, ignoring single clicks
            </p>
            <Button
              {...doubleOnlyHandlers}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Double-Click Only
            </Button>
            <div className="p-3 bg-secondary rounded text-sm">
              <p className="font-medium">Double-Click Count</p>
              <p className="text-2xl font-bold">{onlyDoubleClickCount}</p>
            </div>
          </div>

          {/* Example 3: Interactive Card */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Example 3: Interactive Element</h3>
            <p className="text-sm text-muted-foreground">
              Double-click the card below to cycle through colors
            </p>
            <Card
              {...colorChangeHandlers}
              className={`${cardColor} transition-colors duration-300 cursor-pointer border-2 hover:border-primary`}
            >
              <CardContent className="p-8 text-center">
                <p className="text-lg font-medium">Double-Click to Change Color</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try it on your iOS device!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Reset Button */}
          <div className="pt-4 border-t">
            <Button
              onClick={resetCounters}
              variant="ghost"
              className="w-full"
            >
              Reset All Counters
            </Button>
          </div>

          {/* iOS-Specific Notes */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-sm mb-2">iOS Optimizations Applied:</h4>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
              <li>Touch event handling for improved responsiveness</li>
              <li>Ghost click prevention (300ms duplicate prevention)</li>
              <li>Configurable delay timing (default 300ms)</li>
              <li>Proper event delegation to avoid conflicts</li>
              <li>Context menu prevention on long press</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Basic Usage:</h4>
              <pre className="bg-muted p-3 rounded overflow-x-auto">
                <code>{`import { useDoubleClick } from '~/hooks/use-double-click';

const handlers = useDoubleClick({
  onSingleClick: () => console.log('Single!'),
  onDoubleClick: () => console.log('Double!'),
  delay: 300 // optional, defaults to 300ms
});

return <button {...handlers}>Click Me</button>;`}</code>
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Double-Click Only:</h4>
              <pre className="bg-muted p-3 rounded overflow-x-auto">
                <code>{`import { useDoubleClickOnly } from '~/hooks/use-double-click';

const handlers = useDoubleClickOnly(
  () => console.log('Double clicked!'),
  300 // optional delay
);

return <div {...handlers}>Double-Click Me</div>;`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
