import { User } from "~/types/types";

export interface RegisterUserResponse extends User {
    password: string;
    isAdmin: boolean;
}