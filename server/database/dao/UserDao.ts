import {User} from "../../types";

export interface UserDao {

    createUser(user: User): Promise<void>;

    getUsers(): Promise<User[]>;

    getUserById(id: number): Promise<User | undefined>;

    getUserByEmail(email: string): Promise<User | undefined>;

    getUserByUsername(username: string): Promise<User | undefined>;

    updateUser(id: number, user: User): Promise<User  | undefined>;

    deleteUser(id: number): Promise<User  | undefined>;
}