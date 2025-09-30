
import type { User, Project, Proof, CarbonCredit, CommunityPost, Notification } from '../types';

export const USERS: User[] = [
  { id: '1', name: 'Dr. Aris', email: 'aris@ngo.org', role: 'NGO', avatar: 'https://picsum.photos/id/1005/200/200' },
  { id: '2', name: 'Bpk. Budi', email: 'budi@gov.id', role: 'Govt', avatar: 'https://picsum.photos/id/1011/200/200' },
  { id: '3', name: 'Alice', email: 'alice@invest.com', role: 'Investor', avatar: 'https://picsum.photos/id/1027/200/200' },
  { id: '4', name: 'Admin Securix', email: 'admin@securix.io', role: 'Admin', avatar: 'https://picsum.photos/id/10/200/200' },
];

export const PROJECTS: Project[] = [
  { id: 'p1', name: 'Karimun Jawa Mangrove Restoration', location: 'Jepara, Indonesia', coords: { lat: -5.8, lng: 110.4 }, status: 'Credit Issuance', co2Stored: 15000, creditsIssued: 14500, ngo: 'Mangrove Foundation' },
  { id: 'p2', name: 'Sunda Kelapa Coastal Defense', location: 'Jakarta, Indonesia', coords: { lat: -6.1, lng: 106.8 }, status: 'Verification', co2Stored: 8500, creditsIssued: 8000, ngo: 'Coastal Guardians' },
  { id: 'p3', name: 'Bali Blue Carbon Initiative', location: 'Denpasar, Bali', coords: { lat: -8.6, lng: 115.2 }, status: 'Proof', co2Stored: 3200, creditsIssued: 0, ngo: 'Bali Ocean Care' },
  { id: 'p4', name: 'Riau Peatland Rewetting', location: 'Pekanbaru, Riau', coords: { lat: 0.5, lng: 101.4 }, status: 'Planting', co2Stored: 500, creditsIssued: 0, ngo: 'Peatland Restoration Agency' },
];

export const PROOFS: Proof[] = [
  { id: 'proof1', projectId: 'p2', imageUrl: 'https://picsum.photos/seed/mangrove1/800/600', location: '6.102° S, 106.812° E', timestamp: '2023-10-26T10:00:00Z', uploadedBy: 'Field Worker A', status: 'Pending', aiBiomass: 120.5, aiCo2Estimate: 450.2 },
  { id: 'proof2', projectId: 'p2', imageUrl: 'https://picsum.photos/seed/mangrove2/800/600', location: '6.103° S, 106.814° E', timestamp: '2023-10-26T11:30:00Z', uploadedBy: 'Field Worker B', status: 'Pending', aiBiomass: 135.2, aiCo2Estimate: 501.9 },
  { id: 'proof3', projectId: 'p3', imageUrl: 'https://picsum.photos/seed/mangrove3/800/600', location: '8.652° S, 115.212° E', timestamp: '2023-10-25T09:00:00Z', uploadedBy: 'Field Worker C', status: 'Approved', aiBiomass: 98.7, aiCo2Estimate: 360.1 },
  { id: 'proof4', projectId: 'p1', imageUrl: 'https://picsum.photos/seed/mangrove4/800/600', location: '5.851° S, 110.435° E', timestamp: '2023-08-15T14:00:00Z', uploadedBy: 'Field Worker D', status: 'Approved', aiBiomass: 250.0, aiCo2Estimate: 980.5 },
];

export const CARBON_CREDITS: CarbonCredit[] = [
  { id: 'cc1', tokenId: '0x1a2b3c...', proofId: 'proof3', issuedTo: '0xNGO...1234', issueDate: '2023-10-26', status: 'Available', price: 15.50 },
  { id: 'cc2', tokenId: '0x4d5e6f...', proofId: 'proof4', issuedTo: '0xNGO...5678', issueDate: '2023-08-16', status: 'Available', price: 18.00 },
  { id: 'cc3', tokenId: '0x7g8h9i...', proofId: 'proof4', issuedTo: '0xNGO...5678', issueDate: '2023-08-16', status: 'Sold', price: 17.50 },
  { id: 'cc4', tokenId: '0xj1k2l3...', proofId: 'proof4', issuedTo: '0xNGO...5678', issueDate: '2023-08-17', status: 'Available', price: 18.25 },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
    { id: 'post1', author: 'Dr. Aris', authorRole: 'NGO', authorAvatar: USERS[0].avatar, timestamp: '2 hours ago', content: 'Great news! Our Bali Blue Carbon Initiative just had its first batch of proofs approved. This is a huge milestone for the local community and our coastal ecosystem. Thanks to all the field workers for their hard work!', likes: 42, comments: 8 },
    { id: 'post2', author: 'Bpk. Budi', authorRole: 'Govt', timestamp: '1 day ago', authorAvatar: USERS[1].avatar, content: 'The government is pleased to see the rapid progress in the Sunda Kelapa project. The use of AI for biomass estimation is proving to be a game-changer for transparent MRV. We look forward to verifying the next set of proofs.', likes: 112, comments: 15 },
    { id: 'post3', author: 'Alice', authorRole: 'Investor', timestamp: '3 days ago', authorAvatar: USERS[2].avatar, content: 'As an investor, the transparency and data-driven approach of Securix is exactly what the carbon market needs. Excited to see more high-quality, verified blue carbon credits become available on the marketplace.', likes: 78, comments: 22 },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'approval', title: 'Proof Approved', description: 'Your submitted proof for project "Bali Blue Carbon Initiative" has been approved.', timestamp: '30 minutes ago', read: false },
  { id: 'n2', type: 'comment', title: 'New Comment', description: 'Bpk. Budi commented on your post: "Great news! Our Bali Blue..."', timestamp: '2 hours ago', read: false },
  { id: 'n3', type: 'sale', title: 'Credit Sold', description: 'One of your carbon credits (Token ID: 0x7g8h9i...) has been sold on the marketplace.', timestamp: '1 day ago', read: false },
  { id: 'n4', type: 'system', title: 'Weekly Report Ready', description: 'Your weekly analytics report is now available for download.', timestamp: '2 days ago', read: true },
  { id: 'n5', type: 'approval', title: 'Proof Rejected', description: 'Your submitted proof for project "Sunda Kelapa Coastal Defense" was rejected. Please review the feedback.', timestamp: '3 days ago', read: true },
  { id: 'n6', type: 'comment', title: 'New Mention', description: 'Alice mentioned you in a post: "Thanks to Dr. Aris for the great work..."', timestamp: '4 days ago', read: true },
];
