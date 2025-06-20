import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/success')({
  component: SuccessPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      checkout_id: search.checkout_id as string | undefined,
    };
  },
});

function SuccessPage() {
  const { checkout_id } = Route.useSearch();

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your purchase. Your Pro plan is now active.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {checkout_id && (
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm text-muted-foreground">
                Order ID: {checkout_id}
              </p>
            </div>
          )}
          
          <p className="text-center text-sm text-muted-foreground">
            You'll receive a confirmation email shortly with all the details of your purchase.
          </p>
          
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">
                Manage Subscription
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}