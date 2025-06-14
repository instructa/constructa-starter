import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { GitBranch, Plus, Play, Pause, Settings, Workflow as WorkflowIcon } from "lucide-react";

export const Route = createFileRoute({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto px-4">
			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Workflows</h1>
						<p className="text-muted-foreground">
							Build and manage automated workflows.
						</p>
					</div>
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						New Workflow
					</Button>
				</div>

				{/* Workflow Stats */}
				<div className="grid gap-4 md:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
							<Play className="h-4 w-4 text-green-600" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">12</div>
							<p className="text-xs text-muted-foreground">
								Currently running
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
							<WorkflowIcon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">28</div>
							<p className="text-xs text-muted-foreground">
								Created workflows
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Executions Today</CardTitle>
							<GitBranch className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">143</div>
							<p className="text-xs text-muted-foreground">
								Total runs today
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Success Rate</CardTitle>
							<Settings className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">98.5%</div>
							<p className="text-xs text-muted-foreground">
								Last 24 hours
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Workflow List */}
				<Card>
					<CardHeader>
						<CardTitle>Your Workflows</CardTitle>
						<CardDescription>
							Manage and monitor your automated processes
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{/* Example workflow items */}
							{[
								{ 
									name: "Data Processing Pipeline", 
									status: "active", 
									lastRun: "5 minutes ago",
									description: "Processes incoming data files and generates reports"
								},
								{ 
									name: "Email Automation", 
									status: "paused", 
									lastRun: "2 hours ago",
									description: "Sends automated emails based on triggers"
								},
								{ 
									name: "Content Publishing", 
									status: "active", 
									lastRun: "1 hour ago",
									description: "Publishes content across multiple platforms"
								},
							].map((workflow, index) => (
								<div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
									<div className="flex items-center gap-4">
										<div className="p-2 rounded-lg bg-muted">
											<WorkflowIcon className="h-6 w-6 text-muted-foreground" />
										</div>
										<div>
											<div className="flex items-center gap-2">
												<p className="font-medium">{workflow.name}</p>
												<Badge variant={workflow.status === "active" ? "default" : "secondary"}>
													{workflow.status}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground">{workflow.description}</p>
											<p className="text-xs text-muted-foreground mt-1">Last run: {workflow.lastRun}</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="icon">
											{workflow.status === "active" ? (
												<Pause className="h-4 w-4" />
											) : (
												<Play className="h-4 w-4" />
											)}
										</Button>
										<Button variant="ghost" size="icon">
											<Settings className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}