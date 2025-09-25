# Mastra AI Integration

This document provides comprehensive setup and usage instructions for the Mastra AI integration in Constructa Starter.

## Overview

Constructa Starter includes a repository-aware AI assistant powered by [Mastra](https://mastra.ai), an AI agent framework that enables LLMs to perform actions and access external tools. The integration features:

- **Codebase Agent**: A senior code assistant that can access files stored in your MinIO/S3 bucket
- **Tool Integration**: Custom tools for retrieving file contents from object storage
- **Chat Interface**: Modern chat UI built with [Assistant UI](https://assistant-ui.com) components
- **Streaming Responses**: Real-time AI responses with tool call visualization

## Architecture

### Components

1. **Mastra Agent** (`src/mastra/agents/codebase-agent.ts`)
   - Powered by GPT-4.1-nano via OpenAI SDK
   - Configured with instructions for repository-aware assistance
   - Integrated with custom tools for file access

2. **File Access Tool** (`src/mastra/tools/get-file-from-object-store.tool.ts`)
   - Retrieves UTF-8 text content from MinIO/S3 buckets
   - Configurable byte limits (default: 500KB)
   - Handles file truncation and metadata

3. **Storage Layer** (`src/mastra/storage.ts`)
   - Integrates with existing S3/MinIO infrastructure
   - Provides unified interface for file operations

4. **API Endpoint** (`src/routes/api/chat.tsx`)
   - Server-side route handling chat requests
   - Streams AI responses with tool calls
   - Zod validation for message payloads

5. **Chat Interface** (`src/routes/dashboard/chat/`)
   - React-based chat UI with authentication
   - Displays available files from document storage
   - Real-time message streaming with tool call visualization

## Prerequisites

Before setting up Mastra, ensure you have:

- ✅ **OpenAI API Key** - Required for LLM functionality
- ✅ **MinIO/S3 Configuration** - For file storage access
- ✅ **Authentication** - User must be signed in to access chat
- ✅ **Document Upload** - Files must be uploaded via Documents page for AI access

## Setup Instructions

### 1. Environment Configuration

Add your OpenAI API key to your `.env` file:

```bash
# AI Configuration
OPENAI_API_KEY="sk-your-openai-api-key-here"
```

### 2. Verify Dependencies

The following packages are automatically included:

```json
{
  "@mastra/core": "0.17.1",
  "@ai-sdk/openai": "2.0.32",
  "@assistant-ui/react": "^0.11.15",
  "@assistant-ui/react-ai-sdk": "^1.1.0",
  "@assistant-ui/react-data-stream": "^0.11.0",
  "@assistant-ui/react-markdown": "^0.11.0",
  "@assistant-ui/styles": "^0.2.1"
}
```

### 3. Access the Chat Interface

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to `/dashboard/chat` in your browser

3. Sign in if prompted

4. Upload documents via `/dashboard/documents` for the AI to reference

## Usage Guide

### Basic Chat Interaction

1. **Access Chat**: Navigate to the "Chat" section in the sidebar
2. **View Available Files**: The interface shows files you've uploaded to your MinIO bucket
3. **Ask Questions**: Type questions about your codebase or uploaded documents
4. **Reference Files**: Mention specific file paths (e.g., `src/lib/api.ts`) to have the AI fetch content

### File Access Tool

The AI can automatically retrieve file contents when you mention file paths. For example:

- "What's in `src/components/Button.tsx`?"
- "Show me the database schema in `src/db/schema.ts`"
- "Explain the authentication logic in `src/server/auth.server.ts`"

### Tool Call Visualization

When the AI uses tools, you'll see:
- **Tool call indicators** in the chat messages
- **File retrieval status** with metadata (bytes, truncation status)
- **Structured tool results** for better readability

### Best Practices

#### File References
- Use exact file paths from the "Available files" section
- Include the full path (e.g., `src/routes/api/chat.tsx`)
- The AI will automatically fetch and analyze file contents

#### Question Types
- **Code explanation**: "What does this function do?"
- **Architecture questions**: "How is authentication implemented?"
- **Debugging help**: "Why isn't this component rendering?"
- **Documentation**: "Create a README for this feature"

#### Context Management
- Upload relevant files before asking questions
- Reference multiple files in a single conversation
- The AI maintains context across the conversation

## Configuration Options

### Agent Configuration

The codebase agent is configured in `src/mastra/agents/codebase-agent.ts`:

```typescript
export const codebaseAgent = new Agent({
  name: 'codebase-agent',
  instructions: [
    'You are a senior code assistant for this repository.',
    'When a prompt references files or code, use the get-file-from-object-store tool to retrieve the exact content before answering.',
    'Always mention the object key(s) you consulted, adapt verbosity to user directions, and escalate with follow-up questions when file context is ambiguous.',
  ].join(' '),
  model: openai('gpt-4.1-nano'),
  tools: {
    getFileFromObjectStore,
  },
});
```

### File Access Limits

Configure file retrieval limits in `src/mastra/tools/get-file-from-object-store.tool.ts`:

```typescript
const DEFAULT_MAX_BYTES = 512_000; // 500 KB default limit
```

### Model Selection

Change the AI model by modifying the agent configuration:

```typescript
model: openai('gpt-4'), // or other OpenAI models
```

## Troubleshooting

### Common Issues

#### "S3 bucket is not configured"
- Ensure your MinIO/S3 configuration is correct in `.env`
- Verify `S3_BUCKET` environment variable is set

#### "No files synced yet"
- Upload documents via the Documents page first
- Files must be stored in your configured MinIO/S3 bucket

#### "OpenAI API key missing"
- Add `OPENAI_API_KEY` to your `.env` file
- Ensure the key is valid and has sufficient credits

#### Chat not loading
- Check browser console for errors
- Verify authentication status
- Ensure all required environment variables are set

### Debug Mode

Enable verbose logging by setting:

```bash
DEBUG=mastra:*
```

### Performance Considerations

- **File Size Limits**: Large files are automatically truncated to prevent token overflow
- **Rate Limiting**: OpenAI API rate limits apply to all requests
- **Caching**: Consider implementing response caching for frequently accessed files

## Advanced Usage

### Custom Tools

Add new tools by creating them in `src/mastra/tools/` and registering them in the agent:

```typescript
// Example custom tool
export const customTool = createTool({
  id: 'custom-tool',
  description: 'Description of what this tool does',
  inputSchema: z.object({ /* input validation */ }),
  execute: async ({ context }) => {
    // Tool implementation
  },
});
```

### Multiple Agents

Create additional agents in `src/mastra/agents/` and register them in `src/mastra/index.ts`.

### Custom Storage Backends

Extend the storage layer to support additional file sources beyond MinIO/S3.

## Security Considerations

- **API Key Management**: Never commit API keys to version control
- **File Access**: AI can only access files in your configured MinIO/S3 bucket
- **User Authentication**: Chat interface requires user authentication
- **Rate Limiting**: Consider implementing rate limiting for API endpoints

## Contributing

When extending the Mastra integration:

1. Follow the existing patterns in `src/mastra/`
2. Add proper TypeScript types
3. Include comprehensive error handling
4. Update this documentation
5. Test with various file types and sizes

## Resources

- [Mastra Documentation](https://mastra.ai/docs)
- [Assistant UI Documentation](https://assistant-ui.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [TanStack Start Server Functions](https://tanstack.com/start/latest/docs/framework/server-functions)
