import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PredictionChart } from "@/components/charts/prediction-chart";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Calendar,
  Clock,
  Zap,
  BarChart3,
  Settings
} from "lucide-react";

const AIPredictions = () => {
  const predictions = [
    {
      id: 1,
      endpoint: "/api/payments/process",
      prediction: "High failure probability",
      probability: 85,
      timeframe: "Next 4 hours",
      factors: ["Increased response time", "Error rate spike", "High traffic"],
      recommendation: "Scale infrastructure or enable circuit breaker",
      severity: "critical"
    },
    {
      id: 2,
      endpoint: "/api/auth/login",
      prediction: "Performance degradation",
      probability: 72,
      timeframe: "Next 2 hours",
      factors: ["Database connection pool saturation", "Peak traffic pattern"],
      recommendation: "Increase connection pool size",
      severity: "warning"
    },
    {
      id: 3,
      endpoint: "/api/users/search",
      prediction: "Maintenance window suggested",
      probability: 68,
      timeframe: "Tonight 2-4 AM",
      factors: ["Low traffic period", "Pending updates available"],
      recommendation: "Deploy pending updates during suggested window",
      severity: "info"
    }
  ];

  const trends = [
    {
      endpoint: "/api/users",
      trend: "improving",
      change: "+12%",
      metric: "Response Time",
      prediction: "Continued improvement expected"
    },
    {
      endpoint: "/api/products",
      trend: "stable",
      change: "±2%",
      metric: "Error Rate",
      prediction: "Performance remains consistent"
    },
    {
      endpoint: "/api/orders",
      trend: "declining",
      change: "-8%",
      metric: "Throughput",
      prediction: "May need optimization soon"
    }
  ];

  const maintenanceWindows = [
    {
      id: 1,
      endpoint: "/api/payments",
      suggestedTime: "Tonight 2:00-4:00 AM",
      confidence: 92,
      reason: "Lowest traffic period with 99% confidence",
      impact: "Minimal user impact expected"
    },
    {
      id: 2,
      endpoint: "/api/reports",
      suggestedTime: "Sunday 1:00-3:00 AM",
      confidence: 88,
      reason: "Historical low usage pattern",
      impact: "Near-zero user impact"
    }
  ];

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-danger";
    if (probability >= 60) return "text-warning";
    return "text-success";
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-danger/10 text-danger border-danger/20">Critical</Badge>;
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case "info":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Info</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "declining":
        return <TrendingDown className="w-4 h-4 text-danger" />;
      default:
        return <BarChart3 className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Predictions</h1>
          <p className="text-muted-foreground">Intelligent insights and predictive analytics for your APIs</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure AI
          </Button>
          <Button variant="default">
            <Brain className="w-4 h-4 mr-2" />
            Run Analysis
          </Button>
        </div>
      </div>

      {/* AI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Predictions</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Risk Alerts</p>
                <p className="text-2xl font-bold text-danger">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-danger" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                <p className="text-2xl font-bold text-success">94.2%</p>
              </div>
              <Zap className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Analysis</p>
                <p className="text-2xl font-bold">15m ago</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Failure Predictions */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Failure Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {predictions.map((prediction) => (
              <div 
                key={prediction.id}
                className="p-6 border border-card-border rounded-lg space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{prediction.endpoint}</h4>
                      {getSeverityBadge(prediction.severity)}
                    </div>
                    <p className="text-muted-foreground mb-3">{prediction.prediction}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Contributing Factors</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {prediction.factors.map((factor, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Recommendation</h5>
                        <p className="text-sm text-muted-foreground">{prediction.recommendation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center ml-6">
                    <div className={`text-4xl font-bold ${getProbabilityColor(prediction.probability)}`}>
                      {prediction.probability}%
                    </div>
                    <p className="text-sm text-muted-foreground">Probability</p>
                    <p className="text-xs text-muted-foreground mt-1">{prediction.timeframe}</p>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-card-border">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="default" size="sm">
                    Take Action
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prediction Chart */}
      <Card className="border-card-border glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            AI Prediction Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PredictionChart />
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trends.map((trend, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 border border-card-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getTrendIcon(trend.trend)}
                    <div>
                      <h4 className="font-medium">{trend.endpoint}</h4>
                      <p className="text-sm text-muted-foreground">{trend.metric}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      trend.trend === "improving" ? "text-success" :
                      trend.trend === "declining" ? "text-danger" : "text-muted-foreground"
                    }`}>
                      {trend.change}
                    </div>
                    <p className="text-xs text-muted-foreground">{trend.prediction}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Windows */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Suggested Maintenance Windows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceWindows.map((window) => (
                <div 
                  key={window.id}
                  className="p-4 border border-card-border rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{window.endpoint}</h4>
                    <Badge className="bg-success/10 text-success border-success/20">
                      {window.confidence}% confidence
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{window.suggestedTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{window.reason}</p>
                    <p className="text-sm text-muted-foreground">{window.impact}</p>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      Schedule
                    </Button>
                    <Button variant="ghost" size="sm">
                      Alternative Times
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Performance */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-primary">Prediction Accuracy</h3>
              <p className="text-2xl font-bold text-primary">94.2%</p>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-success-foreground" />
              </div>
              <h3 className="font-semibold text-success">False Positives</h3>
              <p className="text-2xl font-bold text-success">5.8%</p>
              <p className="text-sm text-muted-foreground">Decreasing trend</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-warning-foreground" />
              </div>
              <h3 className="font-semibold text-warning">Model Training</h3>
              <p className="text-2xl font-bold text-warning">2 days ago</p>
              <p className="text-sm text-muted-foreground">Next: 5 days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPredictions;