import type { Express, Request, Response } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPageSchema, insertStaffMemberSchema, insertAltCharacterSchema, insertMenuItemSchema, insertMediaFileSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import session from "express-session";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'venue-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  }));

  // Serve uploaded files
  app.use('/uploads', express.static(uploadDir));

  // Create default admin user if it doesn't exist
  try {
    const existingAdmin = await storage.getUserByUsername('admin');
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await storage.createUser({
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      });
    }
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }

  // Create default pages if they don't exist
try {
  const existingPages = await storage.getPages();
  if (existingPages.length === 0) {
    // Create default pages
    const defaultPages = [
      { title: 'Home', slug: 'home', content: '{"components":[]}', published: true },
      { title: 'Services', slug: 'services', content: '{"components":[]}', published: true },
      { title: 'Menu', slug: 'menu', content: '{"components":[]}', published: true },
      { title: 'Staff', slug: 'staff', content: '{"components":[]}', published: true },
      { title: 'Contact', slug: 'contact', content: '{"components":[]}', published: true }
    ];

    for (const page of defaultPages) {
      await storage.createPage(page);
    }
    console.log('Created default pages');
  }
} catch (error) {
  console.error('Error creating default pages:', error);
}

  // Auth middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    next();
  };

  // Auth routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      req.session.userId = user.id;
      res.json({ user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  app.get('/api/auth/me', requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user' });
    }
  });

  // Page routes
  app.get('/api/pages', async (req, res) => {
    try {
      const pages = await storage.getPublishedPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch pages' });
    }
  });

  app.get('/api/pages/:slug', async (req, res) => {
    try {
      const page = await storage.getPage(req.params.slug);
      if (!page || !page.published) {
        return res.status(404).json({ message: 'Page not found' });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch page' });
    }
  });

  app.get('/api/admin/pages', requireAuth, async (req, res) => {
    try {
      const pages = await storage.getPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch pages' });
    }
  });

  app.post('/api/admin/pages', requireAuth, async (req, res) => {
    try {
      const pageData = insertPageSchema.parse(req.body);
      const page = await storage.createPage(pageData);
      res.json(page);
    } catch (error) {
      res.status(400).json({ message: 'Invalid page data' });
    }
  });

  app.put('/api/admin/pages/:id', requireAuth, async (req, res) => {
    try {
      const pageData = insertPageSchema.partial().parse(req.body);
      const page = await storage.updatePage(req.params.id, pageData);
      res.json(page);
    } catch (error) {
      res.status(400).json({ message: 'Invalid page data' });
    }
  });

  app.delete('/api/admin/pages/:id', requireAuth, async (req, res) => {
    try {
      await storage.deletePage(req.params.id);
      res.json({ message: 'Page deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete page' });
    }
  });

  // Staff routes
  app.get('/api/staff', async (req, res) => {
    try {
      const staff = await storage.getStaffMembers();
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch staff' });
    }
  });

  app.get('/api/staff/:id', async (req, res) => {
    try {
      const staff = await storage.getStaffMemberWithAlts(req.params.id);
      if (!staff) {
        return res.status(404).json({ message: 'Staff member not found' });
      }
      res.json(staff);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch staff member' });
    }
  });

  app.post('/api/admin/staff', requireAuth, async (req, res) => {
    try {
      const staffData = insertStaffMemberSchema.parse(req.body);
      const staff = await storage.createStaffMember(staffData);
      res.json(staff);
    } catch (error) {
      res.status(400).json({ message: 'Invalid staff data' });
    }
  });

  app.put('/api/admin/staff/:id', requireAuth, async (req, res) => {
    try {
      const staffData = insertStaffMemberSchema.partial().parse(req.body);
      const staff = await storage.updateStaffMember(req.params.id, staffData);
      res.json(staff);
    } catch (error) {
      res.status(400).json({ message: 'Invalid staff data' });
    }
  });

  app.delete('/api/admin/staff/:id', requireAuth, async (req, res) => {
    try {
      await storage.deleteStaffMember(req.params.id);
      res.json({ message: 'Staff member deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete staff member' });
    }
  });

  // Alt character routes
  app.post('/api/admin/staff/:staffId/alts', requireAuth, async (req, res) => {
    try {
      const altData = insertAltCharacterSchema.parse({
        ...req.body,
        staffMemberId: req.params.staffId
      });
      const alt = await storage.createAltCharacter(altData);
      res.json(alt);
    } catch (error) {
      res.status(400).json({ message: 'Invalid alt character data' });
    }
  });

  app.put('/api/admin/alts/:id', requireAuth, async (req, res) => {
    try {
      const altData = insertAltCharacterSchema.partial().parse(req.body);
      const alt = await storage.updateAltCharacter(req.params.id, altData);
      res.json(alt);
    } catch (error) {
      res.status(400).json({ message: 'Invalid alt character data' });
    }
  });

  app.delete('/api/admin/alts/:id', requireAuth, async (req, res) => {
    try {
      await storage.deleteAltCharacter(req.params.id);
      res.json({ message: 'Alt character deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete alt character' });
    }
  });

  // Menu routes
  app.get('/api/menu', async (req, res) => {
    try {
      const category = req.query.category as string;
      const items = category 
        ? await storage.getMenuItemsByCategory(category)
        : await storage.getMenuItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch menu items' });
    }
  });

  app.post('/api/admin/menu', requireAuth, async (req, res) => {
    try {
      const itemData = insertMenuItemSchema.parse(req.body);
      const item = await storage.createMenuItem(itemData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: 'Invalid menu item data' });
    }
  });

  app.put('/api/admin/menu/:id', requireAuth, async (req, res) => {
    try {
      const itemData = insertMenuItemSchema.partial().parse(req.body);
      const item = await storage.updateMenuItem(req.params.id, itemData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: 'Invalid menu item data' });
    }
  });

  app.delete('/api/admin/menu/:id', requireAuth, async (req, res) => {
    try {
      await storage.deleteMenuItem(req.params.id);
      res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete menu item' });
    }
  });

  // Media routes
  app.get('/api/media', requireAuth, async (req, res) => {
    try {
      const files = await storage.getMediaFiles();
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch media files' });
    }
  });

  app.post('/api/admin/media/upload', requireAuth, upload.single('file'), async (req: any, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const fileExtension = path.extname(req.file.originalname);
      const newFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExtension}`;
      const newPath = path.join(uploadDir, newFilename);
      
      // Move file to permanent location
      fs.renameSync(req.file.path, newPath);

      const mediaFile = await storage.createMediaFile({
        filename: newFilename,
        originalName: req.file.originalname,
        url: `/uploads/${newFilename}`,
        type: 'image',
        size: req.file.size
      });

      res.json(mediaFile);
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload file' });
    }
  });

  app.post('/api/admin/media/url', requireAuth, async (req, res) => {
    try {
      const { url, name } = req.body;
      if (!url || !name) {
        return res.status(400).json({ message: 'URL and name are required' });
      }

      const mediaFile = await storage.createMediaFile({
        filename: name,
        originalName: name,
        url: url,
        type: 'image',
        size: 0
      });

      res.json(mediaFile);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add media from URL' });
    }
  });

  app.post('/api/admin/pages/convert-default/:slug', async (req, res) => {
  const { slug } = req.params;
  // Logic to convert hardcoded pages to database entries
});

  app.delete('/api/admin/media/:id', requireAuth, async (req, res) => {
    try {
      await storage.deleteMediaFile(req.params.id);
      res.json({ message: 'Media file deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete media file' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
