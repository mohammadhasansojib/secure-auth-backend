import { IUser } from "../types/userType.js";



export const removePassword = (user: IUser): Omit<IUser, "passwordHash"> => {
    const {passwordHash, ...userWithoutPassword} = user;
    return userWithoutPassword;
}