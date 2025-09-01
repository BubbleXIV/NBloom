export interface PageComponent {
  id: string;
  type: 'heading' | 'text' | 'image' | 'button' | 'divider' | 'grid' | 'video' | 'quote' | 'hero' | 'features' | 'testimonials';
  content?: any;
  style?: any;
  children?: PageComponent[];
}

export interface PageContent {
  components: PageComponent[];
  settings?: {
    title?: string;
    description?: string;
    background?: string;
  };
}

export interface AuthUser {
  id: string;
  username: string;
  role: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: any;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffMemberWithAlts {
  id: string;
  name: string;
  role: string;
  department: string;
  image?: string;
  bio?: string;
  isActive: boolean;
  sortOrder: number;
  altCharacters: Array<{
    id: string;
    name: string;
    race?: string;
    server?: string;
    image?: string;
    sortOrder: number;
  }>;
}
