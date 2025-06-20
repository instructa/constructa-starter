import { } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import {
  Check,
  X,
  Zap,
  Crown,
  Rocket,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
  Building,
  MessageCircle,
  Code2,
  Database,
  Palette,
  BarChart3,
  Globe,
  Lock,
  Headphones,
  GitBranch,
  Clock,
  Infinity,
} from 'lucide-react';
import GradientOrb from '~/components/gradient-orb';

export const Route = createFileRoute({
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="container relative z-0 mx-auto flex flex-col items-center px-4 pt-20 pb-16 text-center md:pt-32 md:pb-24">
        <GradientOrb className="-translate-x-1/2 absolute top-0 left-1/2 z-[-1] transform" />

        <Badge variant="secondary" className="mb-4 px-4 py-1">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          Simple, Transparent Pricing
        </Badge>

        <h1 className="max-w-4xl font-bold text-4xl text-foreground md:text-6xl lg:text-7xl">
          Build Faster with AI.
          <br />
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Pay as You Scale.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Start free and upgrade as your AI-powered development needs grow. 
          No hidden fees, no surprises.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="rounded-full px-8">
            Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">
            <MessageCircle className="mr-2 h-4 w-4" />
            Talk to Sales
          </Button>
        </div>

        <p className="mt-8 text-muted-foreground text-sm">
          Free 14-day trial • No credit card required • Cancel anytime
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Starter Plan */}
          <Card className="relative border-2 border-muted">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Code2 className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Starter</CardTitle>
              <CardDescription>Perfect for individual developers and small projects</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Get Started Free
              </Button>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">1 AI-powered project</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Basic AI assistance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">5 Cursor rules included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Community support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Basic templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Advanced AI features</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Priority support</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan - Most Popular */}
          <Card className="relative border-2 border-primary shadow-lg shadow-primary/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="px-4 py-1">
                <Star className="mr-1 h-3 w-3" />
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Zap className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>Ideal for growing teams and production applications</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-xs text-muted-foreground">per user</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">
                Start Free Trial
              </Button>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited AI projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advanced AI assistance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">50+ Cursor rules & patterns</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Premium templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Team collaboration tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advanced analytics</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative border-2 border-muted">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                <Building className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>Custom solutions for large organizations</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <p className="text-xs text-muted-foreground">contact us for pricing</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Everything in Pro</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Custom AI integrations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited team members</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">24/7 dedicated support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">On-premise deployment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Custom training & onboarding</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">SLA guarantees</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Compare All Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what's included in each plan to find the perfect fit for your needs
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-semibold">Features</th>
                    <th className="p-4 text-center font-semibold">Starter</th>
                    <th className="p-4 text-center font-semibold bg-primary/5">Pro</th>
                    <th className="p-4 text-center font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4 font-medium">AI-Powered Projects</td>
                    <td className="p-4 text-center">1</td>
                    <td className="p-4 text-center bg-primary/5">Unlimited</td>
                    <td className="p-4 text-center">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Cursor Rules & Patterns</td>
                    <td className="p-4 text-center">5</td>
                    <td className="p-4 text-center bg-primary/5">50+</td>
                    <td className="p-4 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Team Members</td>
                    <td className="p-4 text-center">1</td>
                    <td className="p-4 text-center bg-primary/5">10</td>
                    <td className="p-4 text-center">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Support</td>
                    <td className="p-4 text-center">Community</td>
                    <td className="p-4 text-center bg-primary/5">Priority</td>
                    <td className="p-4 text-center">24/7 Dedicated</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Advanced Analytics</td>
                    <td className="p-4 text-center"><X className="h-4 w-4 mx-auto text-muted-foreground" /></td>
                    <td className="p-4 text-center bg-primary/5"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                    <td className="p-4 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Custom Integrations</td>
                    <td className="p-4 text-center"><X className="h-4 w-4 mx-auto text-muted-foreground" /></td>
                    <td className="p-4 text-center bg-primary/5"><X className="h-4 w-4 mx-auto text-muted-foreground" /></td>
                    <td className="p-4 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">SLA Guarantees</td>
                    <td className="p-4 text-center"><X className="h-4 w-4 mx-auto text-muted-foreground" /></td>
                    <td className="p-4 text-center bg-primary/5"><X className="h-4 w-4 mx-auto text-muted-foreground" /></td>
                    <td className="p-4 text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Pricing FAQ
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Can I change plans at any time?
              </h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll pro-rate any billing differences.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                What happens when my trial expires?
              </h3>
              <p className="text-muted-foreground">
                Your trial includes full access to Pro features for 14 days. After the trial, you'll automatically move to the free Starter plan unless you choose to upgrade.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Do you offer annual discounts?
              </h3>
              <p className="text-muted-foreground">
                Yes! Save 20% when you pay annually. Annual plans also include priority onboarding and additional training resources.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and for Enterprise customers, we can arrange invoice payments and bank transfers.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Is there a setup fee?
              </h3>
              <p className="text-muted-foreground">
                No setup fees for Starter and Pro plans. Enterprise customers may have custom onboarding costs depending on integration complexity.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Can I cancel anytime?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access to paid features until the end of your current billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="mx-auto max-w-3xl border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center p-8 text-center md:p-12">
            <Rocket className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Supercharge Your Development?
            </h2>
            <p className="mb-8 text-muted-foreground max-w-2xl">
              Join thousands of developers who've already transformed their workflow with AI-powered development. Start your free trial today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="rounded-full px-8">
                Start Free 14-Day Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                <MessageCircle className="mr-2 h-4 w-4" />
                Schedule a Demo
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required • Cancel anytime • 99.9% uptime SLA
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Trust Indicators */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>SOC 2 Compliant</span>
          </div>
          <Separator orientation="vertical" className="hidden h-4 md:block" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>256-bit SSL Encryption</span>
          </div>
          <Separator orientation="vertical" className="hidden h-4 md:block" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>99.9% Uptime</span>
          </div>
          <Separator orientation="vertical" className="hidden h-4 md:block" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Headphones className="h-4 w-4" />
            <span>24/7 Support</span>
          </div>
        </div>
      </section>
    </div>
  );
}