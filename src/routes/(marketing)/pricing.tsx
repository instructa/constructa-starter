;
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import {
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Crown,
  Users,
  MessageSquare,
  Headphones,
  Cog,
  Star,
  Shield,
  Rocket,
  Globe,
  Clock,
  Infinity,
  ChevronRight,
  Award,
  TrendingUp,
  Database,
  Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Route = createFileRoute({
  component: PricingComponent,
});

function PricingComponent() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 0, yearly: 0 },
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Perfect for exploring AI development and small projects',
      badge: null,
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      features: [
        '5 AI model integrations',
        '1,000 API calls/month',
        'Community support',
        'Basic templates & docs',
        'Core development tools',
        'Standard security',
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const,
      popular: false,
      savings: null,
    },
    {
      name: 'Professional',
      price: { monthly: 29, yearly: 290 },
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'For developers building production-ready AI applications',
      badge: 'Most Popular',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Unlimited AI model integrations',
        '50,000 API calls/month',
        'Priority email support',
        'Advanced templates & examples',
        'Premium documentation',
        'Performance analytics',
        'Team collaboration (up to 5 users)',
        'Custom integrations',
      ],
      buttonText: 'Start Building',
      buttonVariant: 'default' as const,
      popular: true,
      savings: billingPeriod === 'yearly' ? '2 months free' : null,
    },
    {
      name: 'Enterprise',
      price: { monthly: 199, yearly: 1990 },
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Enterprise-grade solution with dedicated support and custom features',
      badge: 'Enterprise',
      icon: Crown,
      color: 'from-orange-500 to-red-500',
      features: [
        'Everything in Professional',
        'Unlimited API calls',
        'Dedicated support team',
        'Custom model training',
        'Advanced security & compliance',
        'Unlimited team members',
        'White-label solutions',
        'SLA guarantee',
        'Custom integrations & features',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
      popular: false,
      savings: billingPeriod === 'yearly' ? '2 months free + setup' : null,
    },
  ];

  const features = [
    {
      icon: Database,
      title: 'Multiple AI Models',
      description: 'Access to 20+ state-of-the-art AI models including GPT, Claude, and custom models',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with end-to-end encryption and advanced access controls',
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Detailed insights into usage, performance, and cost optimization',
    },
    {
      icon: Globe,
      title: 'Global Infrastructure',
      description: '99.9% uptime with global CDN and edge computing capabilities',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Built-in collaboration tools with role-based access and project management',
    },
    {
      icon: Rocket,
      title: 'Fast Deployment',
      description: 'Deploy AI applications in minutes with our optimized infrastructure',
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      {/* Hero Section */}
      <motion.section 
        className="container relative z-10 mx-auto flex flex-col items-center px-4 pt-20 pb-16 text-center md:pt-32 md:pb-24"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <motion.div variants={fadeInUp}>
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            <Sparkles className="mr-2 h-4 w-4" />
            Simple, Transparent Pricing
          </Badge>
        </motion.div>

        <motion.h1 
          className="max-w-4xl font-bold text-4xl text-foreground md:text-6xl lg:text-7xl tracking-tight"
          variants={fadeInUp}
        >
          Build AI Apps
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Without Limits
          </span>
        </motion.h1>

        <motion.p 
          className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed"
          variants={fadeInUp}
        >
          Choose the perfect plan for your AI development journey. From free exploration to enterprise-grade solutions with dedicated support.
        </motion.p>

        {/* Billing Toggle */}
        <motion.div 
          className="mt-8 flex items-center space-x-4 rounded-full bg-muted p-1"
          variants={fadeInUp}
        >
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all relative ${
              billingPeriod === 'yearly'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Yearly
            <Badge className="ml-2 px-2 py-0.5 text-xs bg-green-500 text-white">
              Save 20%
            </Badge>
          </button>
        </motion.div>
      </motion.section>

      {/* Pricing Cards */}
      <motion.section 
        className="container mx-auto px-4 py-16 md:py-24"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const price = plan.price[billingPeriod];
            
            return (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card 
                  className={`relative h-full transition-all duration-300 hover:shadow-2xl ${
                    plan.popular 
                      ? 'border-2 border-primary shadow-xl scale-105 bg-gradient-to-b from-primary/5 to-transparent' 
                      : 'border hover:border-primary/50 bg-card/50 backdrop-blur-sm'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1 font-medium">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4 pt-8">
                    <div className="flex justify-center mb-6">
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${plan.color} shadow-lg`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                    
                    <div className="mt-4 space-y-1">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">${price}</span>
                        <span className="text-muted-foreground text-lg ml-1">{plan.period}</span>
                      </div>
                      {plan.savings && (
                        <Badge variant="secondary" className="text-xs">
                          {plan.savings}
                        </Badge>
                      )}
                    </div>
                    
                    <CardDescription className="mt-4 text-base leading-relaxed">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 pb-8">
                    <Button 
                      className={`w-full mb-8 rounded-full h-12 text-base font-medium ${
                        plan.popular ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' : ''
                      }`}
                      variant={plan.buttonVariant}
                      size="lg"
                    >
                      {plan.buttonText}
                      {plan.buttonVariant === 'default' && (
                        <ArrowRight className="ml-2 h-4 w-4" />
                      )}
                    </Button>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        What's included:
                      </h4>
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 bg-primary/10 rounded-full p-0.5" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="container mx-auto px-4 py-16 md:py-24 bg-muted/20"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-6">
            Everything You Need to Build AI Apps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform provides all the tools, infrastructure, and support you need to create powerful AI applications
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full border-0 bg-background/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="container mx-auto px-4 py-16 md:py-24"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <motion.div className="mx-auto max-w-3xl" variants={fadeInUp}>
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately with prorated billing, while downgrades take effect at the end of your current billing cycle."
              },
              {
                question: "What happens if I exceed my API limits?",
                answer: "We'll notify you when you're approaching your limits. You can either upgrade your plan or purchase additional API calls. We never cut off your service without warning."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund within 30 days of purchase."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We're SOC 2 compliant and use enterprise-grade security with end-to-end encryption. Your data is never used to train AI models without explicit consent."
              },
              {
                question: "Can I use my own AI models?",
                answer: "Yes! Our Enterprise plan includes custom model integration and training capabilities. You can deploy and manage your own fine-tuned models on our infrastructure."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-border pb-6"
                variants={fadeInUp}
              >
                <h3 className="mb-3 text-xl font-semibold">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="container mx-auto px-4 py-16 md:py-24"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <Card className="mx-auto max-w-4xl border-primary/20 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center p-8 text-center md:p-16">
            <motion.div
              className="mb-6 p-4 rounded-full bg-gradient-to-r from-primary to-secondary"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Rocket className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Build the Future?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground max-w-2xl">
              Join over 10,000 developers who are building incredible AI applications with our platform. Start your journey today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Start Building Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                <MessageSquare className="mr-2 h-4 w-4" />
                Talk to Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Trust Signals */}
      <motion.section 
        className="container mx-auto px-4 py-12 border-t border-border/50"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row text-center">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="font-medium">SOC 2 Compliant</span>
          </div>
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="font-medium">99.9% Uptime SLA</span>
          </div>
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Users className="h-5 w-5 text-purple-500" />
            <span className="font-medium">10,000+ Developers</span>
          </div>
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Award className="h-5 w-5 text-orange-500" />
            <span className="font-medium">Industry Leader</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}