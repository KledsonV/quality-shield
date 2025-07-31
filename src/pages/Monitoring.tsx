import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, 
  Plus, 
  Search, 
  MoreVertical,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  Settings,
  BarChart3,
  Pause,
  Play
} from "lucide-react";

const Monitoring = () => {
  const { toast } = useToast();
  const endpoints = [
    {
      id: 1,
      name: "/api/users",
      method: "GET",
      url: "https://api.example.com/users",
      status: "healthy",
      uptime: "99.9%",
      avgResponse: "127ms",
      lastCheck: "30s ago",
      requests24h: "12.5K"
    },
    {
      id: 2,
      name: "/api/auth/login",
      method: "POST", 
      url: "https://api.example.com/auth/login",
      status: "warning",
      uptime: "99.2%",
      avgResponse: "245ms",
      lastCheck: "1m ago",
      requests24h: "8.2K"
    },
    {
      id: 3,
      name: "/api/payments/process",
      method: "POST",
      url: "https://api.example.com/payments/process",
      status: "critical",
      uptime: "95.1%",
      avgResponse: "1.2s",
      lastCheck: "5m ago",
      requests24h: "3.1K"
    },
    {
      id: 4,
      name: "/api/products",
      method: "GET",
      url: "https://api.example.com/products",
      status: "healthy",
      uptime: "99.8%",
      avgResponse: "89ms",
      lastCheck: "15s ago",
      requests24h: "6.8K"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case "critical":
        return <XCircle className="w-4 h-4 text-danger" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-success/10 text-success border-success/20">Healthy</Badge>;
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case "critical":
        return <Badge className="bg-danger/10 text-danger border-danger/20">Critical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Monitoring</h1>
          <p className="text-muted-foreground">Monitor and manage your API endpoints</p>
        </div>
        <Button variant="default">
          <Plus className="w-4 h-4 mr-2" />
          Add Endpoint
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search endpoints..." 
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">All</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">Healthy</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">Issues</Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Endpoints</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Uptime</p>
                <p className="text-2xl font-bold text-success">98.7%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">156ms</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">30.6K</p>
              </div>
              <Activity className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Endpoints Table */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {endpoints.map((endpoint) => (
              <div 
                key={endpoint.id} 
                className="flex items-center justify-between p-4 border border-card-border rounded-lg hover:bg-background-secondary transition-fast"
              >
                <div className="flex items-center gap-4 flex-1">
                  {getStatusIcon(endpoint.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{endpoint.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {endpoint.method}
                      </Badge>
                      {getStatusBadge(endpoint.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{endpoint.url}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Uptime: {endpoint.uptime}</span>
                      <span>Response: {endpoint.avgResponse}</span>
                      <span>Requests: {endpoint.requests24h}</span>
                      <span>Last check: {endpoint.lastCheck}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="hover-glow">
                    View Details
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="hover-glow">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => toast({ title: "Edit endpoint", description: "Opening edit dialog..." })}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Configuration
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast({ title: "View analytics", description: "Loading analytics..." })}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast({ title: "Pause monitoring", description: "Monitoring paused" })}>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Monitoring
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => toast({ title: "Settings", description: "Opening settings..." })}>
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => toast({ title: "Delete endpoint", description: "Endpoint deleted", variant: "destructive" })}
                        className="text-danger focus:text-danger"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Endpoint
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Monitoring;