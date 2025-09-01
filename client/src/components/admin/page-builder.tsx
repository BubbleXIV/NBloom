import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import ComponentPalette from "@/components/page-builder/component-palette";
import EditableComponent from "@/components/page-builder/editable-component";
import type { Page, PageContent, PageComponent } from "@/types";

export default function PageBuilder() {
  const [selectedPageId, setSelectedPageId] = useState<string>("");
  const [pageContent, setPageContent] = useState<PageContent>({ components: [] });
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: pages } = useQuery<Page[]>({
    queryKey: ['/api/admin/pages'],
  });

  const { data: selectedPage } = useQuery<Page>({
    queryKey: ['/api/admin/pages', selectedPageId],
    enabled: !!selectedPageId,
  });

  const updatePageMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: PageContent }) => {
      const response = await apiRequest('PUT', `/api/admin/pages/${id}`, { content });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Page updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pages'] });
    },
  });

  const createPageMutation = useMutation({
    mutationFn: async (pageData: { title: string; slug: string; content: PageContent }) => {
      const response = await apiRequest('POST', '/api/admin/pages', pageData);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Page created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pages'] });
    },
  });

  const handleSaveDraft = () => {
    if (!selectedPageId) return;
    updatePageMutation.mutate({ id: selectedPageId, content: pageContent });
  };

  const handlePublish = () => {
    if (!selectedPageId) return;
    updatePageMutation.mutate({ 
      id: selectedPageId, 
      content: pageContent 
    });
  };

const addComponent = (component: PageComponent) => {
  setPageContent(prev => ({
    ...prev,
    components: [...prev.components, {
      ...component,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` // More unique IDs
    }]
  }));
};

  const updateComponent = (id: string, updates: Partial<PageComponent>) => {
    setPageContent(prev => ({
      ...prev,
      components: prev.components.map(comp => 
        comp.id === id ? { ...comp, ...updates } : comp
      )
    }));
  };

  const deleteComponent = (id: string) => {
    setPageContent(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== id)
    }));
  };

  const moveComponent = (fromIndex: number, toIndex: number) => {
    setPageContent(prev => {
      const newComponents = [...prev.components];
      const [moved] = newComponents.splice(fromIndex, 1);
      newComponents.splice(toIndex, 0, moved);
      return { ...prev, components: newComponents };
    });
  };

  return (
    <div className="h-full flex" data-testid="page-builder">
      {/* Component Palette */}
      <div className="w-80 component-palette border-r border-border overflow-y-auto">
        <div className="p-6 border-b border-border">
          <h3 className="font-display text-xl font-semibold text-foreground mb-4">Page Builder</h3>
          <Select value={selectedPageId} onValueChange={setSelectedPageId}>
            <SelectTrigger data-testid="select-page">
              <SelectValue placeholder="Select a page" />
            </SelectTrigger>
            <SelectContent>
              {pages?.map((page) => (
                <SelectItem key={page.id} value={page.id}>
                  {page.title}
                </SelectItem>
              ))}
              <SelectItem value="new">+ Create New Page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <ComponentPalette onAddComponent={addComponent} />
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border bg-card flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-foreground">Live Preview</h3>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={previewMode === 'desktop' ? 'default' : 'secondary'}
                onClick={() => setPreviewMode('desktop')}
                data-testid="button-preview-desktop"
              >
                Desktop
              </Button>
              <Button
                size="sm"
                variant={previewMode === 'tablet' ? 'default' : 'secondary'}
                onClick={() => setPreviewMode('tablet')}
                data-testid="button-preview-tablet"
              >
                Tablet
              </Button>
              <Button
                size="sm"
                variant={previewMode === 'mobile' ? 'default' : 'secondary'}
                onClick={() => setPreviewMode('mobile')}
                data-testid="button-preview-mobile"
              >
                Mobile
              </Button>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={handleSaveDraft}
              disabled={updatePageMutation.isPending || !selectedPageId}
              data-testid="button-save-draft"
            >
              <i className="fas fa-save mr-2"></i>Save Draft
            </Button>
            <Button
              onClick={handlePublish}
              disabled={updatePageMutation.isPending || !selectedPageId}
              data-testid="button-publish"
            >
              <i className="fas fa-upload mr-2"></i>Publish
            </Button>
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-auto">
          <div className={`preview-frame shadow-2xl mx-auto ${
            previewMode === 'mobile' ? 'max-w-sm' : 
            previewMode === 'tablet' ? 'max-w-2xl' : 'w-full'
          }`}>
            <div className="bg-background text-foreground min-h-[600px]" data-testid="preview-area">
              {pageContent.components.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed border-primary/30 rounded-lg">
                  <i className="fas fa-plus text-primary text-2xl mb-4"></i>
                  <p className="text-muted-foreground">Drag components here to build your page</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pageContent.components.map((component, index) => (
                    <EditableComponent
                      key={component.id}
                      component={component}
                      onUpdate={(updates) => updateComponent(component.id, updates)}
                      onDelete={() => deleteComponent(component.id)}
                      onMoveUp={() => index > 0 && moveComponent(index, index - 1)}
                      onMoveDown={() => index < pageContent.components.length - 1 && moveComponent(index, index + 1)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
