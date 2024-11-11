import { User } from "~/types/types";

export interface registerUserResponse extends User {
    password: string;
    isAdmin: boolean;
}