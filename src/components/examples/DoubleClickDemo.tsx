import { useState } from 'react';
import { useDoubleClick } from '../../hooks/use-double-click';

/**
 * Demo component showcasing the iOS-compatible double-click hook
 * 
 * This component demonstrates how to use the useDoubleClick hook
 * to handle both single and double click/tap events reliably across
 * all platforms, including iOS devices.
 */
export function DoubleClickDemo() {
  const [singleClickCount, setSingleClickCount] = useState(0);
  const [doubleClickCount, setDoubleClickCount] = useState(0);
  const [lastAction, setLastAction] = useState<string>('');

  const { onClick, onTouchEnd } = useDoubleClick({
    onSingleClick: () => {
      setSingleClickCount((prev) => prev + 1);
      setLastAction('Single Click');
    },
    onDoubleClick: () => {
      setDoubleClickCount((prev) => prev + 1);
      setLastAction('Double Click');
    },
  });

  const doubleClickOnly = useDoubleClick({
    onDoubleClick: () => {
      setLastAction('Double Click Only Mode');
    },
    doubleClickOnly: true,
  });

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">iOS Double-Click Demo</h1>
        <p className="text-gray-600">
          Test the double-click/tap functionality. Works on all devices including iOS.
        </p>
      </div>

      <div className="space-y-4">
        {/* Standard mode with both single and double click */}
        <div className="border rounded-lg p-6 bg-blue-50">
          <h2 className="text-xl font-semibold mb-4">Standard Mode</h2>
          <button
            onClick={onClick}
            onTouchEnd={onTouchEnd}
            className="w-full py-8 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors text-lg font-medium"
          >
            Click or Tap Me!
          </button>
          <div className="mt-4 space-y-2">
            <p className="text-sm">
              Single Clicks: <span className="font-bold">{singleClickCount}</span>
            </p>
            <p className="text-sm">
              Double Clicks: <span className="font-bold">{doubleClickCount}</span>
            </p>
            <p className="text-sm">
              Last Action: <span className="font-bold text-blue-600">{lastAction || 'None'}</span>
            </p>
          </div>
        </div>

        {/* Double-click only mode */}
        <div className="border rounded-lg p-6 bg-purple-50">
          <h2 className="text-xl font-semibold mb-4">Double-Click Only Mode</h2>
          <button
            onClick={doubleClickOnly.onClick}
            onTouchEnd={doubleClickOnly.onTouchEnd}
            className="w-full py-8 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 active:bg-purple-700 transition-colors text-lg font-medium"
          >
            Double Click/Tap Only
          </button>
          <p className="mt-4 text-sm text-gray-600">
            This button only responds to double clicks/taps. Single clicks are ignored.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-2">Features:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Reliable double-tap detection on iOS devices</li>
          <li>Prevents ghost clicks (300ms delay issue on iOS)</li>
          <li>Configurable delay between clicks</li>
          <li>Optional single-click callback</li>
          <li>Works across all platforms (iOS, Android, Desktop)</li>
          <li>Touch and click event support</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold mb-2">💡 Usage Example:</h3>
        <pre className="text-xs bg-white p-4 rounded overflow-x-auto">
{`import { useDoubleClick } from '@/hooks/use-double-click';

const { onClick, onTouchEnd } = useDoubleClick({
  onSingleClick: () => console.log('single'),
  onDoubleClick: () => console.log('double'),
  delay: 300, // optional, default is 300ms
});

<button onClick={onClick} onTouchEnd={onTouchEnd}>
  Click me
</button>`}
        </pre>
      </div>
    </div>
  );
}
