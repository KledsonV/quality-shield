import { 
  LayoutDashboard, 
  Activity, 
  Shield, 
  TestTube, 
  Brain, 
  Settings 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { 
    title: "Overview", 
    url: "/dashboard", 
    icon: LayoutDashboard 
  },
  { 
    title: "Monitoring", 
    url: "/dashboard/monitoring", 
    icon: Activity 
  },
  { 
    title: "Security", 
    url: "/dashboard/security", 
    icon: Shield 
  },
  { 
    title: "Quality", 
    url: "/dashboard/quality", 
    icon: TestTube 
  },
  { 
    title: "AI Predictions", 
    url: "/dashboard/ai-predictions", 
    icon: Brain 
  },
  { 
    title: "Settings", 
    url: "/dashboard/settings", 
    icon: Settings 
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return currentPath === "/dashboard" || currentPath === "/dashboard/";
    }
    return currentPath === path;
  };

  const getNavClassName = (path: string) => {
    return isActive(path) 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Logo area */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <h2 className="text-lg font-bold text-sidebar-foreground">InsightGuard</h2>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/dashboard"}
                      className={() => getNavClassName(item.url)}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}