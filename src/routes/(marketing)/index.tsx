import {} from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import {
  Code2,
  Zap,
  Shield,
  Clock,
  Rocket,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Database,
  Palette,
  Users,
  BarChart3,
  FileText,
  Image,
  MessageSquare,
  GitBranch,
  Settings,
  Package,
} from 'lucide-react';
import GradientOrb from '~/components/gradient-orb';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="container relative z-0 mx-auto flex flex-col items-center px-4 pt-20 pb-16 text-center md:pt-32 md:pb-24">
        <GradientOrb className="-translate-x-1/2 absolute top-0 left-1/2 z-[-1] transform" />

        <Badge variant="secondary" className="mb-4 px-4 py-1">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          AI + Human Development
        </Badge>

        <h1 className="max-w-4xl font-bold text-4xl text-foreground md:text-6xl lg:text-7xl">
          The AI-First Starter Kit That Actually Works
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Built for AI assistants to understand, extend, and build upon. Finally, a foundation where
          Cursor and Claude become your most productive teammates.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="rounded-full px-8">
            Start Building with AI <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">
            <GitBranch className="mr-2 h-4 w-4" />
            View on GitHub
          </Button>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="rounded-full px-8">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-muted-foreground text-sm">
          Powered by{' '}
          <a
            href="https://instructa.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            instructa.ai
          </a>
        </p>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            AI Can Write Code, But It Needs the Right Foundation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Most codebases confuse AI assistants with inconsistent patterns and poor structure
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <Code2 className="mb-2 h-8 w-8 text-destructive" />
              <CardTitle>AI Gets Lost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Inconsistent code patterns make AI suggestions unreliable and often wrong
              </p>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <Terminal className="mb-2 h-8 w-8 text-destructive" />
              <CardTitle>Context Confusion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Without proper structure, AI lacks the context to make meaningful contributions
              </p>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <Settings className="mb-2 h-8 w-8 text-destructive" />
              <CardTitle>Manual Everything</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You spend more time fixing AI mistakes than actually building features
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            A Foundation Where AI Becomes Your Best Developer
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Structured for AI comprehension, consistent patterns throughout, TypeScript everywhere
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <Sparkles className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>AI Understands</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cursor rules and consistent patterns mean AI gets it right the first time
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <Users className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Human + AI Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You guide the vision, AI handles implementation with perfect context
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <Rocket className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>10x Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Build features in hours that used to take weeks, with AI as your pair programmer
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Product Features Grid */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything Pre-Configured for AI-Assisted Development
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete toolkit where every line of code is optimized for AI comprehension
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Main Feature - Spans 2 columns on large screens */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <Badge className="mb-4 w-fit">Most Important</Badge>
              <CardTitle className="text-2xl">AI-Optimized Architecture</CardTitle>
              <CardDescription className="text-base">
                Our carefully structured codebase ensures AI assistants understand your project
                perfectly. With Cursor rules, consistent patterns, and TypeScript throughout, you'll
                build features faster than ever before.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Cursor Rules</p>
                    <p className="text-sm text-muted-foreground">
                      Pre-configured for optimal AI coding
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">TypeScript First</p>
                    <p className="text-sm text-muted-foreground">
                      Full type safety for better AI assistance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Consistent Patterns</p>
                    <p className="text-sm text-muted-foreground">
                      Standardized code AI can easily extend
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Smart Tooling</p>
                    <p className="text-sm text-muted-foreground">
                      Oxlint, Vitest, and custom CLI included
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication Feature */}
          <Card>
            <CardHeader>
              <Shield className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Complete Authentication</CardTitle>
              <CardDescription>
                Email/password, OAuth (GitHub, Google), password reset, email verification - all
                configured
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Dashboard Templates */}
          <Card>
            <CardHeader>
              <BarChart3 className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Dashboard Templates</CardTitle>
              <CardDescription>
                Pre-built AI chat, workflows, documents, image chat, and analytics dashboards
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Database & ORM */}
          <Card>
            <CardHeader>
              <Database className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Database Ready</CardTitle>
              <CardDescription>
                PostgreSQL with Docker, Drizzle ORM, migrations, and Supabase compatibility
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Modern UI */}
          <Card>
            <CardHeader>
              <Palette className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Beautiful UI</CardTitle>
              <CardDescription>
                shadcn/ui components, Tailwind CSS v4, dark mode, and responsive design
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Start Building with AI in 3 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get your AI-powered development environment ready in minutes
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="font-bold">1</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Clone the AI-Ready Foundation</h3>
            <p className="text-muted-foreground">
              Get the pre-configured starter kit with Cursor rules and AI-optimized patterns
            </p>
            <div className="mt-4 rounded-md bg-muted p-3">
              <code className="text-sm">npx gitpick constructa-starter my-app</code>
            </div>
          </div>

          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="font-bold">2</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Configure Your Stack</h3>
            <p className="text-muted-foreground">
              Set up authentication, database, and features - all structured for AI comprehension
            </p>
            <div className="mt-4 rounded-md bg-muted p-3">
              <code className="text-sm">pnpm ex0 init</code>
            </div>
          </div>

          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="font-bold">3</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Let AI Build Your Features</h3>
            <p className="text-muted-foreground">
              Open in Cursor or your AI editor and watch as AI understands and extends your code
              perfectly
            </p>
            <div className="mt-4 rounded-md bg-muted p-3">
              <code className="text-sm">pnpm dev</code>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                What makes this different from other starter kits?
              </h3>
              <p className="text-muted-foreground">
                Constructa is specifically optimized for AI-assisted development. We include Cursor
                rules, consistent patterns, and TypeScript throughout to ensure AI tools like Cursor
                and Claude can understand and extend your codebase effectively.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Do I need to be an expert developer to use this?
              </h3>
              <p className="text-muted-foreground">
                No! The starter kit is designed to work seamlessly with AI assistants. Even if
                you're a beginner, the AI can help you understand and modify the code. The
                consistent patterns make it easy to learn and build upon.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                What's included in the authentication system?
              </h3>
              <p className="text-muted-foreground">
                We use Better Auth with pre-built components for sign in/up, password reset, email
                verification, OAuth (GitHub & Google), and session management. Everything is fully
                configured and ready to customize.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Can I use this for commercial projects?
              </h3>
              <p className="text-muted-foreground">
                Absolutely! The starter kit is MIT licensed, meaning you can use it for any project,
                including commercial ones. No attribution required, though we appreciate it!
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">How do I deploy this to production?</h3>
              <p className="text-muted-foreground">
                The starter kit works with any Node.js hosting platform. We recommend Vercel,
                Railway, or Render for easy deployment. The build process is already configured -
                just connect your repo and deploy.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">Is this actively maintained?</h3>
              <p className="text-muted-foreground">
                Yes! We regularly update dependencies, add new features, and improve the AI
                integration. The project is under active development with a growing community of
                contributors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="mx-auto max-w-2xl border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center p-8 text-center md:p-12">
            <Zap className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Code with AI as Your Teammate?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Join developers building the future with human creativity and AI productivity
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="rounded-full px-8">
                Get the AI Starter Kit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                <MessageSquare className="mr-2 h-4 w-4" />
                Join AI Builders Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto border-t px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Constructa Starter. MIT License.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Powered by{' '}
            <a
              href="https://instructa.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              instructa.ai
            </a>{' '}
            • AI-First Development Platform
          </p>
        </div>
      </footer>
    </div>
  );
}
