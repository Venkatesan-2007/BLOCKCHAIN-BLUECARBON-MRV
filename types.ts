
export type UserRole = 'NGO' | 'Govt' | 'Investor' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  coords: { lat: number, lng: number };
  status: 'Planting' | 'Proof' | 'Verification' | 'Credit Issuance';
  co2Stored: number;
  creditsIssued: number;
  ngo: string;
}

export type ProofStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Proof {
  id: string;
  projectId: string;
  imageUrl: string;
  location: string;
  timestamp: string;
  uploadedBy: string;
  status: ProofStatus;
  aiBiomass: number;
  aiCo2Estimate: number;
}

export interface CarbonCredit {
  id: string;
  tokenId: string;
  proofId: string;
  issuedTo: string; // NGO Wallet Address
  issueDate: string;
  status: 'Available' | 'Sold';
  price?: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole: UserRole;
  authorAvatar: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
}

export type NotificationType = 'comment' | 'approval' | 'sale' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}
