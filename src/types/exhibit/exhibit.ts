import { User } from "../types";

export interface Exhibit {
  id: number;
  imageUrl: string;
  description: string;
  user: User;
  commentCount: number;
  createdAt: string;
}