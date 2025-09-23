import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useAssistantState,
} from '@assistant-ui/react';
import '@assistant-ui/styles/index.css';
import '@assistant-ui/styles/markdown.css';
import { useChatRuntime } from '@assistant-ui/react-ai-sdk';
import { AuthLoading, RedirectToSignIn, SignedIn } from '@daveyplate/better-auth-ui';
import { createFileRoute } from '@tanstack/react-router';
import { Bot, Loader2, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export const Route = createFileRoute('/dashboard/chat')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto h-full px-4">
      <div className="flex h-full flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat Assistant</h1>
          <p className="text-muted-foreground">
            Ask the repository-aware assistant for help with code or docs.
          </p>
        </div>

        <Card className="flex flex-1 flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Chat
            </CardTitle>
            <CardDescription>
              Conversations stream over a server-side Mastra agent with MinIO-backed tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4">
            <AuthLoading>
              <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Checking your session…
              </div>
            </AuthLoading>

            <RedirectToSignIn />

            <SignedIn>
              <AssistantChatSurface />
            </SignedIn>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AssistantChatSurface() {
  const runtime = useChatRuntime({ api: '/api/chat' });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex flex-1 flex-col gap-4">
        <ThreadPrimitive.Root className="flex flex-1 flex-col">
          <ThreadPrimitive.Viewport
            autoScroll
            className="flex-1 space-y-4 overflow-y-auto pr-1"
          >
            <ThreadPrimitive.Empty>
              <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                <p>Ask the assistant about any file stored in your MinIO bucket.</p>
                <p className="text-xs">
                  Tip: mention paths like <code className="font-mono text-xs">src/lib/api.ts</code> to fetch exact files.
                </p>
              </div>
            </ThreadPrimitive.Empty>

            <ThreadPrimitive.Messages components={{ Message: ChatMessage }} />
          </ThreadPrimitive.Viewport>
        </ThreadPrimitive.Root>

        <ComposerPrimitive.Root className="flex items-end gap-2 rounded-lg border bg-background p-3 shadow-sm">
          <ComposerPrimitive.Input
            placeholder="Type your question…"
            className="max-h-40 flex-1 resize-none bg-transparent text-sm leading-6 text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
          />
          <ComposerPrimitive.Send
            className={cn(buttonVariants({ variant: 'default', size: 'icon' }))}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </ComposerPrimitive.Send>
        </ComposerPrimitive.Root>
      </div>
    </AssistantRuntimeProvider>
  );
}

function ChatMessage() {
  const role = useAssistantState((state) => state.message.role);
  const isRunning = useAssistantState((state) => state.message.status?.type === 'running');

  return (
    <MessagePrimitive.Root
      className={cn(
        'max-w-[75%] rounded-lg px-4 py-2 text-sm shadow-sm ring-1 ring-transparent transition-colors',
        role === 'user'
          ? 'ml-auto bg-primary text-primary-foreground'
          : 'mr-auto bg-muted text-foreground'
      )}
    >
      <MessagePrimitive.Parts />
      {isRunning ? (
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Thinking…</span>
        </div>
      ) : null}
    </MessagePrimitive.Root>
  );
}
