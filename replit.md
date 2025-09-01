# Overview

This is a full-stack web application for "The Golden Chocobo," an elegant venue website designed for the FFXIV gaming community. The application serves as both a public-facing website showcasing venue services, staff, and menu, as well as an administrative content management system. It's built as a modern React frontend with an Express.js backend, utilizing PostgreSQL for data persistence.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool and development server
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessibility and consistent design
- **Styling**: Tailwind CSS with custom design tokens for the venue's golden theme and dark mode support
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM for type-safe database operations and schema management
- **Authentication**: Express sessions with bcrypt for password hashing
- **File Uploads**: Multer for handling image uploads with validation
- **API Design**: RESTful API structure with separate admin and public endpoints

## Database Design
- **Core Entities**: Users (admin accounts), Pages (dynamic content), Staff Members, Alt Characters, Menu Items, and Media Files
- **Relationships**: Staff members have one-to-many relationships with alt characters, supporting FFXIV's multiple character system
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Data Validation**: Drizzle-Zod integration for runtime type checking

## Content Management System
- **Page Builder**: Custom visual page builder with drag-and-drop components for dynamic content creation
- **Media Management**: Centralized media library for image uploads and management
- **Menu Management**: Full CRUD operations for venue menu items with categorization
- **Staff Management**: Comprehensive staff directory with support for multiple characters per staff member

## Authentication & Authorization
- **Session-based Authentication**: Express sessions for maintaining login state
- **Role-based Access**: Admin role system for content management access
- **Protected Routes**: Client-side route protection for admin areas

## File Management
- **Upload System**: Server-side file handling with type validation and size limits
- **Static Serving**: Express static middleware for serving uploaded media files
- **Storage Structure**: Organized file system with proper naming conventions

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL database with connection pooling via @neondatabase/serverless
- **Connection Management**: WebSocket-based connections for serverless compatibility

## UI Components
- **Radix UI**: Comprehensive accessible component primitives for all interactive elements
- **Lucide React**: Icon library for consistent iconography throughout the application
- **Class Variance Authority**: Utility for managing component variants and styling

## Development Tools
- **Vite**: Fast development server and build tool with HMR support
- **TypeScript**: Full type safety across frontend and backend with shared types
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Authentication & Security
- **bcrypt**: Password hashing for secure credential storage
- **express-session**: Session management middleware
- **connect-pg-simple**: PostgreSQL session store for persistent sessions

## File Processing
- **Multer**: Multipart/form-data handling for file uploads
- **Image Validation**: MIME type checking for uploaded images

## Build & Deployment
- **tsx**: TypeScript execution for development
- **Replit Integration**: Development environment optimizations for Replit platform