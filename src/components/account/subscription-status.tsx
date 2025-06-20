import { useQuery } from '@tanstack/react-query';
import { authClient } from '~/lib/auth-client';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';

export function SubscriptionStatus() {
  const { data: customer, isLoading, error } = useQuery({
    queryKey: ['customer-state'],
    queryFn: () => authClient.customer.state(),
  });

  const handleManageBilling = async () => {
    try {
      await authClient.customer.portal();
    } catch (error) {
      console.error('Portal error:', error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Failed to load subscription status</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasActiveSubscription = customer?.data?.activeSubscriptions?.length > 0;
  const subscription = customer?.data?.activeSubscriptions?.[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Manage your subscription and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Current Plan</span>
          </div>
          <Badge variant={hasActiveSubscription ? 'default' : 'secondary'}>
            {hasActiveSubscription ? 'Pro' : 'Free'}
          </Badge>
        </div>

        {subscription && subscription.currentPeriodEnd && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Renews on</span>
            </div>
            <span className="text-sm">
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </span>
          </div>
        )}

        <div className="pt-4">
          <Button onClick={handleManageBilling} className="w-full">
            {hasActiveSubscription ? 'Manage Billing' : 'Upgrade to Pro'}
          </Button>
        </div>

        {!hasActiveSubscription && (
          <p className="text-sm text-muted-foreground text-center">
            Upgrade to Pro to unlock all features
          </p>
        )}
      </CardContent>
    </Card>
  );
}