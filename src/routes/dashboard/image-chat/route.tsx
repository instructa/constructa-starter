import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Image, Upload, Send, Bot } from "lucide-react";

export const Route = createFileRoute({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto px-4 h-full">
			<div className="flex flex-col gap-6 h-full">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Image Chat</h1>
					<p className="text-muted-foreground">
						Upload images and chat about them with AI.
					</p>
				</div>

				<div className="grid gap-6 lg:grid-cols-2">
					{/* Image Upload Section */}
					<Card>
						<CardHeader>
							<CardTitle>Upload Image</CardTitle>
							<CardDescription>
								Select an image to analyze and discuss
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
								<Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
								<p className="text-sm text-muted-foreground mb-2">
									Click to upload or drag and drop
								</p>
								<p className="text-xs text-muted-foreground">
									PNG, JPG or GIF (max. 10MB)
								</p>
							</div>
							
							{/* Preview area */}
							<div className="mt-4 space-y-2">
								<div className="flex items-center justify-center h-48 bg-muted rounded-lg">
									<Image className="h-16 w-16 text-muted-foreground" />
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Chat Section */}
					<Card className="flex flex-col">
						<CardHeader>
							<CardTitle>Image Analysis</CardTitle>
							<CardDescription>
								Ask questions about the uploaded image
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1 flex flex-col">
							<div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 border rounded-lg bg-muted/10 min-h-[300px]">
								<div className="flex items-start gap-3">
									<div className="p-2 rounded-full bg-primary text-primary-foreground">
										<Bot className="h-4 w-4" />
									</div>
									<div className="flex-1">
										<p className="text-sm font-medium mb-1">AI Assistant</p>
										<div className="bg-muted rounded-lg p-3">
											<p className="text-sm">
												Upload an image and I'll help you analyze it. I can describe what I see, answer questions, or help you understand the content.
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="flex gap-2">
								<Input
									placeholder="Ask about the image..."
									className="flex-1"
									disabled
								/>
								<Button size="icon" disabled>
									<Send className="h-4 w-4" />
									<span className="sr-only">Send message</span>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}