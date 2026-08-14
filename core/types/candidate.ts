export interface CandidateRecord {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  providerIds: string[];
  marketingOptIn: boolean;
  source: string;
  createdAt: string;
  lastLoginAt: string;
}
