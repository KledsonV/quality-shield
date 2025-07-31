import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Brain,
  Mail,
  Smartphone,
  Globe,
  Database,
  Key
} from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-4">
          <Card className="border-card-border">
            <CardContent className="p-4">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Configuration
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Database className="w-4 h-4 mr-2" />
                  API Settings
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="TechCorp Inc." />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select className="w-full p-2 border border-input rounded-md">
                  <option>UTC-3 (America/Sao_Paulo)</option>
                  <option>UTC+0 (UTC)</option>
                  <option>UTC-5 (America/New_York)</option>
                  <option>UTC-8 (America/Los_Angeles)</option>
                </select>
              </div>
              <Button>Save Profile</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Slack Integration</p>
                      <p className="text-sm text-muted-foreground">Send alerts to Slack</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-card-border">
                <h4 className="font-medium">Alert Types</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">API Failures</p>
                      <p className="text-sm text-muted-foreground">When endpoints fail or timeout</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-muted-foreground">Vulnerability discoveries</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">AI Predictions</p>
                      <p className="text-sm text-muted-foreground">Predictive failure alerts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Quality Issues</p>
                      <p className="text-sm text-muted-foreground">Test failures and quality drops</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-card-border">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">API Keys</p>
                  <p className="text-sm text-muted-foreground">Manage your API access keys</p>
                </div>
                <Button variant="outline">
                  <Key className="w-4 h-4 mr-2" />
                  Manage Keys
                </Button>
              </div>
              
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          {/* AI Configuration */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Predictive Analysis</p>
                  <p className="text-sm text-muted-foreground">Enable AI-powered failure predictions</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Learning</p>
                  <p className="text-sm text-muted-foreground">Continuously improve predictions</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div>
                <Label htmlFor="sensitivityLevel">Prediction Sensitivity</Label>
                <select className="w-full p-2 border border-input rounded-md">
                  <option>Conservative (fewer alerts)</option>
                  <option>Balanced (recommended)</option>
                  <option>Aggressive (more alerts)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="predictionWindow">Prediction Window</Label>
                <select className="w-full p-2 border border-input rounded-md">
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>24 hours</option>
                  <option>7 days</option>
                </select>
              </div>
              
              <Button>Save AI Settings</Button>
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                API Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="defaultTimeout">Default Request Timeout (seconds)</Label>
                <Input id="defaultTimeout" type="number" defaultValue="30" />
              </div>
              
              <div>
                <Label htmlFor="checkInterval">Health Check Interval (minutes)</Label>
                <Input id="checkInterval" type="number" defaultValue="5" />
              </div>
              
              <div>
                <Label htmlFor="retryAttempts">Retry Attempts</Label>
                <Input id="retryAttempts" type="number" defaultValue="3" />
              </div>
              
              <div>
                <Label htmlFor="webhookUrl">Webhook URL (optional)</Label>
                <Input id="webhookUrl" placeholder="https://your-webhook-url.com/alerts" />
              </div>
              
              <div>
                <Label htmlFor="customHeaders">Custom Headers (JSON)</Label>
                <Textarea 
                  id="customHeaders" 
                  placeholder='{"Authorization": "Bearer token", "X-API-Key": "key"}'
                  rows={3}
                />
              </div>
              
              <Button>Save API Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;