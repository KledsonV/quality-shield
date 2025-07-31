import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { day: 'Mon', actual: 156, predicted: 145, probability: 85 },
  { day: 'Tue', actual: 234, predicted: 220, probability: 92 },
  { day: 'Wed', actual: 189, predicted: 195, probability: 78 },
  { day: 'Thu', actual: 145, predicted: 150, probability: 88 },
  { day: 'Fri', actual: 298, predicted: 280, probability: 95 },
  { day: 'Sat', actual: 102, predicted: 110, probability: 65 },
  { day: 'Sun', actual: 87, predicted: 90, probability: 72 }
];

export function PredictionChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis 
          dataKey="day" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          yAxisId="left"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--popover))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--popover-foreground))'
          }}
        />
        <Legend />
        <Bar 
          yAxisId="left"
          dataKey="actual" 
          fill="hsl(var(--primary))" 
          name="Actual Response Time (ms)"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          yAxisId="left"
          dataKey="predicted" 
          fill="hsl(var(--success))" 
          name="Predicted Response Time (ms)"
          radius={[4, 4, 0, 0]}
          opacity={0.7}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="probability" 
          stroke="hsl(var(--warning))" 
          strokeWidth={3}
          name="Failure Probability (%)"
          dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}