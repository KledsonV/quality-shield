import { Outlet } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useUser } from "@/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Building2, User, LogOut, Settings, Crown } from "lucide-react";

const DashboardLayout = () => {
  const { user, isOrganization } = useUser();

  const getInitials = () => {
    if (!user) return "U";
    return `${user.firstName[0]}${user.lastName[0]}`;
  };

  const getPlanBadge = () => {
    const planColors = {
      FREE: "secondary",
      PRO: "default", 
      TEAM: "default",
      ENTERPRISE: "destructive"
    } as const;

    return (
      <Badge variant={planColors[user?.plan as keyof typeof planColors] || "secondary"}>
        {user?.plan}
      </Badge>
    );
  };

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">InsightGuard</h1>
                {isOrganization && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{user?.organizationName}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* System Status */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                System Operational
              </div>

              {/* Plan Badge */}
              {getPlanBadge()}

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={`${user?.firstName} ${user?.lastName}`} />
                      <AvatarFallback className="text-xs">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{user?.firstName} {user?.lastName}</p>
                      <p className="w-[200px] truncate text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                      <div className="flex items-center gap-2">
                        {user?.role === "OWNER" && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Crown className="w-3 h-3" />
                            Owner
                          </div>
                        )}
                        {isOrganization ? (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Building2 className="w-3 h-3" />
                            Organization
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="w-3 h-3" />
                            Individual
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-6 bg-background-secondary">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;