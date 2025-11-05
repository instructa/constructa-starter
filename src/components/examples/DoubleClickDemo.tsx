import { useState } from 'react';
import { useDoubleClick } from '../../hooks/use-double-click';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function DoubleClickDemo() {
  const [singleClickCount, setSingleClickCount] = useState(0);
  const [doubleClickCount, setDoubleClickCount] = useState(0);
  const [lastAction, setLastAction] = useState<string>('');
  const [doubleOnlyCount, setDoubleOnlyCount] = useState(0);

  // Example 1: Both single and double click
  const handlers = useDoubleClick({
    onSingleClick: () => {
      setSingleClickCount(prev => prev + 1);
      setLastAction('Single Click');
    },
    onDoubleClick: () => {
      setDoubleClickCount(prev => prev + 1);
      setLastAction('Double Click');
    },
  });

  // Example 2: Double click only
  const doubleOnlyHandlers = useDoubleClick({
    onDoubleClick: () => {
      setDoubleOnlyCount(prev => prev + 1);
    },
    doubleClickOnly: true,
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">iOS Double-Click Demo</h1>
        <p className="text-muted-foreground">
          This demo showcases the iOS-optimized double-click detection hook.
          Works reliably on iOS devices, preventing ghost clicks and handling touch events properly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Example 1: Standard Behavior */}
        <Card>
          <CardHeader>
            <CardTitle>Standard Behavior</CardTitle>
            <CardDescription>
              Single click after delay, or double-click immediately
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              {...handlers}
              className="flex items-center justify-center h-32 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors border-2 border-dashed border-primary/30"
            >
              <span className="text-lg font-medium">
                Click or Tap Me!
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{singleClickCount}</div>
                <div className="text-sm text-muted-foreground">Single Clicks</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{doubleClickCount}</div>
                <div className="text-sm text-muted-foreground">Double Clicks</div>
              </div>
            </div>

            {lastAction && (
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm">Last action:</span>
                <Badge variant={lastAction === 'Double Click' ? 'default' : 'secondary'}>
                  {lastAction}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Example 2: Double-Click Only */}
        <Card>
          <CardHeader>
            <CardTitle>Double-Click Only</CardTitle>
            <CardDescription>
              Only responds to double-clicks, ignores single clicks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              {...doubleOnlyHandlers}
              className="flex items-center justify-center h-32 bg-secondary/10 rounded-lg cursor-pointer hover:bg-secondary/20 transition-colors border-2 border-dashed border-secondary/30"
            >
              <span className="text-lg font-medium">
                Double-Click Only!
              </span>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{doubleOnlyCount}</div>
              <div className="text-sm text-muted-foreground">Double Clicks</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle>iOS-Specific Optimizations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc list-inside text-sm">
            <li>
              <strong>Touch Event Support:</strong> Uses native touch events for better responsiveness
            </li>
            <li>
              <strong>Ghost Click Prevention:</strong> Prevents duplicate events from the 300ms iOS delay
            </li>
            <li>
              <strong>Configurable Timing:</strong> Customizable delay between clicks (default 300ms)
            </li>
            <li>
              <strong>Flexible Modes:</strong> Support for single+double click or double-click only
            </li>
            <li>
              <strong>Cross-Platform:</strong> Works consistently across iOS, Android, and Desktop
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
