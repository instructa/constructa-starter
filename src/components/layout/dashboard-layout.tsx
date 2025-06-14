import { Link } from '@tanstack/react-router';
import { cn } from '~/lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r bg-background/80 backdrop-blur">
        <div className="p-4 font-bold text-lg">Dashboard</div>
        <nav className="space-y-1 px-2">
          <Link
            to="/dashboard"
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                'block rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )
            }
            end
          >
            Assistant
          </Link>
          {/* Add more items here */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
