import { createFileRoute } from '@tanstack/react-router';
import GradientOrb from '~/components/gradient-orb';

export const Route = createFileRoute('/(marketing)/about')({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Hero Section */}
      <main className="container relative z-0 mx-auto px-4 py-20 md:py-32">
        <GradientOrb className="-translate-x-1/2 absolute top-0 left-1/2 z-[-1] transform" />

        {/* Header */}
        <div className="text-center">
          <h1 className="font-medium text-4xl text-foreground md:text-6xl lg:text-7xl">
            Meet Kevin
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Full-Stack Developer & Cursor Enthusiast
          </p>
        </div>

        {/* Main Content */}
        <div className="mx-auto mt-16 max-w-4xl space-y-12">
          {/* Developer Experience with Cursor */}
          <section className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm">
            <h2 className="mb-4 font-semibold text-2xl text-foreground">My Cursor Journey</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                As a developer who's always looking for ways to enhance productivity, discovering
                Cursor has been a game-changer. The AI-powered coding assistant has transformed how
                I approach development, making complex tasks more manageable and allowing me to
                focus on creativity and problem-solving.
              </p>
              <p>
                What I love most about Cursor is its contextual understanding of my codebase. It's
                not just about code completion – it's about having an intelligent partner that
                understands the architecture, patterns, and conventions of my projects. This has
                accelerated my development workflow by at least 3x.
              </p>
              <p>
                The seamless integration with modern frameworks like TanStack, React, and TypeScript
                makes it feel like Cursor was built specifically for the tech stack I work with
                daily. It's particularly impressive how it handles complex routing patterns and
                state management logic.
              </p>
            </div>
          </section>

          {/* Current Projects */}
          <section className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm">
            <h2 className="mb-4 font-semibold text-2xl text-foreground">What I'm Building</h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-medium text-lg text-foreground">
                  TanStack Start Boilerplate
                </h3>
                <p className="text-muted-foreground">
                  Currently working on a modern web application boilerplate that combines TanStack
                  Start with Tailwind CSS 4 and shadcn/ui. This project aims to provide developers
                  with a solid foundation for building performant, type-safe applications with
                  beautiful UI out of the box.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-lg text-foreground">
                  AI-Enhanced Development Tools
                </h3>
                <p className="text-muted-foreground">
                  Exploring ways to integrate AI capabilities into development workflows. Building
                  custom tools and extensions that leverage Cursor's API to create even more
                  powerful coding experiences for specific use cases.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-lg text-foreground">
                  Open Source Contributions
                </h3>
                <p className="text-muted-foreground">
                  Actively contributing to various open-source projects in the React and TypeScript
                  ecosystem. Focusing on improving developer experience and documentation for tools
                  that make our lives easier.
                </p>
              </div>
            </div>
          </section>

          {/* Tech Stack & Skills */}
          <section className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm">
            <h2 className="mb-4 font-semibold text-2xl text-foreground">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {[
                'TypeScript',
                'React',
                'TanStack',
                'Next.js',
                'Tailwind CSS',
                'shadcn/ui',
                'Node.js',
                'PostgreSQL',
                'Docker',
                'AWS',
                'Cursor AI',
                'GitHub Copilot',
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="text-center">
            <p className="text-muted-foreground">
              Always excited to connect with fellow developers and discuss new ideas!
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary/10 px-6 py-3 font-medium text-primary transition-colors hover:bg-primary/20"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary/10 px-6 py-3 font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary/10 px-6 py-3 font-medium text-primary transition-colors hover:bg-primary/20"
              >
                LinkedIn
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
