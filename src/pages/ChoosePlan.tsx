import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Shield, Zap, Crown } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    icon: Shield,
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for getting started",
    features: [
      "5 API endpoints",
      "Basic monitoring",
      "7 days history",
      "Email alerts",
      "Community support"
    ],
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
    popular: false,
    limitations: "Limited features"
  },
  {
    id: "pro",
    name: "Pro",
    icon: Zap,
    price: { monthly: 59, yearly: 590 },
    description: "For growing teams",
    features: [
      "50 API endpoints",
      "AI predictions",
      "Security scanning",
      "100 test cases",
      "30 days history",
      "Priority support",
      "Custom alerts",
      "Status pages"
    ],
    buttonText: "Start Pro Trial",
    buttonVariant: "default" as const,
    popular: true,
    limitations: null
  },
  {
    id: "enterprise",
    name: "Enterprise", 
    icon: Crown,
    price: { monthly: 179, yearly: 1790 },
    description: "For large organizations",
    features: [
      "Unlimited endpoints",
      "Advanced AI insights",
      "Full security suite",
      "Unlimited tests",
      "1 year history",
      "CI/CD integration",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "White-label options"
    ],
    buttonText: "Start Enterprise Trial",
    buttonVariant: "default" as const,
    popular: false,
    limitations: null
  }
];

const ChoosePlan = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    setIsLoading(true);

    try {
      // TODO: Implement actual plan selection logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Plan selected!",
        description: `Welcome to InsightGuard ${plans.find(p => p.id === planId)?.name}!`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to select plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  const formatPrice = (price: { monthly: number; yearly: number }) => {
    if (price.monthly === 0) return "R$ 0";
    const amount = isYearly ? price.yearly : price.monthly;
    return `R$ ${amount}`;
  };

  const getSavings = (price: { monthly: number; yearly: number }) => {
    if (price.monthly === 0) return null;
    const yearlyTotal = price.monthly * 12;
    const savings = yearlyTotal - price.yearly;
    const percentage = Math.round((savings / yearlyTotal) * 100);
    return { savings, percentage };
  };

  return (
    <div className="min-h-screen bg-gradient-premium">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold">InsightGuard</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">
            Choose Your 
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              {" "}Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start your API monitoring journey with the right plan for your needs. 
            All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className={!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className={isYearly ? "text-foreground font-medium" : "text-muted-foreground"}>
              Yearly
            </Label>
            {isYearly && (
              <Badge className="bg-success/10 text-success border-success/20 ml-2">
                Save up to 17%
              </Badge>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const savings = getSavings(plan.price);
            
            return (
              <Card 
                key={plan.id} 
                className={`relative border-card-border transition-smooth hover:shadow-card hover-glow ${
                  plan.popular ? 'ring-2 ring-primary/20 shadow-primary' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
                    {plan.price.monthly > 0 && (
                      <span className="text-muted-foreground">
                        /{isYearly ? "year" : "month"}
                      </span>
                    )}
                    {isYearly && savings && (
                      <div className="text-sm text-success mt-1">
                        Save R$ {savings.savings} ({savings.percentage}%)
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations && (
                    <p className="text-xs text-muted-foreground text-center">
                      {plan.limitations}
                    </p>
                  )}
                  
                  <Button 
                    variant={plan.buttonVariant} 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isLoading && selectedPlan === plan.id}
                  >
                    {isLoading && selectedPlan === plan.id 
                      ? "Setting up..." 
                      : plan.buttonText
                    }
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
          <p className="text-sm text-muted-foreground">
            Need a custom solution? <a href="#contact" className="text-primary hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;