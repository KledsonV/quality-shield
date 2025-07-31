import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  Plus,
  RefreshCw,
  Zap,
  Users
} from "lucide-react";

const Overview = () => {
  const quickStats = [
    {
      title: "Total Endpoints",
      value: "24",
      change: "+3 this week",
      icon: Activity,
      color: "text-primary"
    },
    {
      title: "Healthy APIs",
      value: "21",
      change: "87.5% uptime",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Critical Issues",
      value: "2",
      change: "-1 from yesterday",
      icon: AlertTriangle,
      color: "text-danger"
    },
    {
      title: "Predictions",
      value: "5",
      change: "AI alerts this week",
      icon: Zap,
      color: "text-warning"
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "critical",
      endpoint: "/api/payments/process",
      message: "Response time exceeded 2s threshold",
      time: "5 minutes ago"
    },
    {
      id: 2,
      type: "warning",
      endpoint: "/api/auth/login",
      message: "SSL certificate expires in 7 days",
      time: "2 hours ago"
    },
    {
      id: 3,
      type: "info",
      endpoint: "/api/users/profile",
      message: "AI predicts high traffic at 3 PM",
      time: "1 day ago"
    }
  ];

  const topEndpoints = [
    { name: "/api/users", requests: "12.5K", avgResponse: "127ms", status: "healthy" },
    { name: "/api/auth/login", requests: "8.2K", avgResponse: "245ms", status: "warning" },
    { name: "/api/products", requests: "6.8K", avgResponse: "89ms", status: "healthy" },
    { name: "/api/payments", requests: "3.1K", avgResponse: "1.2s", status: "critical" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Monitor your API health at a glance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add API
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-card-border hover:shadow-card transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.change}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-card-border">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'critical' ? 'bg-danger' :
                    alert.type === 'warning' ? 'bg-warning' : 'bg-primary'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">{alert.endpoint}</Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Endpoints */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Endpoints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topEndpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-card-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      endpoint.status === 'healthy' ? 'bg-success' :
                      endpoint.status === 'warning' ? 'bg-warning' : 'bg-danger'
                    }`}></div>
                    <div>
                      <p className="font-medium">{endpoint.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {endpoint.requests} requests • {endpoint.avgResponse}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={endpoint.status === 'healthy' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {endpoint.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-success-foreground" />
              </div>
              <h3 className="font-semibold text-success">APIs Healthy</h3>
              <p className="text-2xl font-bold text-success">87.5%</p>
              <p className="text-sm text-muted-foreground">21 of 24 endpoints</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-warning-foreground" />
              </div>
              <h3 className="font-semibold text-warning">Avg Response</h3>
              <p className="text-2xl font-bold text-warning">156ms</p>
              <p className="text-sm text-muted-foreground">15% improvement</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-primary">Daily Users</h3>
              <p className="text-2xl font-bold text-primary">24.5K</p>
              <p className="text-sm text-muted-foreground">+12% from yesterday</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;