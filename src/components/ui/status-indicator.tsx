type StatusType = "healthy" | "warning" | "critical" | "offline";

interface StatusIndicatorProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

export function StatusIndicator({ status, size = "md", pulse = false }: StatusIndicatorProps) {
  const getStatusColor = (status: StatusType) => {
    const colors = {
      healthy: "bg-success shadow-[0_0_10px_hsl(var(--success)_/_0.5)]",
      warning: "bg-warning shadow-[0_0_10px_hsl(var(--warning)_/_0.5)]",
      critical: "bg-danger shadow-[0_0_10px_hsl(var(--danger)_/_0.5)]",
      offline: "bg-muted-foreground"
    };
    return colors[status];
  };

  const getSizeClass = (size: string) => {
    const sizes = {
      sm: "w-2 h-2",
      md: "w-3 h-3", 
      lg: "w-4 h-4"
    };
    return sizes[size as keyof typeof sizes];
  };

  return (
    <div 
      className={`
        ${getSizeClass(size)} 
        ${getStatusColor(status)} 
        rounded-full 
        ${pulse ? "animate-pulse" : ""}
        transition-all duration-300
      `}
    />
  );
}