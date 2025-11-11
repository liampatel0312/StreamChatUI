# StreamChat - Real-time Messaging Application

## Overview
A beautiful, real-time messaging application built with Stream Chat, featuring user token authentication, channel management, and comprehensive chat features.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui components
- **Chat Backend**: Stream Chat (getstream.io)
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Forms**: React Hook Form with Zod validation

## Project Structure

### Frontend Components
- `client/src/pages/login.tsx` - User authentication page for entering Stream tokens
- `client/src/components/chat-container.tsx` - Main chat interface with channel list and message thread
- `client/src/components/create-channel-modal.tsx` - Modal for creating new channels
- `client/src/components/error-boundary.tsx` - Error handling component
- `client/src/components/connection-status.tsx` - Connection status indicator
- `client/src/App.tsx` - Main application orchestrator

### Styling
- `client/src/index.css` - Design system tokens and elevation utilities
- `client/src/stream-chat-custom.css` - Custom Stream Chat component styling

### Configuration
- `shared/schema.ts` - TypeScript schemas and types for Stream user authentication
- `client/src/lib/stream-config.ts` - Stream API configuration

## Features Implemented

### Authentication
- User token-based authentication
- User ID and display name input
- Error handling for invalid credentials
- Loading states during connection

### Messaging
- Real-time message delivery
- Channel list with search
- Message input with rich text support
- Message reactions
- Typing indicators
- Read receipts
- User presence indicators
- Thread support
- Message editing and deletion (via Stream's UI)

### Channel Management
- Create new channels with custom names and IDs
- Channel types: messaging, team, livestream
- Add members to channels
- Channel search functionality
- Unread message counts

### Error Handling
- Connection status monitoring
- Offline/online indicators
- Error boundaries for crash prevention
- Visible error messages with retry actions
- Form validation errors

### UI/UX
- Clean, modern interface following Slack/Discord patterns
- Responsive design (mobile/tablet/desktop)
- Consistent spacing and typography
- Hover and active states on interactive elements
- Loading states throughout the application
- Beautiful empty states

## Stream Chat Configuration
- **API Key**: nrkm9yx3hw4c
- Users authenticate with their own Stream user tokens
- Supports multiple channel types and member management

## Running the Application
1. Start the development server: The workflow "Start application" runs `npm run dev`
2. Open the application in your browser
3. Enter your Stream Chat user ID and token
4. Optionally provide a display name
5. Click "Connect to Chat" to access the messaging interface

## User Journey
1. **Login** → Enter user ID and token
2. **Browse Channels** → View existing channels in the sidebar
3. **Select Channel** → Click a channel to view messages
4. **Send Messages** → Type and send messages with reactions
5. **Create Channel** → Click "Create Channel" button to start new conversations
6. **Logout** → Click logout button in sidebar header

## Recent Changes
- Initial implementation of Stream Chat messaging application
- User token authentication system
- Channel list and message thread components
- Custom styling to match design guidelines
- Error handling and connection monitoring
- Channel creation and management
- Dark mode support with theme toggle
- Mobile-responsive layout with collapsible sidebar
- Connection status monitoring with reconnection handling
- Beautiful loading states and error boundaries

## Design System
- Primary color: Blue (hsl(217 91% 60%))
- Font: Inter for UI, JetBrains Mono for code
- Spacing: Consistent 4, 6, 8 spacing units
- Components: shadcn/ui with custom Stream Chat integration
- Elevation system for hover/active states
- Dark mode: Full support with automatic theme switching
- Responsive: Mobile-first design with breakpoints at md and lg

## Dependencies
- `stream-chat` - Stream Chat JavaScript client
- `stream-chat-react` - Stream Chat React UI components
- All standard React, TypeScript, and Tailwind dependencies
