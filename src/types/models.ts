
export type PrimaryRole =
  | "Mentor"
  | "Mentee"
  | "Co-founder"
  | "Founder"
  | "Advisor"
  | "Advisory Client"
  | "Service Provider"
  | "Service Client"
  | "Job Seeker"
  | "Job Recruiter"
  | "Investor"
  | "Startup";

export interface User {
  id: string;
  email: string;
  name?: string;
  password_hash?: string;
  year_of_birth?: number;
  role: PrimaryRole;
  secondary_role?: PrimaryRole;
  location?: string;
  tags?: string[];
  bio?: string;
  profile_picture_url?: string;
  [key: string]: any;
}

export interface Match {
  id: string;
  user_1_id: string;
  user_2_id: string;
  ai_score: number;
  status: "active" | "expired" | "successful" | "failed";
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  timestamp: string;
  seen: boolean;
  pinned_until?: string;
  scheduled_for?: string;
  file_url?: string;
  type?: "text" | "image" | "video" | "file";
}

export interface Post {
  id: string;
  author_id: string;
  content: string;
  type: "media" | "help";
  tags: string[];
  visibility: "public" | "private";
  created_at: string;
}

export interface PremiumSubscription {
  user_id: string;
  type: "AI" | "Directory" | "PPC";
  status: "active" | "inactive";
  started_at: string;
  renews_at?: string;
  canceled_at?: string;
}

export interface Payment {
  id: string;
  sender_id: string;
  recipient_id: string;
  amount: number;
  status: "pending" | "held" | "completed" | "refunded";
  order_id?: string;
  timestamp: string;
}
