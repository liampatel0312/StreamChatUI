# Design Guidelines: Stream.io Messaging Application

## Design Approach
**System:** Hybrid approach drawing from Slack, Discord, and Linear messaging patterns
**Rationale:** Messaging apps require familiar, efficient patterns with focus on readability and quick navigation. Users expect established conventions for chat interfaces.

## Layout Architecture

### Primary Structure
Three-column layout on desktop:
- **Left Sidebar (260px fixed):** Channel/conversation list with search
- **Main Chat Area (flexible):** Message thread and input
- **Right Panel (280px, collapsible):** Thread details, member list, or settings

Mobile: Stack vertically with bottom navigation tabs

### Spacing System
Use Tailwind units: **2, 3, 4, 6, 8** for consistent rhythm
- Component padding: p-4, p-6
- Section gaps: gap-4, gap-6
- Message spacing: space-y-2, space-y-3
- Container margins: m-8 for desktop, m-4 for mobile

## Typography Hierarchy

**Font Stack:** 
- Primary: Inter or System UI fonts via Google Fonts
- Monospace: JetBrains Mono for code blocks

**Scale:**
- Channel names: text-base font-semibold
- Message sender: text-sm font-medium
- Message body: text-sm font-normal
- Timestamps: text-xs
- Input placeholder: text-sm
- Error messages: text-sm font-medium

## Component Library

### Authentication Screen
- Centered card (max-w-md) with logo placement at top
- Input fields for user token with clear labels
- Primary action button (full width)
- Error banner positioned above form when active
- Loading states with spinner overlay

### Channel List (Left Sidebar)
- Search bar at top (sticky position)
- Scrollable channel list with hover states
- Channel items: 48px height, truncated text with ellipsis
- Unread indicators: small badge (absolute positioned, top-right)
- Active channel: distinct background treatment
- "New Channel" button at bottom

### Message Thread (Main Area)
- Header bar (64px height): Channel name, member count, search icon
- Scrollable message container with reverse chronological order
- Message bubbles: max-w-2xl, rounded corners (rounded-lg)
- Own messages: aligned right
- Others' messages: aligned left with avatar (32px circle)
- Timestamp on hover or below message
- Reaction bar below messages (inline-flex with gap-1)

### Message Composer (Bottom of Main Area)
- Fixed position at bottom with border-top
- Rich text input with formatting toolbar
- Height: min-h-[80px], max-h-[200px] with overflow
- Send button: positioned absolute right
- Typing indicators above composer (text-xs with animation)
- File attachment icon, emoji picker icon in toolbar

### Thread Panel (Right Sidebar)
- Header with close button
- Parent message display at top
- Threaded replies with reduced left padding
- Same message structure as main thread but condensed

### Error Handling
- Toast notifications: fixed top-right, max-w-sm
- Inline errors: border-l-4 with error icon
- Connection status banner: fixed top, full-width when offline
- Error text with clear retry actions

### User Presence & Status
- Online indicators: 8px circle, absolute positioned on avatars
- Typing indicators: animated dots with user name
- Read receipts: small avatars (16px) below last message
- Member list: 40px height items with status indicators

### Modal Overlays
- Channel creation: centered modal (max-w-lg)
- User profile: slide-in panel from right (320px)
- Settings: full-screen overlay with close button
- Backdrop: semi-transparent overlay

## Interaction Patterns

### Navigation
- Click channel to switch
- Escape key to close modals/panels
- Cmd/Ctrl+K for quick channel search
- Tab navigation through messages

### Message Actions
- Hover reveals: edit, delete, thread, reactions
- Right-click context menu for advanced actions
- Drag-and-drop file uploads with visual feedback
- @ mentions with autocomplete dropdown

### Loading States
- Skeleton screens for initial channel load
- Inline spinners for message sending
- Progressive loading for infinite scroll
- Shimmer effect on placeholders

## Responsive Behavior

**Desktop (lg:):** Full three-column layout
**Tablet (md:):** Two-column (channel list + chat, collapsible right panel)
**Mobile (base):** Single column with tab navigation (Channels, Active Chat, Profile)

Bottom navigation tabs on mobile:
- Channels icon
- Active chat icon  
- Profile icon

## Accessibility
- Keyboard navigation for all actions
- ARIA labels on icons and interactive elements
- Focus indicators on all interactive components
- Screen reader announcements for new messages
- High contrast ratios for text readability
- Consistent tab order throughout application

## Critical Features Integration
- Real-time message delivery with optimistic updates
- Unread message counts with badge notifications
- Search functionality with keyboard shortcuts
- Message reactions displayed inline with counts
- File previews (images inline, documents as cards)
- Code syntax highlighting in code blocks
- Link previews with metadata cards