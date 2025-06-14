import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { FileText, Upload, Search, Folder, File, Clock } from "lucide-react";

export const Route = createFileRoute({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto px-4">
			<div className="flex flex-col gap-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Documents</h1>
					<p className="text-muted-foreground">
						Manage and search through your knowledge base.
					</p>
				</div>

				{/* Search and Upload Bar */}
				<div className="flex gap-4 flex-col sm:flex-row">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search documents..."
							className="pl-10"
						/>
					</div>
					<Button>
						<Upload className="mr-2 h-4 w-4" />
						Upload Document
					</Button>
				</div>

				{/* Document Categories */}
				<div className="grid gap-4 md:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">All Documents</CardTitle>
							<FileText className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">24</div>
							<p className="text-xs text-muted-foreground">
								Total documents in knowledge base
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Categories</CardTitle>
							<Folder className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">6</div>
							<p className="text-xs text-muted-foreground">
								Organized folders
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Recent</CardTitle>
							<Clock className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">3</div>
							<p className="text-xs text-muted-foreground">
								Uploaded this week
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Document List */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Documents</CardTitle>
						<CardDescription>
							Your recently accessed and uploaded documents
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{/* Example document items */}
							{[
								{ name: "Project Proposal.pdf", size: "2.4 MB", date: "2 hours ago" },
								{ name: "Meeting Notes.docx", size: "156 KB", date: "Yesterday" },
								{ name: "Research Paper.pdf", size: "5.1 MB", date: "3 days ago" },
							].map((doc, index) => (
								<div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
									<div className="flex items-center gap-3">
										<File className="h-8 w-8 text-muted-foreground" />
										<div>
											<p className="font-medium">{doc.name}</p>
											<p className="text-sm text-muted-foreground">{doc.size}</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<p className="text-sm text-muted-foreground">{doc.date}</p>
										<Button variant="ghost" size="sm">View</Button>
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