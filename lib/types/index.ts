// Auth Types
import type { Deal } from '@/lib/services/deals.service';
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'agent';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: AuthUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<AuthUser | null>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
}

// User and Authentication Types
export type UserRole =
  | 'BUYER'
  | 'SELLER'
  | 'LAWYER'
  | 'AGENT'
  | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  company?: string;
  avatar?: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

// Property Types
export type PropertyType =
  | 'RESIDENTIAL'
  | 'COMMERCIAL'
  | 'LAND'
  | 'INDUSTRIAL'
  | 'MIXED_USE';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  address: string;
  city: string;
  state: string;
  country: string;
  description?: string;
  size?: number;
  images: string[];
}

// Party Types
export type PartyRole =
  | 'BUYER'
  | 'SELLER'
  | 'LAWYER'
  | 'AGENT';

export interface Party {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: PartyRole;
  company?: string;
  idType?: string;
  idNumber?: string;
  status: 'Active' | 'Pending' | 'Declined';
}

// Deal Types
export type DealType =
  | 'Purchase'
  | 'Land Purchase'
  | 'Rental'
  | 'Lease';

export type DealStatus =
  | 'DRAFT'
  | 'PENDING_PARTICIPANTS'
  | 'PENDING_FUNDING'
  | 'FUNDED'
  | 'DUE_DILIGENCE'
  | 'DISPUTED'
  | 'RELEASE_REQUESTED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface EscrowCondition {
  id: string;
  description: string;
  completed: boolean;
  completedDate?: string;
}

export interface EscrowData {
  id: string;
  amount: number;
  provider: string;
  providerLogoUrl?: string;
  account?: string;
  fundingSource: 'Buyer Deposit' | 'Split Deposit' | 'Third Party';
  fundingDate: string;
  holdingPeriod: number;
  releaseConditions: EscrowCondition[];
  recentTransactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'Deposit' | 'Fee' | 'Hold' | 'Withdraw' | 'Release';
  description: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  reference?: string;
}

export interface DealChecklist {
  id: string;
  section: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  assignee?: User;
  dueDate?: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Pending' | 'Overdue';
}

export interface DealDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: User;
  uploadedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Review';
  url: string;
}

export interface DealActivity {
  id: string;
  type: 'document_upload' | 'task_completed' | 'stakeholder_added' | 'comment' | 'escrow_update' | 'status_change' | 'deal_created';
  actor: User;
  description: string;
  timestamp: string;
  linkedResource?: {
    type: 'document' | 'task' | 'stakeholder' | 'deal';
    id: string;
    name: string;
  };
}

// Notification Types
export type NotificationType = 
  | 'deal_created' 
  | 'document_uploaded' 
  | 'task_assigned' 
  | 'task_completed' 
  | 'stakeholder_added' 
  | 'escrow_funded' 
  | 'escrow_released' 
  | 'message'
  | 'security_alert';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  actor: User;
  relatedDeal?: Deal;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  icon?: string;
}

// Filter and Search Types
export interface DealFilters {
  status?: DealStatus[];
  dealType?: DealType[];
  currency?: string[];
  minValue?: number;
  maxValue?: number;
  assignee?: string[];
}

export interface SearchParams {
  query?: string;
  filters?: DealFilters;
  sort?: 'recent' | 'alphabetical' | 'value' | 'closingDate';
  page?: number;
  pageSize?: number;
}

// Profile and Settings Types
export interface UserProfile {
  user: User;
  organization: {
    name: string;
    timezone: string;
    currency: string;
    dateFormat: string;
    language: string;
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  preferences: {
    notifications: boolean;
    emailDigest: 'daily' | 'weekly' | 'monthly' | 'never';
    twoFactorAuth: boolean;
  };
}

// Dashboard Types
export interface DashboardMetrics {
  totalDeals: number;
  activeDeals: number;
  closingThisMonth: number;
  totalDealValue: number;
  currency: string;
}

export interface DashboardActivity {
  activities: DealActivity[];
  recentDeals: Deal[];
  upcomingDeals: Deal[];
}
