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
import { Plus, Pencil, Trash2, UtensilsCrossed, Coffee, Cake } from "lucide-react";
import type { MenuItem, InsertMenuItem } from "@shared/schema";
import ImageUpload from "@/components/ui/image-upload";

export default function MenuManagement() {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemForm, setItemForm] = useState<Partial<InsertMenuItem>>({
    name: "",
    description: "",
    price: 0,
    ingredients: "",
    image: "",
    isAvailable: true,
    sortOrder: 0
  });
  const [ingredientInput, setIngredientInput] = useState("");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: menuItems = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu'],
  });

  const createItemMutation = useMutation({
    mutationFn: async (data: InsertMenuItem) => {
      const response = await apiRequest('POST', '/api/admin/menu', data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Menu item created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/menu'] });
      setIsAddingItem(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create menu item", variant: "destructive" });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertMenuItem> }) => {
      const response = await apiRequest('PUT', `/api/admin/menu/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Menu item updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/menu'] });
      setEditingItem(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update menu item", variant: "destructive" });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/menu/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Menu item deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/menu'] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete menu item", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setItemForm({
      name: "",
      description: "",
      price: 0,
      ingredients: "",
      image: "",
      isAvailable: true,
      sortOrder: 0
    });
    setIngredientInput("");
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      description: item.description || "",
      price: item.price,
      ingredients: item.ingredients || "",
      image: item.image || "",
      isAvailable: item.isAvailable,
      sortOrder: item.sortOrder
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateItemMutation.mutate({ id: editingItem.id, data: itemForm as InsertMenuItem });
    } else {
      createItemMutation.mutate(itemForm as InsertMenuItem);
    }
  };

  const addIngredient = () => {
    if (ingredientInput.trim()) {
      const currentIngredients = itemForm.ingredients ? itemForm.ingredients.split(', ').filter(i => i.trim()) : [];
      const newIngredients = [...currentIngredients, ingredientInput.trim()];
      setItemForm(prev => ({
        ...prev,
        ingredients: newIngredients.join(', ')
      }));
      setIngredientInput("");
    }
  };

  const removeIngredient = (index: number) => {
    const currentIngredients = itemForm.ingredients ? itemForm.ingredients.split(', ').filter(i => i.trim()) : [];
    const newIngredients = currentIngredients.filter((_, i) => i !== index);
    setItemForm(prev => ({
      ...prev,
      ingredients: newIngredients.join(', ')
    }));
  };

  const formatPrice = (price: number) => `${price.toLocaleString()} gil`;

  const allItems = menuItems || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" data-testid="menu-management">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground" data-testid="text-menu-title">Menu Management</h2>
        <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-menu-item">
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={itemForm.name}
                    onChange={(e) => setItemForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    data-testid="input-item-name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={itemForm.description || ""}
                  onChange={(e) => setItemForm(prev => ({ ...prev, description: e.target.value }))}
                  data-testid="input-item-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (gil)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={itemForm.price}
                    onChange={(e) => setItemForm(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                    required
                    data-testid="input-item-price"
                  />
                </div>
                <div>
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={itemForm.sortOrder}
                    onChange={(e) => setItemForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value) }))}
                    data-testid="input-item-sort"
                  />
                </div>
              </div>
              <ImageUpload
                value={itemForm.image || ""}
                onChange={(value) => setItemForm(prev => ({ ...prev, image: value }))}
                label="Menu Item Image"
              />
              <div>
                <Label>Ingredients</Label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    placeholder="Add ingredient"
                    data-testid="input-ingredient"
                  />
                  <Button type="button" onClick={addIngredient} data-testid="button-add-ingredient">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {itemForm.ingredients ? itemForm.ingredients.split(', ').filter(i => i.trim()).map((ingredient, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeIngredient(index)}>
                      {ingredient} ✕
                    </Badge>
                  )) : null}
                </div>
              </div>
              <Button type="submit" disabled={createItemMutation.isPending} data-testid="button-submit-item">
                {createItemMutation.isPending ? "Creating..." : "Create Menu Item"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow" data-testid={`card-menu-item-${item.id}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-foreground" data-testid={`text-item-name-${item.id}`}>
                    {item.name}
                  </CardTitle>
                  <p className="text-primary font-bold text-xl mt-1" data-testid={`text-item-price-${item.id}`}>
                    {formatPrice(item.price)}
                  </p>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditItem(item)}
                    data-testid={`button-edit-item-${item.id}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteItemMutation.mutate(item.id)}
                    disabled={deleteItemMutation.isPending}
                    data-testid={`button-delete-item-${item.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}
              {item.description && (
                <p className="text-muted-foreground text-sm mb-3" data-testid={`text-item-description-${item.id}`}>
                  {item.description}
                </p>
              )}
              {item.ingredients && item.ingredients.trim() && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-foreground mb-1">Ingredients:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.ingredients.split(', ').filter(i => i.trim()).map((ingredient, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center">
                <Badge
                  variant={item.isAvailable ? "default" : "secondary"}
                  data-testid={`badge-availability-${item.id}`}
                >
                  {item.isAvailable ? "Available" : "Unavailable"}
                </Badge>
                <span className="text-xs text-muted-foreground">Sort: {item.sortOrder}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Item Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={itemForm.name}
                  onChange={(e) => setItemForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  data-testid="input-edit-item-name"
                />
              </div>

            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={itemForm.description || ""}
                onChange={(e) => setItemForm(prev => ({ ...prev, description: e.target.value }))}
                data-testid="input-edit-item-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-price">Price (gil)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={itemForm.price}
                  onChange={(e) => setItemForm(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                  required
                  data-testid="input-edit-item-price"
                />
              </div>
              <div>
                <Label htmlFor="edit-sortOrder">Sort Order</Label>
                <Input
                  id="edit-sortOrder"
                  type="number"
                  value={itemForm.sortOrder}
                  onChange={(e) => setItemForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value) }))}
                  data-testid="input-edit-item-sort"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={itemForm.image || ""}
                onChange={(e) => setItemForm(prev => ({ ...prev, image: e.target.value }))}
                data-testid="input-edit-item-image"
              />
            </div>
            <div>
              <Label>Ingredients</Label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  placeholder="Add ingredient"
                  data-testid="input-edit-ingredient"
                />
                <Button type="button" onClick={addIngredient} data-testid="button-edit-add-ingredient">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {itemForm.ingredients ? itemForm.ingredients.split(', ').filter(i => i.trim()).map((ingredient, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeIngredient(index)}>
                    {ingredient} ✕
                  </Badge>
                )) : null}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-available"
                checked={itemForm.isAvailable}
                onChange={(e) => setItemForm(prev => ({ ...prev, isAvailable: e.target.checked }))}
                data-testid="checkbox-edit-available"
              />
              <Label htmlFor="edit-available">Available</Label>
            </div>
            <Button type="submit" disabled={updateItemMutation.isPending} data-testid="button-update-item">
              {updateItemMutation.isPending ? "Updating..." : "Update Menu Item"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
