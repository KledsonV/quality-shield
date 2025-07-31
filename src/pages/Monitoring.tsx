import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, 
  Plus, 
  Search, 
  MoreVertical,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  Settings,
  BarChart3,
  Pause,
  Play
} from "lucide-react";

const Monitoring = () => {
  const { toast } = useToast();
  const [endpoints, setEndpoints] = useState([
    {
      id: 1,
      name: "/api/users",
      method: "GET",
      url: "https://api.example.com/users",
      status: "healthy",
      uptime: "99.9%",
      avgResponse: "127ms",
      lastCheck: "30s ago",
      requests24h: "12.5K",
      isActive: true
    },
    {
      id: 2,
      name: "/api/auth/login",
      method: "POST", 
      url: "https://api.example.com/auth/login",
      status: "warning",
      uptime: "99.2%",
      avgResponse: "245ms",
      lastCheck: "1m ago",
      requests24h: "8.2K",
      isActive: true
    },
    {
      id: 3,
      name: "/api/payments/process",
      method: "POST",
      url: "https://api.example.com/payments/process",
      status: "critical",
      uptime: "95.1%",
      avgResponse: "1.2s",
      lastCheck: "5m ago",
      requests24h: "3.1K",
      isActive: false
    },
    {
      id: 4,
      name: "/api/products",
      method: "GET",
      url: "https://api.example.com/products",
      status: "healthy",
      uptime: "99.8%",
      avgResponse: "89ms",
      lastCheck: "15s ago",
      requests24h: "6.8K",
      isActive: true
    }
  ]);

  const [newEndpoint, setNewEndpoint] = useState({
    name: "",
    method: "GET",
    url: "",
    description: ""
  });
  const [editingEndpoint, setEditingEndpoint] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const filteredEndpoints = endpoints.filter(endpoint => {
    if (filter === "healthy") return endpoint.status === "healthy";
    if (filter === "issues") return endpoint.status !== "healthy";
    return true;
  });

  const handleAddEndpoint = () => {
    if (!newEndpoint.name || !newEndpoint.url) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    
    const endpoint = {
      id: Date.now(),
      ...newEndpoint,
      status: "healthy",
      uptime: "100%",
      avgResponse: "0ms",
      lastCheck: "just now",
      requests24h: "0",
      isActive: true
    };
    
    setEndpoints([...endpoints, endpoint]);
    setNewEndpoint({ name: "", method: "GET", url: "", description: "" });
    setIsAddDialogOpen(false);
    toast({ title: "Success", description: "Endpoint added successfully" });
  };

  const handleEditEndpoint = () => {
    if (!editingEndpoint?.name || !editingEndpoint?.url) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    
    setEndpoints(endpoints.map(ep => 
      ep.id === editingEndpoint.id ? { ...ep, ...editingEndpoint } : ep
    ));
    setEditingEndpoint(null);
    setIsEditDialogOpen(false);
    toast({ title: "Success", description: "Endpoint updated successfully" });
  };

  const handleDeleteEndpoint = (id: number) => {
    setEndpoints(endpoints.filter(ep => ep.id !== id));
    toast({ title: "Success", description: "Endpoint deleted successfully" });
  };

  const toggleEndpointStatus = (id: number) => {
    setEndpoints(endpoints.map(ep => 
      ep.id === id ? { ...ep, isActive: !ep.isActive } : ep
    ));
    toast({ title: "Success", description: "Endpoint status updated" });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case "critical":
        return <XCircle className="w-4 h-4 text-danger" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-success/10 text-success border-success/20">Healthy</Badge>;
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case "critical":
        return <Badge className="bg-danger/10 text-danger border-danger/20">Critical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Monitoring</h1>
          <p className="text-muted-foreground">Monitor and manage your API endpoints</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add Endpoint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Endpoint</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Endpoint Name *</Label>
                <Input
                  id="name"
                  placeholder="/api/example"
                  value={newEndpoint.name}
                  onChange={(e) => setNewEndpoint({...newEndpoint, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="method">HTTP Method</Label>
                <Select 
                  value={newEndpoint.method} 
                  onValueChange={(value) => setNewEndpoint({...newEndpoint, method: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  placeholder="https://api.example.com/endpoint"
                  value={newEndpoint.url}
                  onChange={(e) => setNewEndpoint({...newEndpoint, url: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Optional description..."
                  value={newEndpoint.description}
                  onChange={(e) => setNewEndpoint({...newEndpoint, description: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEndpoint}>Add Endpoint</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search endpoints..." 
            className="pl-10"
          />
        </div>
        <Tabs value={filter} onValueChange={setFilter} className="w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="healthy">Healthy</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Endpoints</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Uptime</p>
                <p className="text-2xl font-bold text-success">98.7%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">156ms</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">30.6K</p>
              </div>
              <Activity className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Endpoints Table */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle>API Endpoints ({filteredEndpoints.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Response</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEndpoints.map((endpoint) => (
                <TableRow key={endpoint.id} className="hover:bg-background-secondary transition-fast">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(endpoint.status)}
                      {getStatusBadge(endpoint.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{endpoint.name}</div>
                      <div className="text-sm text-muted-foreground">{endpoint.url}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{endpoint.method}</Badge>
                  </TableCell>
                  <TableCell className="text-success font-medium">{endpoint.uptime}</TableCell>
                  <TableCell>{endpoint.avgResponse}</TableCell>
                  <TableCell>{endpoint.requests24h}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={endpoint.isActive} 
                      onCheckedChange={() => toggleEndpointStatus(endpoint.id)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem 
                            onClick={() => {
                              setEditingEndpoint(endpoint);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Configuration
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast({ title: "Analytics", description: "Loading detailed analytics..." })}>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleEndpointStatus(endpoint.id)}>
                            {endpoint.isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                            {endpoint.isActive ? "Pause" : "Resume"} Monitoring
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast({ title: "Settings", description: "Opening endpoint settings..." })}>
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-danger focus:text-danger">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Endpoint
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Endpoint</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{endpoint.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteEndpoint(endpoint.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Endpoint</DialogTitle>
          </DialogHeader>
          {editingEndpoint && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Endpoint Name *</Label>
                <Input
                  id="edit-name"
                  value={editingEndpoint.name}
                  onChange={(e) => setEditingEndpoint({...editingEndpoint, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-method">HTTP Method</Label>
                <Select 
                  value={editingEndpoint.method} 
                  onValueChange={(value) => setEditingEndpoint({...editingEndpoint, method: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-url">URL *</Label>
                <Input
                  id="edit-url"
                  value={editingEndpoint.url}
                  onChange={(e) => setEditingEndpoint({...editingEndpoint, url: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingEndpoint.description || ""}
                  onChange={(e) => setEditingEndpoint({...editingEndpoint, description: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEndpoint}>Update Endpoint</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Monitoring;