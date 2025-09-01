import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Pencil, Trash2, Plus, Users, UserPlus } from "lucide-react";
import type { StaffMember, AltCharacter, InsertStaffMember, InsertAltCharacter } from "@shared/schema";
import ImageUpload from "@/components/ui/image-upload";

interface StaffMemberWithAlts extends StaffMember {
  altCharacters?: AltCharacter[];
}

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [addingAltFor, setAddingAltFor] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState<Partial<InsertStaffMember>>({
    name: "",
    role: "",
    department: "management",
    bio: "",
    image: "",
    isActive: true,
    sortOrder: 0
  });
  const [altForm, setAltForm] = useState<Partial<InsertAltCharacter>>({
    name: "",
    race: "",
    server: "",
    image: "",
    sortOrder: 0
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: staffMembers = [], isLoading } = useQuery<StaffMember[]>({
    queryKey: ['/api/staff'],
  });

  const [showingAltsFor, setShowingAltsFor] = useState<string | null>(null);

  const createStaffMutation = useMutation({
    mutationFn: async (data: InsertStaffMember) => {
      const response = await apiRequest('POST', '/api/admin/staff', data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Staff member created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/staff'] });
      setIsAddingStaff(false);
      resetStaffForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create staff member", variant: "destructive" });
    },
  });

  const updateStaffMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertStaffMember> }) => {
      const response = await apiRequest('PUT', `/api/admin/staff/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Staff member updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/staff'] });
      setEditingStaff(null);
      resetStaffForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update staff member", variant: "destructive" });
    },
  });

  const deleteStaffMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/staff/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Staff member deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/staff'] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete staff member", variant: "destructive" });
    },
  });

  const createAltMutation = useMutation({
    mutationFn: async ({ staffId, data }: { staffId: string; data: InsertAltCharacter }) => {
      const response = await apiRequest('POST', `/api/admin/staff/${staffId}/alts`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Alt character added successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/staff'] });
      setAddingAltFor(null);
      resetAltForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add alt character", variant: "destructive" });
    },
  });

  const deleteAltMutation = useMutation({
    mutationFn: async (altId: string) => {
      await apiRequest('DELETE', `/api/admin/alts/${altId}`);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Alt character deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/staff'] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete alt character", variant: "destructive" });
    },
  });

  const resetStaffForm = () => {
    setStaffForm({
      name: "",
      role: "",
      department: "management",
      bio: "",
      image: "",
      isActive: true,
      sortOrder: 0
    });
  };

  const resetAltForm = () => {
    setAltForm({
      name: "",
      race: "",
      server: "",
      image: "",
      sortOrder: 0
    });
  };

  const handleEditStaff = (staff: StaffMember) => {
    setEditingStaff(staff);
    setStaffForm({
      name: staff.name,
      role: staff.role,
      department: staff.department,
      bio: staff.bio || "",
      image: staff.image || "",
      isActive: staff.isActive,
      sortOrder: staff.sortOrder
    });
  };

  const handleSubmitStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      updateStaffMutation.mutate({ id: editingStaff.id, data: staffForm as InsertStaffMember });
    } else {
      createStaffMutation.mutate(staffForm as InsertStaffMember);
    }
  };


const filteredStaff = staffMembers?.filter(staff => {
  return staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         staff.role.toLowerCase().includes(searchTerm.toLowerCase());
}) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading staff...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" data-testid="staff-management">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground" data-testid="text-staff-title">Staff Management</h2>
        <Dialog open={isAddingStaff} onOpenChange={setIsAddingStaff}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-staff">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitStaff} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={staffForm.name}
                  onChange={(e) => setStaffForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  data-testid="input-staff-name"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={staffForm.role}
                  onChange={(e) => setStaffForm(prev => ({ ...prev, role: e.target.value }))}
                  required
                  data-testid="input-staff-role"
                />
              </div>
              <div>
                <Label htmlFor="department">Department (Auto-assigned by Role)</Label>
                <Input
                  id="department"
                  value={staffForm.department || "management"}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={staffForm.bio || ""}
                  onChange={(e) => setStaffForm(prev => ({ ...prev, bio: e.target.value }))}
                  data-testid="input-staff-bio"
                />
              </div>
              <ImageUpload
                value={staffForm.image || ""}
                onChange={(value) => setStaffForm(prev => ({ ...prev, image: value }))}
                label="Character Image"
              />
              <div>
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={staffForm.sortOrder}
                  onChange={(e) => setStaffForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value) }))}
                  data-testid="input-staff-sort"
                />
              </div>
              <Button type="submit" disabled={createStaffMutation.isPending} data-testid="button-submit-staff">
                {createStaffMutation.isPending ? "Creating..." : "Create Staff Member"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
              data-testid="input-search-staff"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="table-staff">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Character</th>
                  <th className="text-left p-4 font-semibold text-foreground">Role</th>
                  <th className="text-left p-4 font-semibold text-foreground">Department</th>
                  <th className="text-left p-4 font-semibold text-foreground">Alt Characters</th>
                  <th className="text-left p-4 font-semibold text-foreground">Status</th>
                  <th className="text-left p-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="border-b border-border" data-testid={`row-staff-${staff.id}`}>
                    <td className="p-4">
                      <div className="flex items-center">
                        <img 
                          src={staff.image || "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                          alt={staff.name} 
                          className="w-10 h-10 rounded-full mr-3 object-cover" 
                        />
                        <div>
                          <p className="font-semibold text-foreground" data-testid={`text-staff-name-${staff.id}`}>{staff.name}</p>
                          <p className="text-sm text-muted-foreground">Sort: {staff.sortOrder}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-foreground" data-testid={`text-staff-role-${staff.id}`}>{staff.role}</td>
                    <td className="p-4 text-foreground" data-testid={`text-staff-department-${staff.id}`}>{staff.department}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setAddingAltFor(staff.id)}
                          data-testid={`button-add-alt-${staff.id}`}
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          Add Alt
                        </Button>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={staff.isActive ? "default" : "secondary"}
                        data-testid={`badge-status-${staff.id}`}
                      >
                        {staff.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditStaff(staff)}
                          data-testid={`button-edit-${staff.id}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteStaffMutation.mutate(staff.id)}
                          disabled={deleteStaffMutation.isPending}
                          data-testid={`button-delete-${staff.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Staff Dialog */}
      <Dialog open={!!editingStaff} onOpenChange={() => setEditingStaff(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitStaff} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={staffForm.name}
                onChange={(e) => setStaffForm(prev => ({ ...prev, name: e.target.value }))}
                required
                data-testid="input-edit-staff-name"
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Role</Label>
              <Input
                id="edit-role"
                value={staffForm.role}
                onChange={(e) => setStaffForm(prev => ({ ...prev, role: e.target.value }))}
                required
                data-testid="input-edit-staff-role"
              />
            </div>
            <div>
              <Label htmlFor="edit-department">Department</Label>
              <Select value={staffForm.department} onValueChange={(value) => setStaffForm(prev => ({ ...prev, department: value }))}>
                <SelectTrigger data-testid="select-edit-staff-department">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-bio">Bio</Label>
              <Textarea
                id="edit-bio"
                value={staffForm.bio || ""}
                onChange={(e) => setStaffForm(prev => ({ ...prev, bio: e.target.value }))}
                data-testid="input-edit-staff-bio"
              />
            </div>
            <td className="p-4">
              <div className="flex items-center space-x-2">
                {(staff as any).altCharacters?.length > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowingAltsFor(showingAltsFor === staff.id ? null : staff.id)}
                    data-testid={`button-show-alts-${staff.id}`}
                  >
                    <Users className="w-4 h-4 mr-1" />
                    {(staff as any).altCharacters?.length || 0} Alts
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setAddingAltFor(staff.id)}
                  data-testid={`button-add-alt-${staff.id}`}
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
              </div>
            </td>
            <div>
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={staffForm.image || ""}
                onChange={(e) => setStaffForm(prev => ({ ...prev, image: e.target.value }))}
                data-testid="input-edit-staff-image"
              />
            </div>
            <Button type="submit" disabled={updateStaffMutation.isPending} data-testid="button-update-staff">
              {updateStaffMutation.isPending ? "Updating..." : "Update Staff Member"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Alt Character Dialog */}
      <Dialog open={!!addingAltFor} onOpenChange={() => setAddingAltFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Alt Character</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitAlt} className="space-y-4">
            <div>
              <Label htmlFor="alt-name">Character Name</Label>
              <Input
                id="alt-name"
                value={altForm.name}
                onChange={(e) => setAltForm(prev => ({ ...prev, name: e.target.value }))}
                required
                data-testid="input-alt-name"
              />
            </div>
            <div>
              <Label htmlFor="alt-race">Race</Label>
              <Input
                id="alt-race"
                value={altForm.race}
                onChange={(e) => setAltForm(prev => ({ ...prev, race: e.target.value }))}
                data-testid="input-alt-race"
              />
            </div>
            <div>
              <Label htmlFor="alt-server">Server</Label>
              <Input
                id="alt-server"
                value={altForm.server || ""}
                onChange={(e) => setAltForm(prev => ({ ...prev, server: e.target.value }))}
                data-testid="input-alt-server"
              />
            </div>
            <div>
              <Label htmlFor="alt-image">Image URL</Label>
              <Input
                id="alt-image"
                value={altForm.image || ""}
                onChange={(e) => setAltForm(prev => ({ ...prev, image: e.target.value }))}
                data-testid="input-alt-image"
              />
            </div>
            <Button type="submit" disabled={createAltMutation.isPending} data-testid="button-submit-alt">
              {createAltMutation.isPending ? "Adding..." : "Add Alt Character"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
