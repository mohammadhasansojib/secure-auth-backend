import { Role } from "../generated/prisma/index.js";

export interface IUser {
    id: number;
    email: string;
    username: string;
    age: number;
    passwordHash: string;
    isVerified: boolean;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export type UserPayload = Omit<IUser, "id" | "isVerified" | "createdAt" | "updatedAt"> & {
    role?: Role
};