import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  AlertTriangle, 
  Search, 
  Scan,
  Download,
  Calendar,
  ExternalLink
} from "lucide-react";

const Security = () => {
  const vulnerabilities = [
    {
      id: 1,
      endpoint: "/api/auth/login",
      severity: "high",
      type: "SQL Injection",
      description: "Potential SQL injection vulnerability in login endpoint",
      discovered: "2024-01-15",
      status: "open",
      cveId: "CVE-2024-0001"
    },
    {
      id: 2,
      endpoint: "/api/users/{id}",
      severity: "medium",
      type: "Access Control",
      description: "Insufficient access controls for user data endpoints",
      discovered: "2024-01-14",
      status: "open",
      cveId: "CVE-2024-0002"
    },
    {
      id: 3,
      endpoint: "/api/payments/webhook",
      severity: "low",
      type: "Information Disclosure",
      description: "Minor information leakage in error responses",
      discovered: "2024-01-13",
      status: "resolved",
      cveId: "CVE-2024-0003"
    },
    {
      id: 4,
      endpoint: "/api/admin/users",
      severity: "critical",
      type: "Authentication Bypass",
      description: "Critical authentication bypass vulnerability",
      discovered: "2024-01-12",
      status: "open",
      cveId: "CVE-2024-0004"
    }
  ];

  const scanHistory = [
    {
      id: 1,
      date: "2024-01-15 14:30",
      endpoints: 24,
      vulnerabilities: 8,
      status: "completed",
      duration: "15m 32s"
    },
    {
      id: 2,
      date: "2024-01-14 09:15", 
      endpoints: 22,
      vulnerabilities: 12,
      status: "completed",
      duration: "18m 45s"
    },
    {
      id: 3,
      date: "2024-01-13 16:20",
      endpoints: 20,
      vulnerabilities: 6,
      status: "completed",
      duration: "12m 15s"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Critical</Badge>;
      case "high":
        return <Badge className="bg-danger/10 text-danger border-danger/20">High</Badge>;
      case "medium":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
      case "low":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "open" 
      ? <Badge className="bg-danger/10 text-danger border-danger/20">Open</Badge>
      : <Badge className="bg-success/10 text-success border-success/20">Resolved</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Monitoring</h1>
          <p className="text-muted-foreground">Monitor and manage security vulnerabilities</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Scan
          </Button>
          <Button variant="default">
            <Scan className="w-4 h-4 mr-2" />
            Start Security Scan
          </Button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vulnerabilities</p>
                <p className="text-2xl font-bold text-danger">12</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-danger" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Issues</p>
                <p className="text-2xl font-bold text-red-500">2</p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Scan</p>
                <p className="text-2xl font-bold">2h ago</p>
              </div>
              <Scan className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold text-warning">65/100</p>
              </div>
              <Shield className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Vulnerabilities */}
        <Card className="border-card-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Security Vulnerabilities
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search vulnerabilities..." 
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vulnerabilities.map((vuln) => (
                <div 
                  key={vuln.id}
                  className="p-4 border border-card-border rounded-lg space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{vuln.type}</h4>
                        {getSeverityBadge(vuln.severity)}
                        {getStatusBadge(vuln.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {vuln.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Endpoint: {vuln.endpoint}</span>
                        <span>CVE: {vuln.cveId}</span>
                        <span>Discovered: {vuln.discovered}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scan History */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="w-5 h-5" />
              Scan History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scanHistory.map((scan) => (
                <div 
                  key={scan.id}
                  className="flex items-center justify-between p-4 border border-card-border rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium">{scan.date}</span>
                      <Badge 
                        className={scan.status === "completed" 
                          ? "bg-success/10 text-success border-success/20" 
                          : "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {scan.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {scan.endpoints} endpoints • {scan.vulnerabilities} vulnerabilities • {scan.duration}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Report
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Recommendations */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Immediate Actions</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-red-500">Fix Critical Authentication Bypass</p>
                    <p className="text-sm text-muted-foreground">Immediate attention required for /api/admin/users endpoint</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-danger/5 border border-danger/20">
                  <div className="w-2 h-2 bg-danger rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-danger">Patch SQL Injection Vulnerability</p>
                    <p className="text-sm text-muted-foreground">High priority fix for login endpoint</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Best Practices</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Enable Rate Limiting</p>
                    <p className="text-sm text-muted-foreground">Protect against brute force attacks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Update SSL Certificates</p>
                    <p className="text-sm text-muted-foreground">Renew certificates expiring soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;