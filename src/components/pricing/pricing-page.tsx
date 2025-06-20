import { PricingCard } from './pricing-card';

export function PricingPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground">
          Select the perfect plan for your needs. Upgrade or downgrade at any time.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <PricingCard
          title="Pro Monthly"
          description="Perfect for getting started"
          price="€19"
          period="month"
          features={[
            'Unlimited AI generations',
            'Priority support',
            'Advanced analytics',
            'Custom integrations',
            'API access',
          ]}
          slug="pro-monthly"
        />
        
        <PricingCard
          title="Pro Yearly"
          description="Best value for committed users"
          price="€190"
          period="year"
          features={[
            'Everything in Pro Monthly',
            'Save €38 per year',
            'Early access to new features',
            'Dedicated account manager',
            'Custom training sessions',
          ]}
          slug="pro-yearly"
          isPopular={true}
        />
      </div>
      
      <div className="text-center mt-12">
        <p className="text-sm text-muted-foreground">
          All plans include a 14-day money-back guarantee. No questions asked.
        </p>
      </div>
    </div>
  );
}