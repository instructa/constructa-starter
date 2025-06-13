;
import { useAuth } from "~/components/auth/auth-provider";
import { ProtectedRoute } from "~/components/auth/protected-route";
import AssistantChat from "~/components/chat/assistant-chat";
import DashboardLayout from "~/components/layout/dashboard-layout";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { useSession } from "~/lib/auth-client";

export const Route = createFileRoute({
	component: DashboardPage,
});

function DashboardPage() {
	return (
		<ProtectedRoute>
			<DashboardLayout>
				<Dashboard />
			</DashboardLayout>
		</ProtectedRoute>
	);
}

function Dashboard() {
	const { user } = useAuth();
	const { data: session } = useSession();

	return (
		<div className="container mx-auto py-10 px-4">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back, {user?.name || user?.email || "User"}!
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Account Info</CardTitle>
						<CardDescription>Your account details</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p className="text-sm">
								<span className="font-medium">Email:</span> {user?.email}
							</p>
							<p className="text-sm">
								<span className="font-medium">Name:</span>{" "}
								{user?.name || "Not set"}
							</p>
							<p className="text-sm">
								<span className="font-medium">User ID:</span>{" "}
								{session?.user?.id}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription>Common tasks</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<Button className="w-full" variant="outline">
								Edit Profile
							</Button>
							<Button className="w-full" variant="outline">
								Settings
							</Button>
							<Button className="w-full" variant="outline">
								View Activity
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Statistics</CardTitle>
						<CardDescription>Your usage stats</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-sm font-medium">Total Sessions</span>
								<span className="text-sm text-muted-foreground">12</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm font-medium">Last Login</span>
								<span className="text-sm text-muted-foreground">Today</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm font-medium">Account Status</span>
								<span className="text-sm text-green-600">Active</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="mt-8">
				<Card>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
						<CardDescription>Your recent actions and events</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="border-l-2 border-muted pl-4">
								<p className="text-sm font-medium">Logged in</p>
								<p className="text-xs text-muted-foreground">Just now</p>
							</div>
							<div className="border-l-2 border-muted pl-4">
								<p className="text-sm font-medium">Account created</p>
								<p className="text-xs text-muted-foreground">
									Welcome to the platform!
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="mt-8">
				<Card>
					<CardHeader>
						<CardTitle>Assistant Chat</CardTitle>
						<CardDescription>Chat with your AI assistant</CardDescription>
					</CardHeader>
					<CardContent>
						<AssistantChat />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
