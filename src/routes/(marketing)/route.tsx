import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Header } from '~/components/Header';

export const Route = createFileRoute('/(marketing)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
