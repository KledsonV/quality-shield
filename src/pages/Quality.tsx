import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  TestTube, 
  Plus, 
  Play, 
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Search
} from "lucide-react";

const Quality = () => {
  const testCases = [
    {
      id: 1,
      name: "User Authentication Test",
      endpoint: "/api/auth/login",
      method: "POST",
      expectedStatus: 200,
      expectedFields: ["token", "user", "expires"],
      lastRun: "2024-01-15 14:30",
      status: "passed",
      responseTime: "245ms"
    },
    {
      id: 2,
      name: "Get User Profile",
      endpoint: "/api/users/{id}",
      method: "GET",
      expectedStatus: 200,
      expectedFields: ["id", "name", "email"],
      lastRun: "2024-01-15 14:25",
      status: "failed",
      responseTime: "127ms"
    },
    {
      id: 3,
      name: "Create New Product",
      endpoint: "/api/products",
      method: "POST",
      expectedStatus: 201,
      expectedFields: ["id", "name", "price", "created_at"],
      lastRun: "2024-01-15 14:20",
      status: "passed",
      responseTime: "89ms"
    },
    {
      id: 4,
      name: "Payment Processing",
      endpoint: "/api/payments/process",
      method: "POST",
      expectedStatus: 200,
      expectedFields: ["transaction_id", "status", "amount"],
      lastRun: "2024-01-15 14:15",
      status: "warning",
      responseTime: "1.2s"
    }
  ];

  const qualityMetrics = [
    {
      endpoint: "/api/users",
      healthScore: 95,
      reliability: "Excellent",
      testsPassed: 24,
      testsTotal: 25
    },
    {
      endpoint: "/api/auth/login",
      healthScore: 87,
      reliability: "Good", 
      testsPassed: 18,
      testsTotal: 20
    },
    {
      endpoint: "/api/payments",
      healthScore: 62,
      reliability: "Poor",
      testsPassed: 8,
      testsTotal: 15
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-danger" />;
      case "warning":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <TestTube className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge className="bg-success/10 text-success border-success/20">Passed</Badge>;
      case "failed":
        return <Badge className="bg-danger/10 text-danger border-danger/20">Failed</Badge>;
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-danger";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quality Assurance</h1>
          <p className="text-muted-foreground">Monitor API quality and test case execution</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Run All Tests
          </Button>
          <Button variant="default">
            <Plus className="w-4 h-4 mr-2" />
            Add Test Case
          </Button>
        </div>
      </div>

      {/* Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Test Cases</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <TestTube className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tests Passed</p>
                <p className="text-2xl font-bold text-success">42</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tests Failed</p>
                <p className="text-2xl font-bold text-danger">6</p>
              </div>
              <XCircle className="w-8 h-8 text-danger" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-success">87.5%</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Test Cases */}
        <Card className="border-card-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Test Cases
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tests..." 
                  className="pl-10 w-48"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testCases.map((test) => (
                <div 
                  key={test.id}
                  className="p-4 border border-card-border rounded-lg hover:bg-background-secondary transition-fast"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <h4 className="font-medium">{test.name}</h4>
                        <p className="text-sm text-muted-foreground">{test.endpoint}</p>
                      </div>
                    </div>
                    {getStatusBadge(test.status)}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-xs">{test.method}</Badge>
                      <span className="text-muted-foreground">Status: {test.expectedStatus}</span>
                      <span className="text-muted-foreground">Response: {test.responseTime}</span>
                    </div>
                    <div className="text-muted-foreground">
                      Expected fields: {test.expectedFields.join(", ")}
                    </div>
                    <div className="text-muted-foreground">
                      Last run: {test.lastRun}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Play className="w-3 h-3 mr-1" />
                      Run Test
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Quality Metrics by Endpoint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityMetrics.map((metric, index) => (
                <div 
                  key={index}
                  className="p-4 border border-card-border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{metric.endpoint}</h4>
                    <div className={`text-2xl font-bold ${getHealthColor(metric.healthScore)}`}>
                      {metric.healthScore}%
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Reliability</span>
                      <Badge 
                        className={
                          metric.reliability === "Excellent" ? "bg-success/10 text-success border-success/20" :
                          metric.reliability === "Good" ? "bg-primary/10 text-primary border-primary/20" :
                          "bg-danger/10 text-danger border-danger/20"
                        }
                      >
                        {metric.reliability}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tests Passed</span>
                      <span>{metric.testsPassed}/{metric.testsTotal}</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metric.healthScore >= 90 ? "bg-success" :
                          metric.healthScore >= 70 ? "bg-warning" : "bg-danger"
                        }`}
                        style={{ width: `${metric.healthScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Test Case */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Test Case
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Test Name</label>
                <Input placeholder="Enter test case name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">API Endpoint</label>
                <Input placeholder="/api/example/endpoint" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">HTTP Method</label>
                <select className="w-full p-2 border border-input rounded-md">
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Expected Status Code</label>
                <Input placeholder="200" type="number" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Expected Fields</label>
                <Input placeholder="id, name, email (comma separated)" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Test Description</label>
                <Textarea placeholder="Describe what this test validates..." />
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button variant="default">
              <TestTube className="w-4 h-4 mr-2" />
              Create Test Case
            </Button>
            <Button variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quality;