import { Shield, Activity, Brain, TestTube, AlertTriangle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Activity,
    title: "Real-time API Monitoring",
    description: "Monitor your API endpoints 24/7 with automatic health checks, response time tracking, and uptime monitoring.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Security Vulnerability Scanning",
    description: "Integrated OWASP ZAP scanning to detect security vulnerabilities and provide detailed risk assessments.",
    color: "text-danger"
  },
  {
    icon: Brain,
    title: "AI-Powered Predictions",
    description: "Machine learning algorithms predict potential failures and suggest optimal maintenance windows.",
    color: "text-success"
  },
  {
    icon: TestTube,
    title: "Quality Assurance Testing",
    description: "Automated test case execution with real vs expected comparisons and quality scoring.",
    color: "text-warning"
  },
  {
    icon: AlertTriangle,
    title: "Intelligent Alerts",
    description: "Smart notifications via email and dashboard for failures, anomalies, and predicted issues.",
    color: "text-primary"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive dashboards with performance metrics, trends, and actionable insights.",
    color: "text-success"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need for 
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              {" "}API Excellence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive monitoring, security, and quality assurance in one powerful platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group border-card-border hover:shadow-card transition-smooth hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-background flex items-center justify-center ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;