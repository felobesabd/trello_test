import { UserDao } from "../dao/UserDao";
import {User} from "../../types";
import {DatabaseConnection} from "../DatabaseConnection";

export class UserModel implements UserDao {

    async createUser(user: User): Promise<void> {

        let insertedRow = await DatabaseConnection.query(
            "INSERT INTO `users`(`id`, `name`, `username`, `email`, `password`) VALUES (?,?,?,?,?)",
            [
                user.id,
                user.name,
                user.username,
                user.email,
                user.password
            ]
        )

        return insertedRow.insertId;
    }

    async getUsers(): Promise<User[]> {
        return await DatabaseConnection.query(
            "SELECT * FROM `users`"
        );
    }

    async getUserById(id: number): Promise<User> {
        return await DatabaseConnection.getRow("SELECT * FROM `users` WHERE id = ?", id);
    }

    async getUserByEmail(email: string): Promise<User  | undefined> {
        return await DatabaseConnection.getRow("SELECT * FROM `users` WHERE email = ?", email);
    }

    async getUserByUsername(username: string): Promise<User  | undefined> {
        return await DatabaseConnection.getRow("SELECT * FROM `users` WHERE username = ?", username);
    }

    async updateUser(id: number, user: User): Promise<User | undefined> {
        let insertedRow = await DatabaseConnection.query(
            'UPDATE `users` SET `name` = ?, `username` = ?, `email` = ? WHERE `users`.`id` = ?',
            [
                user.name,
                user.username,
                user.email,
                id
            ]
        );

        return insertedRow;
    }

    async deleteUser(id: number): Promise<User | undefined> {
        return await DatabaseConnection.getRow("DELETE FROM `users` WHERE id = ?", id);
    }

}

export let UserModelObj: UserModel = new UserModel();