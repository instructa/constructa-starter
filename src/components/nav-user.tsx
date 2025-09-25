'use client';

import { useCallback } from 'react';
import RiGithubFill from '~icons/ri/github-fill';
import RiMore from '~icons/ri/more-line';
import RiListSettingsLine from '~icons/ri/list-settings-line';
import RiBankCard2Line from '~icons/ri/bank-card-2-line';
import RiBillLine from '~icons/ri/bill-line';
import RiLogoutBox from '~icons/ri/logout-box-line';
import RiUser from '~icons/ri/user-line';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { authClient } from '~/lib/auth-client';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui/sidebar';
import { SettingsDialog } from '~/components/settings';
import { isSettingsSection, type SettingsSection } from '~/components/settings/settings-nav';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const location = useRouterState({ select: (state) => state.location });
  const search = location.search as Record<string, unknown>;
  const rawSettings = (search as { settings?: unknown }).settings;
  const settingsDialogOpen = isSettingsSection(rawSettings);
  const activeSettingsSection = settingsDialogOpen ? (rawSettings as SettingsSection) : null;

  const openSettingsDialog = useCallback(
    (section: SettingsSection) => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      params.set('settings', section);
      const query = params.toString();
      const href = `${window.location.pathname}${query ? `?${query}` : ''}`;
      router.navigate({ href, replace: activeSettingsSection === section });
    },
    [activeSettingsSection, router]
  );

  const handleSettingsDialogChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) return;
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      params.delete('settings');
      params.delete('github');
      const query = params.toString();
      const href = `${window.location.pathname}${query ? `?${query}` : ''}`;
      router.navigate({ href, replace: true });
    },
    [router]
  );

  const handleLogout = useCallback(async () => {
    try {
      await authClient.signOut();
      // Navigate to the home page or sign-in page after logout
      router.navigate({ to: '/' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [router]);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                </div>
                <RiMore className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Workspace
                </DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => openSettingsDialog('account')}>
                  <RiUser />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => openSettingsDialog('preferences')}>
                  <RiListSettingsLine />
                  Preferences
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Billing
                </DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => openSettingsDialog('plans')}>
                  <RiBankCard2Line />
                  Plans & subscription
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => openSettingsDialog('billing')}>
                  <RiBillLine />
                  Billing & invoices
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>
                <RiLogoutBox />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <SettingsDialog open={settingsDialogOpen} onOpenChange={handleSettingsDialogChange} />
    </>
  );
}
