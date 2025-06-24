;
import { useQuery, useMutation } from '@tanstack/react-query';
import { convexQuery, useConvexMutation } from '@convex-dev/react-query';
import { api } from '~/convex/_generated/api';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useAuth } from '@daveyplate/better-auth-tanstack';

export const Route = createFileRoute({
  component: MacroCalculator,
});

function MacroCalculator() {
  const { data: session } = useAuth();
  const today = new Date().toISOString().slice(0, 10);
  
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const macros = useQuery(
    convexQuery(api.macros.listMacros, { 
      date: today,
      sessionToken: session?.session?.token || ''
    })
  );

  const upsertMacro = useMutation({
    mutationFn: useConvexMutation(api.macros.upsertMacro),
    onSuccess: () => {
      // Clear form
      setProtein('');
      setCarbs('');
      setFat('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.session?.token) return;

    upsertMacro.mutate({
      date: today,
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      sessionToken: session.session.token,
    });
  };

  const todayMacros = macros.data?.[0];
  const totalCalories = todayMacros 
    ? todayMacros.calories 
    : 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Macro Calculator</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Log Your Macros</CardTitle>
            <CardDescription>
              Enter your macronutrients for {today}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={upsertMacro.isPending || !session}
              >
                {upsertMacro.isPending ? 'Saving...' : 'Save Macros'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
            <CardDescription>
              Your macro breakdown for {today}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {macros.isLoading ? (
              <p>Loading...</p>
            ) : todayMacros ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="text-2xl font-bold">{todayMacros.protein}g</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="text-2xl font-bold">{todayMacros.carbs}g</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fat</p>
                  <p className="text-2xl font-bold">{todayMacros.fat}g</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Total Calories</p>
                  <p className="text-3xl font-bold">{totalCalories}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No data logged for today</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}