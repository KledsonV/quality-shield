import { Outlet } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">InsightGuard Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                System Operational
              </div>
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