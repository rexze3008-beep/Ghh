# Discord Webhook Manager

## Overview

A full-stack web application for managing Discord webhooks with an embedded message builder. The application allows users to create, configure, and test Discord webhooks while providing a visual embed builder with real-time preview capabilities. Built with a modern React frontend and Express.js backend, the system offers a comprehensive solution for Discord webhook management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Discord-themed color variables
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with dedicated routes for webhooks and messages
- **Storage Strategy**: Modular storage interface (IStorage) with in-memory implementation as default
- **Development Setup**: Integrated Vite development server with hot module replacement

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless driver for cloud-based PostgreSQL
- **Fallback Storage**: In-memory storage implementation for development/testing

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Basic Express session handling infrastructure present
- **Future Consideration**: Authentication system can be added as needed

### External Dependencies
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Discord Integration**: Discord.js v2 library with support for new component builders (ContainerBuilder, SectionBuilder, ThumbnailBuilder, SeparatorBuilder)
- **UI Components**: Extensive Radix UI component library for accessible interface elements
- **Development Tools**: Replit-specific plugins for development environment integration
- **Form Validation**: Zod for runtime type checking and validation schemas

### Key Architectural Decisions

**Component Architecture**: The frontend uses a modular component structure with separate concerns for webhook configuration, embed building (supporting both traditional embeds and Discord.js v2 components), message history, and live preview functionality.

**Data Flow**: Implements unidirectional data flow using TanStack Query for server state synchronization, ensuring consistent data across components.

**Storage Abstraction**: Uses an interface-based storage pattern allowing easy switching between in-memory storage and database persistence without changing business logic.

**Type Safety**: Shared TypeScript schemas between frontend and backend ensure type consistency across the full stack.

**Development Experience**: Integrated Vite setup with Express allows for seamless full-stack development with hot reloading and error handling.