import type { PageComponent } from "@/types";

interface ComponentPaletteProps {
  onAddComponent: (component: PageComponent) => void;
}

export default function ComponentPalette({ onAddComponent }: ComponentPaletteProps) {
  const basicComponents = [
    { type: 'heading', label: 'Heading', icon: 'fas fa-heading' },
    { type: 'text', label: 'Text Block', icon: 'fas fa-paragraph' },
    { type: 'image', label: 'Image', icon: 'fas fa-image' },
    { type: 'button', label: 'Button', icon: 'fas fa-mouse-pointer' },
    { type: 'divider', label: 'Divider', icon: 'fas fa-grip-lines' },
    { type: 'grid', label: 'Grid Layout', icon: 'fas fa-th' },
    { type: 'video', label: 'Video', icon: 'fas fa-play' },
    { type: 'quote', label: 'Quote', icon: 'fas fa-quote-left' }
  ];

  const sectionComponents = [
    { type: 'hero', label: 'Hero Section', icon: 'fas fa-star' },
    { type: 'features', label: 'Feature Grid', icon: 'fas fa-columns' },
    { type: 'testimonials', label: 'Testimonials', icon: 'fas fa-comments' },
    { type: 'service-card', label: 'Service Card', icon: 'fas fa-concierge-bell' },
    { type: 'pricing-card', label: 'Pricing Card', icon: 'fas fa-tag' },
  ];

  const createComponent = (type: string): PageComponent => {
    const baseComponent = {
      id: Date.now().toString(),
      type: type as PageComponent['type'],
    };

    switch (type) {
      case 'heading':
        return {
          ...baseComponent,
          content: { text: 'New Heading', level: 1 },
          style: { textAlign: 'left', color: 'text-foreground' }
        };
      case 'text':
        return {
          ...baseComponent,
          content: { text: 'Add your text content here...' },
          style: { textAlign: 'left', color: 'text-muted-foreground' }
        };
      case 'image':
        return {
          ...baseComponent,
          content: { src: '', alt: 'Image description', caption: '' },
          style: { width: '100%', height: 'auto', borderRadius: '8px' }
        };
      case 'button':
        return {
          ...baseComponent,
          content: { text: 'Click me', href: '#' },
          style: { variant: 'primary', size: 'default' }
        };
    case 'divider':
      return {
        ...baseComponent,
        content: { style: 'solid' },
        style: {
          color: 'border-border',
          thickness: '1px',
          margin: '20px 0'
        }
      };

    case 'grid':
      return {
        ...baseComponent,
        content: {
          columns: 2,
          gap: '16px'
        },
        children: [],
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }
      };
      case 'hero':
        return {
          ...baseComponent,
          content: {
            title: 'Hero Title',
            subtitle: 'Hero subtitle text',
            backgroundImage: '',
            buttons: []
          }
        };
      case 'service-card':
        return {
          ...baseComponent,
          content: {
            icon: 'fas fa-star',
            title: 'Service Title',
            description: 'Service description goes here...',
            features: [
              'Feature 1',
              'Feature 2',
              'Feature 3'
            ]
          }
        };
      case 'pricing-card':
        return {
          ...baseComponent,
          content: {
            name: 'Package Name',
            price: '100 gil',
            features: [
              'Feature 1',
              'Feature 2',
              'Feature 3'
            ],
            popular: false
          }
        };
      default:
        return baseComponent;
    }
  };

  return (
    <div className="p-6" data-testid="component-palette">
      <h4 className="font-semibold text-foreground mb-4">Components</h4>
      <div className="space-y-3">
        {basicComponents.map((comp) => (
          <div
            key={comp.type}
            onClick={() => onAddComponent(createComponent(comp.type))}
            className="p-3 bg-card border border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
            data-testid={`component-${comp.type}`}
          >
            <div className="flex items-center">
              <i className={`${comp.icon} text-primary mr-3`}></i>
              <span className="text-foreground">{comp.label}</span>
            </div>
          </div>
        ))}
      </div>

      <h4 className="font-semibold text-foreground mb-4 mt-8">Pre-built Sections</h4>
      <div className="space-y-3">
        {sectionComponents.map((comp) => (
          <div
            key={comp.type}
            onClick={() => onAddComponent(createComponent(comp.type))}
            className="p-3 bg-card border border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
            data-testid={`section-${comp.type}`}
          >
            <div className="flex items-center">
              <i className={`${comp.icon} text-primary mr-3`}></i>
              <span className="text-foreground">{comp.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}