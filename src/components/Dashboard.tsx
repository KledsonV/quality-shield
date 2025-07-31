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
  RefreshCw
} from "lucide-react";

const Dashboard = () => {
  const mockEndpoints = [
    {
      id: 1,
      name: "/api/users",
      method: "GET",
      status: "healthy",
      responseTime: "127ms",
      uptime: "99.9%",
      lastCheck: "2 min ago",
      vulnerabilities: 0
    },
    {
      id: 2,
      name: "/api/auth/login",
      method: "POST",
      status: "warning",
      responseTime: "245ms",
      uptime: "99.2%",
      lastCheck: "1 min ago",
      vulnerabilities: 1
    },
    {
      id: 3,
      name: "/api/payments",
      method: "POST",
      status: "critical",
      responseTime: "1.2s",
      uptime: "95.1%",
      lastCheck: "5 min ago",
      vulnerabilities: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-success";
      case "warning": return "text-warning";
      case "critical": return "text-danger";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy": return <Badge className="bg-success/10 text-success border-success/20">Healthy</Badge>;
      case "warning": return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case "critical": return <Badge className="bg-danger/10 text-danger border-danger/20">Critical</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">API Monitoring Dashboard</h2>
              <p className="text-muted-foreground">Real-time overview of your API endpoints</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="default" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Endpoint
              </Button>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-card-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Endpoints</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Activity className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-card-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Healthy</p>
                    <p className="text-2xl font-bold text-success">9</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-card-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Issues</p>
                    <p className="text-2xl font-bold text-warning">3</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-card-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avg Response</p>
                    <p className="text-2xl font-bold">156ms</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Endpoints Table */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              API Endpoints Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEndpoints.map((endpoint) => (
                <div key={endpoint.id} className="flex items-center justify-between p-4 border border-card-border rounded-lg hover:bg-background-secondary transition-fast">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(endpoint.status)} bg-current`}></div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium">{endpoint.name}</span>
                        <Badge variant="outline" className="text-xs">{endpoint.method}</Badge>
                        {getStatusBadge(endpoint.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {endpoint.lastCheck}
                        </span>
                        <span>Response: {endpoint.responseTime}</span>
                        <span>Uptime: {endpoint.uptime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {endpoint.vulnerabilities > 0 && (
                      <div className="flex items-center gap-2 text-danger">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm">{endpoint.vulnerabilities} vulnerabilities</span>
                      </div>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;