import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jan', uptime: 99.9 },
  { date: 'Feb', uptime: 98.5 },
  { date: 'Mar', uptime: 99.2 },
  { date: 'Apr', uptime: 97.8 },
  { date: 'May', uptime: 99.7 },
  { date: 'Jun', uptime: 98.9 },
  { date: 'Jul', uptime: 99.1 }
];

export function UptimeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis 
          dataKey="date" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          domain={[95, 100]}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--popover))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--popover-foreground))'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="uptime" 
          stroke="hsl(var(--success))" 
          strokeWidth={2}
          fill="url(#successGradient)"
        />
        <defs>
          <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
}