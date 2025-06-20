import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import {
  Check,
  Zap,
  Crown,
  Rocket,
  Sparkles,
  ArrowRight,
  Users,
  MessageSquare,
  Shield,
  HeadphonesIcon,
  Workflow,
  Building2,
} from 'lucide-react';
import GradientOrb from '~/components/gradient-orb';

export const Route = createFileRoute('/(marketing)/pricing')({
  component: RouteComponent,
});

function RouteComponent() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '',
      description: 'Perfect for getting started with AI development',
      features: [
        'Basic access',
        'Limited API usage',
        'Community support',
        'Core AI features',
        'Standard templates',
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const,
      popular: false,
      icon: Sparkles,
    },
    {
      name: 'Tier 1',
      price: '$350',
      period: '/ year',
      description: 'Best for individual developers and small teams',
      features: [
        'All Free tier features',
        'Priority support',
        'Extended usage caps',
        'Advanced AI features',
        'Premium templates',
        'Analytics dashboard',
        'Custom integrations',
      ],
      buttonText: 'Get Started',
      buttonVariant: 'default' as const,
      popular: true,
      icon: Zap,
    },
    {
      name: 'Tier 2',
      price: '$8,500',
      period: '/ year + setup fee',
      description: 'Enterprise solution with dedicated support',
      features: [
        'All Tier 1 features',
        'Custom integrations',
        'Dedicated support',
        'Onboarding & setup assistance',
        'White-label options',
        'Advanced analytics',
        'Custom AI models',
        'SLA guarantee',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
      popular: false,
      icon: Crown,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="container relative z-0 mx-auto flex flex-col items-center px-4 pt-20 pb-16 text-center md:pt-32 md:pb-24">
        <GradientOrb className="-translate-x-1/2 absolute top-0 left-1/2 z-[-1] transform" />

        <Badge variant="secondary" className="mb-4 px-4 py-1">
          <Building2 className="mr-1.5 h-3.5 w-3.5" />
          💼 AI Starter SaaS Kit – Pricing Plans
        </Badge>

        <h1 className="max-w-4xl font-bold text-4xl text-foreground md:text-6xl lg:text-7xl">
          Simple, Transparent Pricing
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Choose the perfect plan for your AI-powered development journey. From individuals to 
          enterprises, we have the right solution for you.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular
                    ? 'border-primary/50 bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border'
                } transition-all duration-300 hover:shadow-lg ${
                  plan.popular ? 'hover:shadow-primary/25' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      <Rocket className="mr-1 h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-foreground md:text-4xl">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className="mt-2 text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    className="w-full mb-6"
                    variant={plan.buttonVariant}
                    size="lg"
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Comparison */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything You Need to Build with AI
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Compare features across all plans to find the perfect fit for your needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <Shield className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Enterprise Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Advanced security features for enterprise deployments
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>SSO Integration</span>
                  <span className="text-muted-foreground">Tier 2</span>
                </div>
                <div className="flex justify-between">
                  <span>Audit Logs</span>
                  <span className="text-muted-foreground">Tier 2</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Auth</span>
                  <span className="text-muted-foreground">Tier 2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <HeadphonesIcon className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Support & Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Get the help you need to succeed with AI development
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Community Support</span>
                  <span className="text-muted-foreground">All Plans</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority Support</span>
                  <span className="text-muted-foreground">Tier 1+</span>
                </div>
                <div className="flex justify-between">
                  <span>Dedicated Support</span>
                  <span className="text-muted-foreground">Tier 2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <Workflow className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Advanced AI features and integrations for all use cases
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Basic AI Features</span>
                  <span className="text-muted-foreground">All Plans</span>
                </div>
                <div className="flex justify-between">
                  <span>Advanced AI</span>
                  <span className="text-muted-foreground">Tier 1+</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom AI Models</span>
                  <span className="text-muted-foreground">Tier 2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Pricing Questions & Answers
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Can I upgrade or downgrade my plan at any time?
              </h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect 
                immediately, and we'll prorate the billing accordingly.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                What's included in the setup fee for Tier 2?
              </h3>
              <p className="text-muted-foreground">
                The setup fee covers dedicated onboarding, custom configuration, data migration 
                assistance, and initial training for your team. This ensures a smooth transition 
                to our enterprise solution.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Do you offer refunds?
              </h3>
              <p className="text-muted-foreground">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied 
                within the first 30 days, we'll provide a full refund, no questions asked.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                How does billing work for annual plans?
              </h3>
              <p className="text-muted-foreground">
                Annual plans are billed upfront and offer significant savings compared to monthly 
                billing. You'll receive an invoice at the beginning of each billing cycle.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Can I try Tier 1 or Tier 2 features before purchasing?
              </h3>
              <p className="text-muted-foreground">
                Absolutely! Contact our sales team to schedule a demo or request a trial account. 
                We'll set up a temporary environment so you can experience the full feature set.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="mx-auto max-w-2xl border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center p-8 text-center md:p-12">
            <Rocket className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Supercharge Your Development?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Join thousands of developers building the future with AI-powered tools
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="rounded-full px-8">
                Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                <MessageSquare className="mr-2 h-4 w-4" />
                Talk to Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto border-t px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 AI Starter SaaS Kit. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>•</span>
            <Link to="/docs" className="hover:text-foreground transition-colors">
              Documentation
            </Link>
            <span>•</span>
            <a 
              href="mailto:support@example.com" 
              className="hover:text-foreground transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}