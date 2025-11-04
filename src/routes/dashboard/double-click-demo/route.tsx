import { createFileRoute } from '@tanstack/react-router';
import { DoubleClickDemo } from '~/components/examples/DoubleClickDemo';

export const Route = createFileRoute('/dashboard/double-click-demo')({
  component: RouteComponent,
});

function RouteComponent() {
  return <DoubleClickDemo />;
}
