import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', responseTime: 120 },
  { time: '04:00', responseTime: 98 },
  { time: '08:00', responseTime: 156 },
  { time: '12:00', responseTime: 234 },
  { time: '16:00', responseTime: 189 },
  { time: '20:00', responseTime: 145 },
  { time: '24:00', responseTime: 102 }
];

export function ResponseTimeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis 
          dataKey="time" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
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
        <Line 
          type="monotone" 
          dataKey="responseTime" 
          stroke="hsl(var(--primary))" 
          strokeWidth={3}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}