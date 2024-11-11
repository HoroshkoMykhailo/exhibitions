import { User } from "../types";

export interface CommentI {
    id: number;
    text: string;
    createdAt: string;
    user: User;
}