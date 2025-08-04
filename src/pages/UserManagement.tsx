import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/useUser";
import { 
  UserPlus, 
  Mail, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Shield, 
  Users, 
  Crown,
  Eye,
  Search,
  Filter,
  UserCheck,
  Building2
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data
const mockUsers = [
  {
    id: "1",
    email: "admin@acmecorp.com",
    firstName: "John",
    lastName: "Doe",
    role: "OWNER",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    avatar: null
  },
  {
    id: "2", 
    email: "manager@acmecorp.com",
    firstName: "Jane",
    lastName: "Smith",
    role: "ADMIN",
    status: "active",
    lastLogin: "2024-01-14T15:45:00Z",
    createdAt: "2024-01-02T00:00:00Z",
    avatar: null
  },
  {
    id: "3",
    email: "dev@acmecorp.com",
    firstName: "Bob",
    lastName: "Johnson",
    role: "MEMBER",
    status: "active",
    lastLogin: "2024-01-13T09:15:00Z",
    createdAt: "2024-01-03T00:00:00Z",
    avatar: null
  },
  {
    id: "4",
    email: "intern@acmecorp.com",
    firstName: "Alice",
    lastName: "Wilson",
    role: "VIEWER",
    status: "pending",
    lastLogin: null,
    createdAt: "2024-01-10T00:00:00Z",
    avatar: null
  }
];

const roles = [
  { value: "OWNER", label: "Owner", icon: Crown, color: "destructive" },
  { value: "ADMIN", label: "Admin", icon: Shield, color: "secondary" },
  { value: "MEMBER", label: "Member", icon: Users, color: "default" },
  { value: "VIEWER", label: "Viewer", icon: Eye, color: "outline" }
];

const UserManagement = () => {
  const { isOrganization } = useUser();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "MEMBER"
  });
  const [joinRequest, setJoinRequest] = useState({
    email: "",
    firstName: "",
    lastName: "",
    organizationCode: ""
  });

  const getRoleIcon = (role: string) => {
    const roleData = roles.find(r => r.value === role);
    return roleData?.icon || Users;
  };

  const getRoleColor = (role: string) => {
    const roleData = roles.find(r => r.value === role);
    return roleData?.color || "default";
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleJoinOrganization = () => {
    if (!joinRequest.email || !joinRequest.firstName || !joinRequest.lastName || !joinRequest.organizationCode) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    // Mock organization code validation
    if (joinRequest.organizationCode !== "ACME2024") {
      toast({
        title: "Erro",
        description: "Código da organização inválido",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: String(users.length + 1),
      email: joinRequest.email,
      firstName: joinRequest.firstName,
      lastName: joinRequest.lastName,
      role: "MEMBER",
      status: "pending",
      lastLogin: null,
      createdAt: new Date().toISOString(),
      avatar: null
    };

    setUsers([...users, user]);
    setJoinRequest({ email: "", firstName: "", lastName: "", organizationCode: "" });
    setIsJoinDialogOpen(false);
    
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação para ingressar na organização foi enviada para aprovação",
    });
  };

  const handleCreateUser = () => {
    if (!newUser.email || !newUser.firstName || !newUser.lastName) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: String(users.length + 1),
      ...newUser,
      status: "pending",
      lastLogin: null,
      createdAt: new Date().toISOString(),
      avatar: null
    };

    setUsers([...users, user]);
    setNewUser({ email: "", firstName: "", lastName: "", role: "MEMBER" });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Usuário criado",
      description: `Convite enviado para ${user.email}`,
    });
  };

  const handleUpdateUser = (userId: string, updates: any) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
    setEditingUser(null);
    
    toast({
      title: "Usuário atualizado",
      description: "As alterações foram salvas com sucesso",
    });
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user?.role === "OWNER") {
      toast({
        title: "Erro",
        description: "Não é possível remover o proprietário da organização",
        variant: "destructive"
      });
      return;
    }

    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido da organização",
    });
  };

  const handleResendInvite = (userId: string) => {
    const user = users.find(u => u.id === userId);
    toast({
      title: "Convite reenviado",
      description: `Novo convite enviado para ${user?.email}`,
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Nunca";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: "Ativo", variant: "default" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
      inactive: { label: "Inativo", variant: "outline" as const }
    };
    
    const statusData = statusMap[status as keyof typeof statusMap] || statusMap.inactive;
    return <Badge variant={statusData.variant}>{statusData.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {isOrganization ? "Gerenciamento de Usuários" : "Ingressar em Organização"}
          </h2>
          <p className="text-muted-foreground">
            {isOrganization 
              ? "Gerencie os membros da sua organização e suas permissões"
              : "Solicite acesso para ingressar em uma organização existente"
            }
          </p>
        </div>
        
        <div className="flex gap-2">
          {/* Join Organization Button (for individual users) */}
          {!isOrganization && (
          <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Ingressar em Organização
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ingressar em Organização</DialogTitle>
                <DialogDescription>
                  Solicite acesso para ingressar em uma organização existente
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="joinFirstName">Nome</Label>
                    <Input
                      id="joinFirstName"
                      value={joinRequest.firstName}
                      onChange={(e) => setJoinRequest({ ...joinRequest, firstName: e.target.value })}
                      placeholder="Nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinLastName">Sobrenome</Label>
                    <Input
                      id="joinLastName"
                      value={joinRequest.lastName}
                      onChange={(e) => setJoinRequest({ ...joinRequest, lastName: e.target.value })}
                      placeholder="Sobrenome"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="joinEmail">Email</Label>
                  <Input
                    id="joinEmail"
                    type="email"
                    value={joinRequest.email}
                    onChange={(e) => setJoinRequest({ ...joinRequest, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="orgCode">Código da Organização</Label>
                  <Input
                    id="orgCode"
                    value={joinRequest.organizationCode}
                    onChange={(e) => setJoinRequest({ ...joinRequest, organizationCode: e.target.value })}
                    placeholder="Ex: ACME2024"
                  />
                  <p className="text-xs text-muted-foreground">
                    Solicite o código da organização ao administrador
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsJoinDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleJoinOrganization}>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Solicitar Acesso
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          )}

          {/* Create User Actions (for organizations) */}
          {isOrganization && (
            <div className="flex gap-2">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Criar Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Novo Usuário</DialogTitle>
                    <DialogDescription>
                      Crie um novo usuário diretamente na organização
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="createFirstName">Nome</Label>
                        <Input
                          id="createFirstName"
                          value={newUser.firstName}
                          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                          placeholder="Nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="createLastName">Sobrenome</Label>
                        <Input
                          id="createLastName"
                          value={newUser.lastName}
                          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                          placeholder="Sobrenome"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="createEmail">Email</Label>
                      <Input
                        id="createEmail"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="createRole">Função</Label>
                      <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.filter(role => role.value !== "OWNER").map((role) => {
                            const Icon = role.icon;
                            return (
                              <SelectItem key={role.value} value={role.value}>
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4" />
                                  {role.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => {
                      const user = {
                        id: String(users.length + 1),
                        ...newUser,
                        status: "active",
                        lastLogin: new Date().toISOString(),
                        createdAt: new Date().toISOString(),
                        avatar: null
                      };
                      setUsers([...users, user]);
                      setNewUser({ email: "", firstName: "", lastName: "", role: "MEMBER" });
                      setIsCreateDialogOpen(false);
                      toast({
                        title: "Usuário criado",
                        description: `Usuário ${user.firstName} ${user.lastName} foi criado com sucesso`,
                      });
                    }}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Criar Usuário
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Convidar por Email
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Convidar Novo Usuário</DialogTitle>
                    <DialogDescription>
                      Envie um convite para adicionar um novo membro à organização
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="inviteFirstName">Nome</Label>
                        <Input
                          id="inviteFirstName"
                          value={newUser.firstName}
                          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                          placeholder="Nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inviteLastName">Sobrenome</Label>
                        <Input
                          id="inviteLastName"
                          value={newUser.lastName}
                          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                          placeholder="Sobrenome"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inviteEmail">Email</Label>
                      <Input
                        id="inviteEmail"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inviteRole">Função</Label>
                      <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.filter(role => role.value !== "OWNER").map((role) => {
                            const Icon = role.icon;
                            return (
                              <SelectItem key={role.value} value={role.value}>
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4" />
                                  {role.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateUser}>
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar Convite
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* Content based on user type */}
      {isOrganization ? (
      <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <div className="w-2 h-2 bg-success rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === "active").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Convites Pendentes</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => ["OWNER", "ADMIN"].includes(u.role)).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Todas as funções" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as funções</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Lista de todos os usuários da organização
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleColor(user.role) as any} className="flex items-center gap-1 w-fit">
                        <RoleIcon className="w-3 h-3" />
                        {roles.find(r => r.value === user.role)?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(user.lastLogin)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setEditingUser(user)}
                            disabled={user.role === "OWNER"}
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          
                          {user.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleResendInvite(user.id)}>
                              <Mail className="w-4 h-4 mr-2" />
                              Reenviar Convite
                            </DropdownMenuItem>
                          )}
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                disabled={user.role === "OWNER"}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remover
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remover Usuário</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja remover {user.firstName} {user.lastName} da organização?
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Remover
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      {editingUser && (
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Usuário</DialogTitle>
              <DialogDescription>
                Altere as informações e permissões do usuário
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    value={editingUser.firstName}
                    onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sobrenome</Label>
                  <Input
                    value={editingUser.lastName}
                    onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <Label>Função</Label>
                <Select 
                  value={editingUser.role} 
                  onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                  disabled={editingUser.role === "OWNER"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {role.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingUser(null)}>
                Cancelar
              </Button>
              <Button onClick={() => handleUpdateUser(editingUser.id, editingUser)}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      </>
      ) : (
        /* Individual User View */
        <Card>
          <CardHeader>
            <CardTitle>Ingressar em uma Organização</CardTitle>
            <CardDescription>
              Como usuário individual, você pode solicitar acesso para ingressar em uma organização existente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Solicite acesso a uma organização</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Para ingressar em uma organização, você precisa do código de convite fornecido pelo administrador.
                Clique no botão acima para enviar sua solicitação.
              </p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Benefícios de ingressar em uma organização:</strong></p>
                <ul className="list-disc list-inside space-y-1 max-w-md mx-auto">
                  <li>Monitoramento colaborativo de endpoints</li>
                  <li>Compartilhamento de alertas e relatórios</li>
                  <li>Gestão centralizada de segurança</li>
                  <li>Limites de uso expandidos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;