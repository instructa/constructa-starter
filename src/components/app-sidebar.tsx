import { Link } from '@tanstack/react-router';
import type * as React from 'react';
import { NavMain } from '~/components/nav-main';
import { NavUser } from '~/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';
import DashboardIcon from 'virtual:icons/ri/dashboard-line';
import ChatIcon from 'virtual:icons/ri/chat-3-line';
import ImageIcon from 'virtual:icons/ri/image-line';
import FileTextIcon from 'virtual:icons/ri/file-text-line';
import FlowChartIcon from 'virtual:icons/ri/flow-chart';
import CameraIcon from 'virtual:icons/ri/camera-line';
import FileListIcon from 'virtual:icons/ri/file-list-line';
import FileCodeIcon from 'virtual:icons/ri/file-code-line';
import HomeSmileIcon from 'virtual:icons/ri/home-smile-line';

const navData = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard/charts',
      icon: DashboardIcon,
    },
    {
      title: 'Chat',
      url: '/dashboard/chat',
      icon: ChatIcon,
    },
    {
      title: 'Image Chat',
      url: '/dashboard/image-chat',
      icon: ImageIcon,
    },
    {
      title: 'Documents',
      url: '/dashboard/documents',
      icon: FileTextIcon,
    },
    {
      title: 'Workflow',
      url: '/dashboard/workflow',
      icon: FlowChartIcon,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: CameraIcon,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: FileListIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: FileCodeIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
};

type SidebarUser = {
  name?: string | null;
  email: string;
  image?: string | null;
};

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: SidebarUser }) {
  const resolvedUser = {
    name: user.name ?? user.email,
    email: user.email,
    avatar: user.image ?? '/avatars/shadcn.jpg',
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to="/">
                <HomeSmileIcon className="!size-5" />
                <span className="font-semibold text-base">ex0 AI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={resolvedUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
