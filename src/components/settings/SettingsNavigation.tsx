import { Link } from '@tanstack/react-router';
import { cn } from '~/lib/utils';
import { SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';
import { settingsNavItems, type SettingsNavItem, type SettingsSection } from './settings-nav';

interface SettingsNavigationProps {
  readonly activeSection: SettingsSection;
}

export function SettingsNavigation({ activeSection }: SettingsNavigationProps) {
  const renderNavItem = (item: SettingsNavItem) => {
    const isActive = item.section === activeSection;
    const Icon = item.icon;

    return (
      <SidebarMenuItem key={item.section}>
        <SidebarMenuButton asChild isActive={isActive}>
          <Link
            to="."
            search={(prev) => {
              const next = { ...prev } as Record<string, unknown>;
              next.settings = item.section;
              return next;
            }}
            className={cn(
              'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors',
              isActive
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span className="font-medium leading-none">{item.label}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  const workspaceItems = settingsNavItems.filter((item) => item.section === 'account' || item.section === 'preferences');
  const billingItems = settingsNavItems.filter((item) => item.section === 'plans' || item.section === 'billing');

  return (
    <div className="flex flex-col gap-6 px-2 py-4">
      <div className="space-y-2">
        <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Workspace
        </p>
        <div className="space-y-1">{workspaceItems.map(renderNavItem)}</div>
      </div>
      <div className="space-y-2">
        <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Billing
        </p>
        <div className="space-y-1">{billingItems.map(renderNavItem)}</div>
      </div>
    </div>
  );
}
