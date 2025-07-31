import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Dashboard from "@/components/Dashboard";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Dashboard />
      <PricingSection />
      
      {/* Footer */}
      <footer className="bg-background-secondary border-t border-card-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">InsightGuard</h3>
              <p className="text-muted-foreground text-sm">
                Intelligent API monitoring platform for modern applications.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-fast">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-fast">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-fast">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-fast">API Reference</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-fast">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-fast">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-fast">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-fast">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-fast">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-fast">Status Page</a></li>
                <li><a href="#" className="hover:text-foreground transition-fast">Security</a></li>
                <li><a href="#" className="hover:text-foreground transition-fast">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-card-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 InsightGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;