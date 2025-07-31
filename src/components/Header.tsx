import { Button } from "@/components/ui/button";
import { Shield, BarChart3, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full border-b border-card-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">InsightGuard</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-fast">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-fast">
              Pricing
            </a>
            <a href="#docs" className="text-muted-foreground hover:text-foreground transition-fast">
              Docs
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button variant="hero" size="sm">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;