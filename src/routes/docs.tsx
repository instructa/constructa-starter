;

export const Route = createFileRoute({
	component: DocsPage,
});

function DocsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-6">Documentation</h1>
			<div className="prose dark:prose-invert max-w-none">
				<p className="text-lg text-muted-foreground mb-4">
					Welcome to the documentation for the TanStack Starter project.
				</p>

				<h2 className="text-2xl font-semibold mt-8 mb-4">Getting Started</h2>
				<p>
					This starter template provides a modern foundation for building web
					applications with TanStack Router, React Query, and other powerful
					tools.
				</p>

				<h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
				<ul className="list-disc list-inside space-y-2">
					<li>Type-safe routing with TanStack Router</li>
					<li>Server-side rendering (SSR) support</li>
					<li>Dark mode with theme persistence</li>
					<li>Tailwind CSS for styling</li>
					<li>TypeScript for type safety</li>
				</ul>

				<h2 className="text-2xl font-semibold mt-8 mb-4">Project Structure</h2>
				<pre className="bg-muted p-4 rounded-lg overflow-x-auto">
					{`src/
├── components/     # Reusable UI components
├── routes/         # Route definitions
├── styles/         # Global styles
├── lib/           # Utility functions
└── utils/         # Helper utilities`}
				</pre>
			</div>
		</div>
	);
}
