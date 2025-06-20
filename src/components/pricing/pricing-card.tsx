import { authClient } from '~/lib/auth-client';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  slug: 'pro-monthly' | 'pro-yearly';
  isPopular?: boolean;
}

export function PricingCard({
  title,
  description,
  price,
  period,
  features,
  slug,
  isPopular = false,
}: PricingCardProps) {
  const handleCheckout = async () => {
    try {
      await authClient.checkout({ slug });
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <Card className={isPopular ? 'border-primary shadow-lg' : ''}>
      {isPopular && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleCheckout}>
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}