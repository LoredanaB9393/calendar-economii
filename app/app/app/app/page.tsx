import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const months = [
  "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
];

const savingsTarget = 75000;
const monthlySavingsPlan = [3470, 8200, 4200, 4200, 4200, 4200, 4200];
const monthlyExpenseLimit = 5430; // 2530 fixe + 2900 variabile

export default function CalendarEconomii() {
  const [savingsChecked, setSavingsChecked] = useState(Array(months.length).fill(false));
  const [expensesChecked, setExpensesChecked] = useState(Array(months.length).fill(false));

  const economiiCumulative = savingsChecked.reduce((acc, checked, index) => {
    return acc + (checked ? monthlySavingsPlan[index] : 0);
  }, 0);

  const procentProgres = Math.min(
    100,
    Math.round((economiiCumulative / savingsTarget) * 100)
  );

  const toggleBifa = (index, type) => {
    const copy = type === 'savings' ? [...savingsChecked] : [...expensesChecked];
    copy[index] = !copy[index];
    type === 'savings' ? setSavingsChecked(copy) : setExpensesChecked(copy);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">📅 Calendar Economii Avans</h1>

      <Card className="mb-6">
        <CardContent className="p-4">
          <p className="mb-2">Progres total economii:</p>
          <Progress value={procentProgres} className="h-4" />
          <p className="mt-2 text-sm text-muted-foreground">
            {economiiCumulative} RON / 75.000 RON ({procentProgres}%)
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {months.map((luna, index) => (
          <Card key={index} className="p-4">
            <div className="mb-2">
              <h3 className="text-lg font-semibold">{luna}</h3>
              <p className="text-sm text-muted-foreground">
                Economie planificată: {monthlySavingsPlan[index]} RON
              </p>
              <p className="text-sm text-muted-foreground">
                Limită cheltuieli: {monthlyExpenseLimit} RON
              </p>
            </div>
            <div className="flex justify-between gap-2">
              <Button
                variant={savingsChecked[index] ? "secondary" : "default"}
                onClick={() => toggleBifa(index, 'savings')}
              >
                {savingsChecked[index] ? "✅ Economisit" : "Bifează economii"}
              </Button>
              <Button
                variant={expensesChecked[index] ? "secondary" : "default"}
                onClick={() => toggleBifa(index, 'expenses')}
              >
                {expensesChecked[index] ? "✅ Cheltuieli OK" : "Bifează cheltuieli"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
