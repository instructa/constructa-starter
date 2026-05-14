import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useAssistantState,
} from '@assistant-ui/react';
import type { PropsWithChildren } from 'react';
import { useChatRuntime } from '@assistant-ui/react-ai-sdk';
import { AuthLoading, RedirectToSignIn, SignedIn } from '@daveyplate/better-auth-ui';
import { createFileRoute } from '@tanstack/react-router';
import { Bot, Loader2, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { buttonVariants } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { cn } from '~/lib/utils';
import { ScopedAssistantStyles } from '~/components/chat-assistant-styles';
import { listDocuments } from '~/server/function/documents.server';

type ChatLoaderData = {
  files: Awaited<ReturnType<typeof listDocuments>>;
};

export const Route = createFileRoute('/dashboard/chat')({
  loader: async () => {
    const files = await listDocuments();
    return { files } satisfies ChatLoaderData;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { files } = Route.useLoaderData() as ChatLoaderData;

  return (
    <div className="container mx-auto h-full px-4">
      <div className="flex h-full flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coding Assistant</h1>
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
              <AssistantChatSurface files={files} />
            </SignedIn>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AssistantChatSurface({ files }: { files: ChatLoaderData['files'] }) {
  const runtime = useChatRuntime({ api: '/api/chat' });
  const scopeClass = 'assistant-chat-theme';

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ScopedAssistantStyles scopeClass={scopeClass} />
      <div className={cn('flex flex-1 flex-col gap-4 aui-root', scopeClass)}>
        <AvailableFiles files={files} />
        <ThreadPrimitive.Root className="flex flex-1 flex-col">
          <ThreadPrimitive.Viewport autoScroll className="flex-1 space-y-4 overflow-y-auto pr-1">
            <ThreadPrimitive.Empty>
              <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                <p>Ask the assistant about any file stored in your MinIO bucket.</p>
                <p className="text-xs">
                  Tip: mention paths like <code className="font-mono text-xs">src/lib/api.ts</code>{' '}
                  to fetch exact files.
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
      <MessagePrimitive.Parts
        components={{
          ToolGroup: ToolCallGroup,
        }}
      />
      {isRunning ? (
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Thinking…</span>
        </div>
      ) : null}
    </MessagePrimitive.Root>
  );
}

function ToolCallGroup({
  startIndex,
  endIndex,
  children,
}: PropsWithChildren<{ startIndex: number; endIndex: number }>) {
  const toolCount = endIndex - startIndex + 1;

  return (
    <div className="mt-2 space-y-2 rounded-md border border-dashed border-muted bg-muted/30 p-2 text-xs text-muted-foreground">
      <div className="font-medium text-foreground">
        Tool call {toolCount > 1 ? `${toolCount} steps` : 'result'}
      </div>
      <div className="space-y-2 text-foreground">{children}</div>
    </div>
  );
}

function AvailableFiles({ files }: { files: ChatLoaderData['files'] }) {
  if (!files?.length) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">No files synced yet</span>
        <span>
          Upload documents on the Documents page to reference them here. Mention a file path in your
          prompt to pull its contents.
        </span>
      </div>
    );
  }

  const displayFiles = files.slice(0, 20);
  const remaining = files.length - displayFiles.length;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Available files
      </span>
      <div className="flex flex-wrap gap-2">
        {displayFiles.map((file) => {
          const key = file.key ?? file.name ?? `file-${file.id}`;
          return (
            <Badge key={file.id ?? key} variant="outline" className="font-mono text-[11px]">
              {key}
            </Badge>
          );
        })}
        {remaining > 0 ? (
          <Badge variant="secondary" className="text-[11px]">
            +{remaining} more
          </Badge>
        ) : null}
      </div>
      <span className="text-[11px] text-muted-foreground">
        Tip: tag a file by mentioning its key (for example,{' '}
        <code>{displayFiles[0]?.key ?? 'src/example.ts'}</code>).
      </span>
    </div>
  );
}
