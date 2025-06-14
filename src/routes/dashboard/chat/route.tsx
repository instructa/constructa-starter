import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Bot, Send, User } from "lucide-react";

export const Route = createFileRoute({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto px-4 h-full">
			<div className="flex flex-col gap-6 h-full">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Chat</h1>
					<p className="text-muted-foreground">
						Start a conversation with our AI assistant.
					</p>
				</div>

				<Card className="flex-1 flex flex-col">
					<CardHeader>
						<CardTitle>AI Assistant</CardTitle>
						<CardDescription>
							Ask me anything! I'm here to help.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex-1 flex flex-col">
						{/* Chat messages area */}
						<div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 border rounded-lg bg-muted/10">
							{/* Welcome message */}
							<div className="flex items-start gap-3">
								<div className="p-2 rounded-full bg-primary text-primary-foreground">
									<Bot className="h-4 w-4" />
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium mb-1">AI Assistant</p>
									<div className="bg-muted rounded-lg p-3">
										<p className="text-sm">
											Hello! I'm your AI assistant. How can I help you today?
										</p>
									</div>
								</div>
							</div>

							{/* Example user message */}
							<div className="flex items-start gap-3 flex-row-reverse">
								<div className="p-2 rounded-full bg-secondary text-secondary-foreground">
									<User className="h-4 w-4" />
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium mb-1 text-right">You</p>
									<div className="bg-primary text-primary-foreground rounded-lg p-3">
										<p className="text-sm">
											Hi! Can you help me understand how to use this chat?
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Input area */}
						<div className="flex gap-2">
							<Input
								placeholder="Type your message..."
								className="flex-1"
							/>
							<Button size="icon">
								<Send className="h-4 w-4" />
								<span className="sr-only">Send message</span>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}