import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/Overview";
import Monitoring from "./pages/Monitoring";
import Security from "./pages/Security";
import Quality from "./pages/Quality";
import AIPredictions from "./pages/AIPredictions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Index />} />
          
          {/* Dashboard routes with sidebar */}
          <Route path="/dashboard" element={
            <SidebarProvider>
              <DashboardLayout />
            </SidebarProvider>
          }>
            <Route index element={<Overview />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="security" element={<Security />} />
            <Route path="quality" element={<Quality />} />
            <Route path="ai-predictions" element={<AIPredictions />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
