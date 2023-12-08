import { BoardDao } from "../dao/BoardDao";
import {Board} from "../../types";
import {DatabaseConnection} from "../DatabaseConnection";

export class BoardModel implements BoardDao {

    async createBoard(board: Board): Promise<number> {

        let insertedRow = await DatabaseConnection.query(
            "INSERT INTO `boards`(`id`, `name`, `user_id`, `created_at`) VALUES (?,?,?,?)",
            [
                board.id,
                board.name,
                board.userId,
                board.createdAt
            ]
        )

        return insertedRow.insertId;
    }

    async getBoards(): Promise<Board[]> {
        return await DatabaseConnection.query(
            "SELECT * FROM `boards`"
        );
    }

    async getBoardForLoggedUser(userId: number, boardId?: number): Promise<Board | undefined> {
        return await DatabaseConnection.getRow("SELECT * FROM `boards` WHERE user_id = ? AND id = ?", [userId, boardId]);
    }

    async getBoardsForLoggedUser(userId: number): Promise<Board[] | undefined> {
        return await DatabaseConnection.query("SELECT * FROM `boards` WHERE user_id = ?", [userId]);
    }

    async getBoard(boardId: number): Promise<Board  | undefined> {
        return await DatabaseConnection.getRow("SELECT * FROM `boards` WHERE id = ?", boardId);
    }

    async updateBoard(boardId: number, board: Board): Promise<Board | undefined> {
        return await DatabaseConnection.getRow(
            'UPDATE `boards` SET `name` = ? WHERE `boards`.`id` = ?',
            [
                board.name,
                boardId
            ]
        );


    }

    async deleteBoard(boardId: number): Promise<Board | undefined> {
        return await DatabaseConnection.getRow("DELETE FROM `boards` WHERE id = ?", boardId);
    }

}

export let BoardModelObj: BoardModel = new BoardModel();