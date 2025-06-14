import { Link } from "@tanstack/react-router";
import {
	Camera,
	File,
	FileText,
	HelpCircle,
	LayoutDashboard,
	Search,
	Settings,
	Workflow,
} from "lucide-react";
import { Bot, Image } from "lucide-react";
import type * as React from "react";
import { NavMain } from "~/components/nav-main";
import { NavSecondary } from "~/components/nav-secondary";
import { NavUser } from "~/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar";

const data = {
	user: {
		name: "ex0",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard/charts",
			icon: LayoutDashboard,
		},
		{
			title: "Chat",
			url: "/dashboard/chat",
			icon: Bot,
		},
		{
			title: "Image Chat",
			url: "/dashboard/image-chat",
			icon: Image,
		},
		{
			title: "Documents",
			url: "/dashboard/documents",
			icon: FileText,
		},
		{
			title: "Workflow",
			url: "/dashboard/workflow",
			icon: Workflow,
		},
	],
	navClouds: [
		{
			title: "Capture",
			icon: Camera,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: FileText,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: File,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: Settings,
		},
		{
			title: "Get Help",
			url: "#",
			icon: HelpCircle,
		},
		{
			title: "Search",
			url: "#",
			icon: Search,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link to="/">
								<LayoutDashboard className="!size-5" />
								<span className="font-semibold text-base">ex0 AI</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
