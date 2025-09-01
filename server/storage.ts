import { 
  users, pages, staffMembers, altCharacters, menuItems, mediaFiles,
  type User, type InsertUser, type Page, type InsertPage,
  type StaffMember, type InsertStaffMember, type AltCharacter, type InsertAltCharacter,
  type MenuItem, type InsertMenuItem, type MediaFile, type InsertMediaFile
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Page methods
  getPage(slug: string): Promise<Page | undefined>;
  getPages(): Promise<Page[]>;
  getPublishedPages(): Promise<Page[]>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: string, page: Partial<InsertPage>): Promise<Page>;
  deletePage(id: string): Promise<void>;
  
  // Staff methods
  getStaffMembers(): Promise<StaffMember[]>;
  getStaffMemberWithAlts(id: string): Promise<(StaffMember & { altCharacters: AltCharacter[] }) | undefined>;
  createStaffMember(staff: InsertStaffMember): Promise<StaffMember>;
  updateStaffMember(id: string, staff: Partial<InsertStaffMember>): Promise<StaffMember>;
  deleteStaffMember(id: string): Promise<void>;
  
  // Alt character methods
  createAltCharacter(alt: InsertAltCharacter): Promise<AltCharacter>;
  updateAltCharacter(id: string, alt: Partial<InsertAltCharacter>): Promise<AltCharacter>;
  deleteAltCharacter(id: string): Promise<void>;
  
  // Menu methods
  getMenuItems(): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: string, item: Partial<InsertMenuItem>): Promise<MenuItem>;
  deleteMenuItem(id: string): Promise<void>;

  // Media methods
  getMediaFiles(): Promise<MediaFile[]>;
  createMediaFile(file: InsertMediaFile): Promise<MediaFile>;
  deleteMediaFile(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Page methods
  async getPage(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page || undefined;
  }

  async getPages(): Promise<Page[]> {
    return await db.select().from(pages);
  }

  async getPublishedPages(): Promise<Page[]> {
    return await db.select().from(pages).where(eq(pages.published, true));
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [newPage] = await db.insert(pages).values(page).returning();
    return newPage;
  }

  async updatePage(id: string, page: Partial<InsertPage>): Promise<Page> {
    const [updatedPage] = await db
      .update(pages)
      .set({ ...page, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    return updatedPage;
  }

  async deletePage(id: string): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }

  // Staff methods
  async getStaffMembers(): Promise<StaffMember[]> {
    return await db.select().from(staffMembers).orderBy(staffMembers.sortOrder);
  }

  async getStaffMemberWithAlts(id: string): Promise<(StaffMember & { altCharacters: AltCharacter[] }) | undefined> {
    const [staff] = await db.select().from(staffMembers).where(eq(staffMembers.id, id));
    if (!staff) return undefined;

    const alts = await db.select().from(altCharacters)
      .where(eq(altCharacters.staffMemberId, id))
      .orderBy(altCharacters.sortOrder);

    return { ...staff, altCharacters: alts };
  }

  async createStaffMember(staff: InsertStaffMember): Promise<StaffMember> {
    const [newStaff] = await db.insert(staffMembers).values(staff).returning();
    return newStaff;
  }

  async updateStaffMember(id: string, staff: Partial<InsertStaffMember>): Promise<StaffMember> {
    const [updatedStaff] = await db
      .update(staffMembers)
      .set(staff)
      .where(eq(staffMembers.id, id))
      .returning();
    return updatedStaff;
  }

  async deleteStaffMember(id: string): Promise<void> {
    await db.delete(staffMembers).where(eq(staffMembers.id, id));
  }

  // Alt character methods
  async createAltCharacter(alt: InsertAltCharacter): Promise<AltCharacter> {
    const [newAlt] = await db.insert(altCharacters).values(alt).returning();
    return newAlt;
  }

  async updateAltCharacter(id: string, alt: Partial<InsertAltCharacter>): Promise<AltCharacter> {
    const [updatedAlt] = await db
      .update(altCharacters)
      .set(alt)
      .where(eq(altCharacters.id, id))
      .returning();
    return updatedAlt;
  }

  async deleteAltCharacter(id: string): Promise<void> {
    await db.delete(altCharacters).where(eq(altCharacters.id, id));
  }

  // Menu methods
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems).orderBy(menuItems.sortOrder);
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }

  async updateMenuItem(id: string, item: Partial<InsertMenuItem>): Promise<MenuItem> {
    const [updatedItem] = await db
      .update(menuItems)
      .set(item)
      .where(eq(menuItems.id, id))
      .returning();
    return updatedItem;
  }

  async deleteMenuItem(id: string): Promise<void> {
    await db.delete(menuItems).where(eq(menuItems.id, id));
  }

  // Media methods
  async getMediaFiles(): Promise<MediaFile[]> {
    return await db.select().from(mediaFiles).orderBy(mediaFiles.uploadedAt);
  }

  async createMediaFile(file: InsertMediaFile): Promise<MediaFile> {
    const [newFile] = await db.insert(mediaFiles).values(file).returning();
    return newFile;
  }

  async deleteMediaFile(id: string): Promise<void> {
    await db.delete(mediaFiles).where(eq(mediaFiles.id, id));
  }
}

export const storage = new DatabaseStorage();
