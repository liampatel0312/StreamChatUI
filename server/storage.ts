import { type StreamUser } from "@shared/schema";

// Storage interface for Stream Chat application
// Note: Stream Chat handles most backend storage,
// this is kept for potential future local state needs

export interface IStorage {
  // Stream Chat handles user management
  // This interface can be extended for app-specific data if needed
}

export class MemStorage implements IStorage {
  constructor() {
    // Reserved for future local state management
  }
}

export const storage = new MemStorage();
