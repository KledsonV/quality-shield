import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from "recharts";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  Globe,
  Server
} from "lucide-react";

const Analytics = () => {
  // Mock data for charts
  const responseTimeData = [
    { time: "00:00", api1: 120, api2: 180, api3: 95, api4: 220 },
    { time: "04:00", api1: 130, api2: 190, api3: 110, api4: 240 },
    { time: "08:00", api1: 250, api2: 320, api3: 180, api4: 400 },
    { time: "12:00", api1: 280, api2: 350, api3: 200, api4: 420 },
    { time: "16:00", api1: 320, api2: 380, api3: 220, api4: 450 },
    { time: "20:00", api1: 180, api2: 230, api3: 140, api4: 280 },
    { time: "23:59", api1: 140, api2: 200, api3: 120, api4: 250 }
  ];

  const requestVolumeData = [
    { hour: "00", requests: 1200, errors: 15 },
    { hour: "01", requests: 800, errors: 8 },
    { hour: "02", requests: 600, errors: 5 },
    { hour: "03", requests: 400, errors: 2 },
    { hour: "04", requests: 300, errors: 1 },
    { hour: "05", requests: 500, errors: 3 },
    { hour: "06", requests: 900, errors: 12 },
    { hour: "07", requests: 1500, errors: 18 },
    { hour: "08", requests: 2200, errors: 25 },
    { hour: "09", requests: 2800, errors: 32 },
    { hour: "10", requests: 3200, errors: 28 },
    { hour: "11", requests: 3500, errors: 35 },
    { hour: "12", requests: 3800, errors: 42 },
    { hour: "13", requests: 3600, errors: 38 },
    { hour: "14", requests: 3400, errors: 30 },
    { hour: "15", requests: 3200, errors: 28 },
    { hour: "16", requests: 2900, errors: 25 },
    { hour: "17", requests: 2500, errors: 22 },
    { hour: "18", requests: 2000, errors: 18 },
    { hour: "19", requests: 1800, errors: 15 },
    { hour: "20", requests: 1600, errors: 12 },
    { hour: "21", requests: 1400, errors: 10 },
    { hour: "22", requests: 1200, errors: 8 },
    { hour: "23", requests: 1000, errors: 6 }
  ];

  const statusDistributionData = [
    { name: "2xx Success", value: 87.5, count: 28750, color: "hsl(var(--success))" },
    { name: "4xx Client Error", value: 8.2, count: 2690, color: "hsl(var(--warning))" },
    { name: "5xx Server Error", value: 3.1, count: 1020, color: "hsl(var(--danger))" },
    { name: "3xx Redirect", value: 1.2, count: 390, color: "hsl(var(--primary))" }
  ];

  const uptimeData = [
    { endpoint: "/api/users", uptime: 99.9, downtime: 0.1 },
    { endpoint: "/api/auth", uptime: 99.2, downtime: 0.8 },
    { endpoint: "/api/payments", uptime: 95.1, downtime: 4.9 },
    { endpoint: "/api/products", uptime: 99.8, downtime: 0.2 },
    { endpoint: "/api/orders", uptime: 98.5, downtime: 1.5 }
  ];

  const performanceMetrics = [
    { metric: "Average Response Time", value: "156ms", change: -12, trend: "down", icon: Clock },
    { metric: "Total Requests (24h)", value: "45.2K", change: 8, trend: "up", icon: Activity },
    { metric: "Error Rate", value: "2.1%", change: -5, trend: "down", icon: AlertTriangle },
    { metric: "Uptime", value: "99.7%", change: 2, trend: "up", icon: CheckCircle2 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and performance insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="24h">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="border-card-border backdrop-blur-sm bg-background/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.metric}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center gap-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-success" />
                      )}
                      <span className="text-sm text-success">
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Chart */}
        <Card className="border-card-border backdrop-blur-sm bg-background/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Response Time Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="api1" stroke="hsl(var(--primary))" strokeWidth={2} name="/api/users" />
                <Line type="monotone" dataKey="api2" stroke="hsl(var(--success))" strokeWidth={2} name="/api/auth" />
                <Line type="monotone" dataKey="api3" stroke="hsl(var(--warning))" strokeWidth={2} name="/api/payments" />
                <Line type="monotone" dataKey="api4" stroke="hsl(var(--danger))" strokeWidth={2} name="/api/products" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Request Volume */}
        <Card className="border-card-border backdrop-blur-sm bg-background/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Request Volume & Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={requestVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stackId="1" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                  name="Requests"
                />
                <Area 
                  type="monotone" 
                  dataKey="errors" 
                  stackId="2" 
                  stroke="hsl(var(--danger))" 
                  fill="hsl(var(--danger))" 
                  fillOpacity={0.6}
                  name="Errors"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution and Uptime */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Code Distribution */}
        <Card className="border-card-border backdrop-blur-sm bg-background/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              HTTP Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value}%`, "Percentage"]}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {statusDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.value}%</div>
                      <div className="text-xs text-muted-foreground">{item.count.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endpoint Uptime */}
        <Card className="border-card-border backdrop-blur-sm bg-background/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              Endpoint Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={uptimeData}>
                <RadialBar 
                  dataKey="uptime" 
                  cornerRadius={10} 
                  fill="hsl(var(--primary))"
                  background={{ fill: "hsl(var(--muted))" }}
                />
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, "Uptime"]}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Legend />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {uptimeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{item.endpoint}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-success">{item.uptime}%</span>
                    {item.uptime >= 99 ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : item.uptime >= 95 ? (
                      <AlertTriangle className="w-4 h-4 text-warning" />
                    ) : (
                      <XCircle className="w-4 h-4 text-danger" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card className="border-card-border backdrop-blur-sm bg-background/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "2 min ago", event: "High response time detected on /api/payments", status: "warning" },
              { time: "5 min ago", event: "All systems operational", status: "success" },
              { time: "12 min ago", event: "Endpoint /api/users recovered", status: "success" },
              { time: "18 min ago", event: "Rate limit exceeded on /api/auth", status: "warning" },
              { time: "25 min ago", event: "Database connection timeout", status: "error" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background-secondary/50">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === "success" ? "bg-success" :
                  activity.status === "warning" ? "bg-warning" : "bg-danger"
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant={
                  activity.status === "success" ? "default" :
                  activity.status === "warning" ? "outline" : "destructive"
                }>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;