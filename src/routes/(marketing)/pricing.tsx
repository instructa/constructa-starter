import {} from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import {
  Check,
  X,
  Zap,
  Shield,
  Clock,
  Rocket,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Users,
  Crown,
  Star,
  Infinity,
  MessageSquare,
  Code2,
  Database,
  Palette,
  Settings,
} from 'lucide-react';
import GradientOrb from '~/components/gradient-orb';

export const Route = createFileRoute({
  component: RouteComponent,
});

const pricingTiers = [
  {
    name: 'Starter',
    description: 'Perfect for individual developers getting started with AI-assisted development',
    price: '$0',
    period: 'forever',
    icon: Code2,
    features: [
      'Complete AI-optimized starter kit',
      'Basic authentication system',
      'PostgreSQL database setup',
      'shadcn/ui components',
      'Tailwind CSS v4',
      'TypeScript configuration',
      'Basic Cursor rules',
      'Community support',
    ],
    notIncluded: [
      'Advanced AI workflows',
      'Premium templates',
      'Priority support',
      'Custom integrations',
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For teams and professionals building production applications with AI',
    price: '$29',
    period: 'per month',
    icon: Rocket,
    features: [
      'Everything in Starter',
      'Advanced AI chat templates',
      'Workflow automation tools',
      'Premium dashboard components',
      'Advanced authentication flows',
      'Database migration tools',
      'Enhanced Cursor rules',
      'Email support',
      'Team collaboration features',
      'Custom theme system',
    ],
    notIncluded: [
      'White-label solutions',
      'Custom integrations',
      'Dedicated support',
    ],
    buttonText: 'Start Pro Trial',
    buttonVariant: 'default' as const,
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations scaling AI-powered development across multiple teams',
    price: '$99',
    period: 'per month',
    icon: Crown,
    features: [
      'Everything in Pro',
      'White-label solutions',
      'Custom AI model integrations',
      'Advanced analytics dashboard',
      'Multi-tenant architecture',
      'Custom workflow builder',
      'Enterprise authentication',
      'Dedicated success manager',
      'Priority support (24/7)',
      'Custom training sessions',
      'On-premise deployment',
      'SLA guarantees',
    ],
    notIncluded: [],
    buttonText: 'Contact Sales',
    buttonVariant: 'default' as const,
    popular: false,
  },
];

const comparisonFeatures = [
  {
    category: 'Core Features',
    features: [
      {
        name: 'AI-Optimized Codebase',
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: 'TypeScript Configuration',
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: 'Authentication System',
        starter: 'Basic',
        pro: 'Advanced',
        enterprise: 'Enterprise',
      },
      {
        name: 'Database Setup',
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: 'UI Components',
        starter: 'Basic',
        pro: 'Premium',
        enterprise: 'Custom',
      },
    ],
  },
  {
    category: 'AI & Development',
    features: [
      {
        name: 'Cursor Rules',
        starter: 'Basic',
        pro: 'Advanced',
        enterprise: 'Custom',
      },
      {
        name: 'AI Chat Templates',
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: 'Workflow Automation',
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: 'Custom AI Models',
        starter: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
  {
    category: 'Support & Services',
    features: [
      {
        name: 'Community Support',
        starter: true,
        pro: true,
        enterprise: true,
      },
      {
        name: 'Email Support',
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: 'Priority Support',
        starter: false,
        pro: false,
        enterprise: true,
      },
      {
        name: 'Dedicated Success Manager',
        starter: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
];

function RouteComponent() {
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
          Choose Your AI Development Journey
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          From individual developers to enterprise teams, we have a plan that scales with your AI-powered development needs.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="rounded-full px-8">
            Start Free Forever <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">
            <MessageSquare className="mr-2 h-4 w-4" />
            Talk to Sales
          </Button>
        </div>

        <p className="mt-8 text-muted-foreground text-sm">
          14-day free trial on all paid plans • No credit card required
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <Card
                key={tier.name}
                className={`relative ${
                  tier.popular
                    ? 'border-primary/50 bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="px-4 py-1">
                      <Star className="mr-1 h-3.5 w-3.5" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="mt-2 text-base">
                    {tier.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && (
                      <span className="text-muted-foreground ml-2">/{tier.period}</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button
                    className="w-full rounded-full"
                    variant={tier.buttonVariant}
                    size="lg"
                  >
                    {tier.buttonText}
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-medium">Included Features:</h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.notIncluded.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-muted-foreground">Not included:</h4>
                      <ul className="space-y-2">
                        {tier.notIncluded.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Compare All Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="grid grid-cols-4 border-b bg-muted/50">
              <div className="p-4 font-medium">Features</div>
              <div className="p-4 font-medium text-center">Starter</div>
              <div className="p-4 font-medium text-center">Pro</div>
              <div className="p-4 font-medium text-center">Enterprise</div>
            </div>

            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={category.category}>
                <div className="grid grid-cols-4 border-b bg-muted/20">
                  <div className="p-4 font-medium text-sm uppercase tracking-wide text-muted-foreground">
                    {category.category}
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                {category.features.map((feature, featureIndex) => (
                  <div key={feature.name} className="grid grid-cols-4 border-b last:border-b-0">
                    <div className="p-4">{feature.name}</div>
                    <div className="p-4 text-center">
                      {typeof feature.starter === 'boolean' ? (
                        feature.starter ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{feature.starter}</span>
                      )}
                    </div>
                    <div className="p-4 text-center">
                      {typeof feature.pro === 'boolean' ? (
                        feature.pro ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{feature.pro}</span>
                      )}
                    </div>
                    <div className="p-4 text-center">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{feature.enterprise}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
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
                Can I start with the free plan and upgrade later?
              </h3>
              <p className="text-muted-foreground">
                Absolutely! The Starter plan is free forever and includes everything you need to get started with AI-assisted development. You can upgrade to Pro or Enterprise at any time to unlock additional features.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via bank transfer with annual billing.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing period, and you'll continue to have access to all paid features until then.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Do you offer discounts for educational institutions?
              </h3>
              <p className="text-muted-foreground">
                Yes! We offer 50% off Pro plans for students, teachers, and educational institutions. Contact our sales team with your .edu email address for verification.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                What happens to my data if I downgrade or cancel?
              </h3>
              <p className="text-muted-foreground">
                Your code and data belong to you. If you downgrade or cancel, you'll retain access to all code generated with our tools. However, some advanced features and integrations may be disabled.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Do you offer custom enterprise solutions?
              </h3>
              <p className="text-muted-foreground">
                Yes! Our Enterprise plan can be customized for your organization's specific needs. We offer on-premise deployment, custom integrations, dedicated support, and training. Contact our sales team to discuss your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="mx-auto max-w-4xl border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center p-8 text-center md:p-12">
            <Zap className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Supercharge Your Development with AI?
            </h2>
            <p className="mb-8 max-w-2xl text-muted-foreground">
              Join thousands of developers who are already building faster and smarter with our AI-optimized starter kit. Start free, upgrade when you're ready.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="rounded-full px-8">
                Start Building Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                <MessageSquare className="mr-2 h-4 w-4" />
                Schedule a Demo
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required • 14-day free trial on paid plans
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto border-t px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Constructa Starter. MIT License.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              Home
            </Link>
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary">
              Pricing
            </Link>
            <a
              href="mailto:support@constructa.ai"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}