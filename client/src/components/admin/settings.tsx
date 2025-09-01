import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Pencil, Trash2, Settings as SettingsIcon, Users, Globe } from "lucide-react";
import type { User, InsertUser } from "@shared/schema";

export default function Settings() {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState<Partial<InsertUser>>({
    username: "",
    password: "",
    role: "admin"
  });
  const [siteSettings, setSiteSettings] = useState({
    title: "The Golden Chocobo",
    description: "An elegant FFXIV venue where adventurers gather for exceptional experiences.",
    serverInfo: "Crystal - Zalera",
    location: "Mist, Ward 15, Plot 42",
    hours: "Friday - Sunday: 8:00 PM - 12:00 AM EST"
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  // Note: In a real implementation, you'd have API endpoints for managing users and site settings
  // For now, we'll show a UI structure with mock data

  const createUserMutation = useMutation({
    mutationFn: async (data: InsertUser) => {
      // This would be a real API call to create a user
      const response = await apiRequest('POST', '/api/admin/users', data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "User created successfully" });
      setIsAddingUser(false);
      resetUserForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create user", variant: "destructive" });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertUser> }) => {
      // This would be a real API call to update a user
      const response = await apiRequest('PUT', `/api/admin/users/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "User updated successfully" });
      setEditingUser(null);
      resetUserForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update user", variant: "destructive" });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      // This would be a real API call to delete a user
      await apiRequest('DELETE', `/api/admin/users/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "User deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete user", variant: "destructive" });
    },
  });

  const updateSiteSettingsMutation = useMutation({
    mutationFn: async (settings: typeof siteSettings) => {
      // This would be a real API call to update site settings
      const response = await apiRequest('PUT', '/api/admin/settings', settings);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Site settings updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update site settings", variant: "destructive" });
    },
  });

  const resetUserForm = () => {
    setUserForm({
      username: "",
      password: "",
      role: "admin"
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserForm({
      username: user.username,
      password: "", // Don't populate password for editing
      role: user.role
    });
  };

  const handleSubmitUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUserMutation.mutate({ id: editingUser.id, data: userForm as InsertUser });
    } else {
      createUserMutation.mutate(userForm as InsertUser);
    }
  };

  const handleSubmitSiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettingsMutation.mutate(siteSettings);
  };

  // Mock users data - in a real app this would come from an API
  const mockUsers: User[] = [
    {
      id: "1",
      username: "admin",
      password: "",
      role: "admin",
      createdAt: new Date()
    }
  ];

  return (
    <div className="p-6 space-y-6" data-testid="settings">
      <div className="flex items-center mb-6">
        <SettingsIcon className="w-6 h-6 text-primary mr-3" />
        <h2 className="font-display text-2xl font-bold text-foreground" data-testid="text-settings-title">Settings</h2>
      </div>

      {/* Site Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <Globe className="w-5 h-5 text-primary mr-2" />
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitSiteSettings} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="site-title">Site Title</Label>
                <Input
                  id="site-title"
                  value={siteSettings.title}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, title: e.target.value }))}
                  data-testid="input-site-title"
                />
              </div>
              <div>
                <Label htmlFor="server-info">Server Information</Label>
                <Input
                  id="server-info"
                  value={siteSettings.serverInfo}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, serverInfo: e.target.value }))}
                  data-testid="input-server-info"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="site-description">Site Description</Label>
              <Textarea
                id="site-description"
                value={siteSettings.description}
                onChange={(e) => setSiteSettings(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                data-testid="input-site-description"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={siteSettings.location}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, location: e.target.value }))}
                  data-testid="input-location"
                />
              </div>
              <div>
                <Label htmlFor="hours">Operating Hours</Label>
                <Input
                  id="hours"
                  value={siteSettings.hours}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, hours: e.target.value }))}
                  data-testid="input-hours"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={updateSiteSettingsMutation.isPending}
              data-testid="button-save-settings"
            >
              {updateSiteSettingsMutation.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Admin Users */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-primary mr-2" />
            <CardTitle>Admin Users</CardTitle>
          </div>
          <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
            <DialogTrigger asChild>
              <Button size="sm" data-testid="button-add-user">
                <Plus className="w-4 h-4 mr-2" />
                Add Admin User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admin User</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitUser} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={userForm.username}
                    onChange={(e) => setUserForm(prev => ({ ...prev, username: e.target.value }))}
                    required
                    data-testid="input-user-username"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={userForm.password}
                    onChange={(e) => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                    required
                    data-testid="input-user-password"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={userForm.role}
                    onChange={(e) => setUserForm(prev => ({ ...prev, role: e.target.value }))}
                    required
                    data-testid="input-user-role"
                  />
                </div>
                <Button type="submit" disabled={createUserMutation.isPending} data-testid="button-submit-user">
                  {createUserMutation.isPending ? "Creating..." : "Create User"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex justify-between items-center p-3 bg-muted rounded-lg" data-testid={`user-row-${user.id}`}>
                <div>
                  <p className="font-semibold text-foreground" data-testid={`text-user-username-${user.id}`}>{user.username}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" data-testid={`badge-user-role-${user.id}`}>{user.role}</Badge>
                    {user.id === currentUser?.id && (
                      <Badge variant="outline">Current User</Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditUser(user)}
                    data-testid={`button-edit-user-${user.id}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  {user.id !== currentUser?.id && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteUserMutation.mutate(user.id)}
                      disabled={deleteUserMutation.isPending}
                      data-testid={`button-delete-user-${user.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitUser} className="space-y-4">
            <div>
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={userForm.username}
                onChange={(e) => setUserForm(prev => ({ ...prev, username: e.target.value }))}
                required
                data-testid="input-edit-user-username"
              />
            </div>
            <div>
              <Label htmlFor="edit-password">New Password (leave blank to keep current)</Label>
              <Input
                id="edit-password"
                type="password"
                value={userForm.password}
                onChange={(e) => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                data-testid="input-edit-user-password"
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Role</Label>
              <Input
                id="edit-role"
                value={userForm.role}
                onChange={(e) => setUserForm(prev => ({ ...prev, role: e.target.value }))}
                required
                data-testid="input-edit-user-role"
              />
            </div>
            <Button type="submit" disabled={updateUserMutation.isPending} data-testid="button-update-user">
              {updateUserMutation.isPending ? "Updating..." : "Update User"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground">Application Version</p>
              <p className="text-muted-foreground">1.0.0</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Environment</p>
              <p className="text-muted-foreground">Development</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Database Status</p>
              <Badge variant="default">Connected</Badge>
            </div>
            <div>
              <p className="font-medium text-foreground">Last Backup</p>
              <p className="text-muted-foreground">No backups configured</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
