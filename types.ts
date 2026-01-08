
export enum UserRole {
  STUDENT = 'STUDENT',
  COUNSELLOR = 'COUNSELLOR'
}

export type Gender = 'male' | 'female' | 'other';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  // Student specific
  anonymousName?: string;
  age?: number;
  gender?: Gender;
  // Counsellor specific
  fullName?: string;
  licenseNumber?: string;
  expertise?: string[];
  experience?: number;
  rating?: number;
  bio?: string;
}

export interface Appointment {
  id: string;
  studentId: string;
  counsellorId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  isPaid: boolean;
  type: 'video' | 'chat';
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  content: string;
  mood?: string;
}

export interface Post {
  id: string;
  userId: string;
  anonymousName: string;
  content: string;
  timestamp: number;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  anonymousName: string;
  content: string;
  timestamp: number;
}
