import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown, Settings, Trash2 } from "lucide-react";
import type { PageComponent } from "@/types";

interface EditableComponentProps {
  component: PageComponent;
  onUpdate: (updates: Partial<PageComponent>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function EditableComponent({
  component,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown
}: EditableComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const renderComponent = () => {
    switch (component.type) {
      case 'heading':
        const HeadingTag = `h${component.content?.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag 
            className={`font-display font-bold ${
              component.content?.level === 1 ? 'text-4xl' :
              component.content?.level === 2 ? 'text-3xl' :
              component.content?.level === 3 ? 'text-2xl' :
              component.content?.level === 4 ? 'text-xl' :
              component.content?.level === 5 ? 'text-lg' : 'text-base'
            } ${component.style?.color || 'text-foreground'}`}
            style={{ textAlign: component.style?.textAlign || 'left' }}
          >
            {component.content?.text || 'Heading'}
          </HeadingTag>
        );

      case 'text':
        return (
          <p 
            className={`${component.style?.color || 'text-muted-foreground'} leading-relaxed`}
            style={{ textAlign: component.style?.textAlign || 'left' }}
          >
            {component.content?.text || 'Text content...'}
          </p>
        );

      case 'image':
        return (
          <div className="text-center">
            {component.content?.src ? (
              <img
                src={component.content.src}
                alt={component.content.alt || ''}
                className="max-w-full h-auto rounded-lg"
                style={{
                  width: component.style?.width || '100%',
                  height: component.style?.height || 'auto',
                  borderRadius: component.style?.borderRadius || '8px'
                }}
              />
            ) : (
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <p className="text-muted-foreground">No image selected</p>
              </div>
            )}
            {component.content?.caption && (
              <p className="text-sm text-muted-foreground mt-2">{component.content.caption}</p>
            )}
          </div>
        );

      case 'button':
        return (
          <div style={{ textAlign: component.style?.textAlign || 'left' }}>
            <Button
              variant={component.style?.variant || 'default'}
              size={component.style?.size || 'default'}
              className={component.style?.variant === 'primary' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
            >
              {component.content?.text || 'Button'}
            </Button>
          </div>
        );

      case 'divider':
        return (
          <hr 
            className="border-0"
            style={{ 
              borderTop: `${component.style?.thickness || '1px'} solid ${component.style?.color || 'hsl(var(--border))'}`,
              margin: '1rem 0'
            }} 
          />
        );

      case 'grid':
        return (
          <div 
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${component.content?.columns || 2}, 1fr)` }}
          >
            {component.children?.map((child, index) => (
              <div key={child.id || index} className="p-4 border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground text-sm">Grid item {index + 1}</p>
              </div>
            )) || (
              Array.from({ length: component.content?.columns || 2 }).map((_, index) => (
                <div key={index} className="p-4 border border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground text-sm">Grid item {index + 1}</p>
                </div>
              ))
            )}
          </div>
        );

      case 'quote':
        return (
          <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-muted-foreground">
            {component.content?.text || 'Quote text...'}
            {component.content?.author && (
              <footer className="text-sm font-medium text-foreground mt-2">
                — {component.content.author}
              </footer>
            )}
          </blockquote>
        );

      case 'hero':
        return (
          <div 
            className="relative min-h-[400px] flex items-center justify-center text-center text-white rounded-lg overflow-hidden"
            style={{
              backgroundImage: component.content?.backgroundImage ? `url(${component.content.backgroundImage})` : 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0F0F0F 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 max-w-3xl mx-auto px-4">
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                {component.content?.title || 'Hero Title'}
              </h1>
              <p className="text-xl mb-8">
                {component.content?.subtitle || 'Hero subtitle'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {component.content?.buttons?.map((button: any, index: number) => (
                  <Button key={index} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {button.text}
                  </Button>
                )) || (
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Call to Action
                  </Button>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 border border-dashed border-border rounded-lg text-center">
            <p className="text-muted-foreground">Unknown component type: {component.type}</p>
          </div>
        );
    }
  };

  const renderEditDialog = () => (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit {component.type.charAt(0).toUpperCase() + component.type.slice(1)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {component.type === 'heading' && (
            <>
              <div>
                <Label htmlFor="heading-text">Text</Label>
                <Input
                  id="heading-text"
                  value={component.content?.text || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, text: e.target.value }
                  })}
                  data-testid="input-heading-text"
                />
              </div>
              <div>
                <Label htmlFor="heading-level">Level</Label>
                <Select
                  value={component.content?.level?.toString() || '1'}
                  onValueChange={(value) => onUpdate({
                    content: { ...component.content, level: parseInt(value) }
                  })}
                >
                  <SelectTrigger data-testid="select-heading-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">H1</SelectItem>
                    <SelectItem value="2">H2</SelectItem>
                    <SelectItem value="3">H3</SelectItem>
                    <SelectItem value="4">H4</SelectItem>
                    <SelectItem value="5">H5</SelectItem>
                    <SelectItem value="6">H6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="heading-align">Text Align</Label>
                <Select
                  value={component.style?.textAlign || 'left'}
                  onValueChange={(value) => onUpdate({
                    style: { ...component.style, textAlign: value }
                  })}
                >
                  <SelectTrigger data-testid="select-heading-align">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {component.type === 'text' && (
            <>
              <div>
                <Label htmlFor="text-content">Content</Label>
                <Textarea
                  id="text-content"
                  value={component.content?.text || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, text: e.target.value }
                  })}
                  rows={4}
                  data-testid="input-text-content"
                />
              </div>
              <div>
                <Label htmlFor="text-align">Text Align</Label>
                <Select
                  value={component.style?.textAlign || 'left'}
                  onValueChange={(value) => onUpdate({
                    style: { ...component.style, textAlign: value }
                  })}
                >
                  <SelectTrigger data-testid="select-text-align">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {component.type === 'image' && (
            <>
              <div>
                <Label htmlFor="image-src">Image URL</Label>
                <Input
                  id="image-src"
                  value={component.content?.src || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, src: e.target.value }
                  })}
                  data-testid="input-image-src"
                />
              </div>
              <div>
                <Label htmlFor="image-alt">Alt Text</Label>
                <Input
                  id="image-alt"
                  value={component.content?.alt || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, alt: e.target.value }
                  })}
                  data-testid="input-image-alt"
                />
              </div>
              <div>
                <Label htmlFor="image-caption">Caption</Label>
                <Input
                  id="image-caption"
                  value={component.content?.caption || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, caption: e.target.value }
                  })}
                  data-testid="input-image-caption"
                />
              </div>
            </>
          )}

          {component.type === 'button' && (
            <>
              <div>
                <Label htmlFor="button-text">Button Text</Label>
                <Input
                  id="button-text"
                  value={component.content?.text || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, text: e.target.value }
                  })}
                  data-testid="input-button-text"
                />
              </div>
              <div>
                <Label htmlFor="button-href">Link URL</Label>
                <Input
                  id="button-href"
                  value={component.content?.href || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, href: e.target.value }
                  })}
                  data-testid="input-button-href"
                />
              </div>
              <div>
                <Label htmlFor="button-variant">Style</Label>
                <Select
                  value={component.style?.variant || 'default'}
                  onValueChange={(value) => onUpdate({
                    style: { ...component.style, variant: value }
                  })}
                >
                  <SelectTrigger data-testid="select-button-variant">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {component.type === 'grid' && (
            <div>
              <Label htmlFor="grid-columns">Number of Columns</Label>
              <Select
                value={component.content?.columns?.toString() || '2'}
                onValueChange={(value) => onUpdate({
                  content: { ...component.content, columns: parseInt(value) }
                })}
              >
                <SelectTrigger data-testid="select-grid-columns">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Column</SelectItem>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {component.type === 'quote' && (
            <>
              <div>
                <Label htmlFor="quote-text">Quote Text</Label>
                <Textarea
                  id="quote-text"
                  value={component.content?.text || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, text: e.target.value }
                  })}
                  rows={3}
                  data-testid="input-quote-text"
                />
              </div>
              <div>
                <Label htmlFor="quote-author">Author</Label>
                <Input
                  id="quote-author"
                  value={component.content?.author || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, author: e.target.value }
                  })}
                  data-testid="input-quote-author"
                />
              </div>
            </>
          )}

          {component.type === 'hero' && (
            <>
              <div>
                <Label htmlFor="hero-title">Title</Label>
                <Input
                  id="hero-title"
                  value={component.content?.title || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, title: e.target.value }
                  })}
                  data-testid="input-hero-title"
                />
              </div>
              <div>
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={component.content?.subtitle || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, subtitle: e.target.value }
                  })}
                  rows={2}
                  data-testid="input-hero-subtitle"
                />
              </div>
              <div>
                <Label htmlFor="hero-bg">Background Image URL</Label>
                <Input
                  id="hero-bg"
                  value={component.content?.backgroundImage || ''}
                  onChange={(e) => onUpdate({
                    content: { ...component.content, backgroundImage: e.target.value }
                  })}
                  data-testid="input-hero-bg"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsEditing(false)} data-testid="button-cancel-edit">
            Cancel
          </Button>
          <Button onClick={() => setIsEditing(false)} data-testid="button-save-edit">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`editable-component-${component.id}`}
    >
      <div className="relative">
        {renderComponent()}
        
        {/* Edit Controls Overlay */}
        {isHovered && (
          <div className="absolute top-2 right-2 flex space-x-1 bg-black bg-opacity-75 rounded-md p-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={onMoveUp}
              className="h-6 w-6 p-0 text-white hover:bg-white hover:bg-opacity-20"
              data-testid={`button-move-up-${component.id}`}
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onMoveDown}
              className="h-6 w-6 p-0 text-white hover:bg-white hover:bg-opacity-20"
              data-testid={`button-move-down-${component.id}`}
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-6 w-6 p-0 text-white hover:bg-white hover:bg-opacity-20"
              data-testid={`button-edit-${component.id}`}
            >
              <Settings className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="h-6 w-6 p-0 text-white hover:bg-red-500 hover:bg-opacity-20"
              data-testid={`button-delete-${component.id}`}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {renderEditDialog()}
    </div>
  );
}
