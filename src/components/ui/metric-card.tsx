import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  trend?: "up" | "down" | "neutral";
}

export function MetricCard({ title, value, change, icon: Icon, color, trend = "neutral" }: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-success";
      case "down": return "text-danger";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="border-card-border hover:shadow-card hover-glow transition-smooth gradient-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{title}</p>
            <p className="text-3xl font-bold mb-1">{value}</p>
            <p className={`text-sm ${getTrendColor()}`}>{change}</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 gradient-glow opacity-20 rounded-full"></div>
            <Icon className={`w-8 h-8 ${color} relative z-10`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}