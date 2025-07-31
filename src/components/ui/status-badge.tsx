import { Badge } from "@/components/ui/badge";

type StatusType = "healthy" | "warning" | "critical" | "offline";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "default" | "lg";
}

export function StatusBadge({ status, size = "default" }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    const configs = {
      healthy: {
        label: "Healthy",
        className: "bg-success/10 text-success border-success/20 hover:bg-success/20"
      },
      warning: {
        label: "Warning", 
        className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20"
      },
      critical: {
        label: "Critical",
        className: "bg-danger/10 text-danger border-danger/20 hover:bg-danger/20"
      },
      offline: {
        label: "Offline",
        className: "bg-muted/20 text-muted-foreground border-muted/30 hover:bg-muted/30"
      }
    };
    return configs[status];
  };

  const config = getStatusConfig(status);
  const sizeClass = size === "sm" ? "text-xs px-2 py-1" : size === "lg" ? "text-sm px-3 py-1.5" : "text-xs";

  return (
    <Badge className={`${config.className} ${sizeClass} transition-all duration-200`}>
      {config.label}
    </Badge>
  );
}