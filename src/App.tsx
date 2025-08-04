import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./hooks/useUser";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ChoosePlan from "./pages/ChoosePlan";
import DashboardLayout from "./layouts/DashboardLayout";
import Analytics from "./pages/Analytics";
import Overview from "./pages/Overview";
import Monitoring from "./pages/Monitoring";
import Security from "./pages/Security";
import Quality from "./pages/Quality";
import AIPredictions from "./pages/AIPredictions";
import Settings from "./pages/Settings";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Index />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/choose-plan" element={<ChoosePlan />} />
          
          {/* Dashboard routes with sidebar */}
          <Route path="/dashboard" element={
            <SidebarProvider>
              <DashboardLayout />
            </SidebarProvider>
          }>
            <Route index element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="security" element={<Security />} />
            <Route path="quality" element={<Quality />} />
            <Route path="ai-predictions" element={<AIPredictions />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
