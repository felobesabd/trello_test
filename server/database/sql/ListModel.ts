import {List} from "../../types";
import {DatabaseConnection} from "../DatabaseConnection";
import {ListDao} from "../dao/ListDao";

export class ListModel implements ListDao {

    async createList(list: List): Promise<void> {

        let insertedRow = await DatabaseConnection.query(
            "INSERT INTO `lists`(`id`, `name`, `board_id`, `created_at`) VALUES (?,?,?,?)",
            [
                list.id,
                list.name,
                list.boardId,
                list.createdAt
            ]
        )

        return insertedRow;
    }

    //TODO change any variable names id
    async getListForUser(userId: number, listId: number): Promise<List | undefined> {
        return await DatabaseConnection.getRow(
            `
                    SELECT 
                           lists.* 
                    FROM  users 
                        INNER JOIN boards ON boards.user_id = users.id AND users.id = ? 
                        INNER JOIN lists ON lists.board_id = boards.id AND lists.id = ?
                `,
            [
                userId,
                listId
            ]
        );
    }

    async getListsForBoard(userId: number, boardId: number): Promise<List[] | undefined> {
        return await DatabaseConnection.query(
            `
                SELECT 
                       lists.*
                FROM  users
                    INNER JOIN boards ON boards.user_id = users.id AND users.id = ?
                    INNER JOIN lists ON lists.board_id = boards.id AND lists.board_id = ?
            `,
            [
                userId,
                boardId
            ]
        );
    }

    async updateList(listId: number, list: List): Promise<List | undefined> {
        let insertedRow = await DatabaseConnection.query(
            'UPDATE `lists` SET `name` = ?, `board_id` = ? WHERE `lists`.`id` = ?',
            [
                list.name,
                list.boardId,
                listId
            ]
        );

        return insertedRow;
    }

    async deleteList(listId: number): Promise<List | undefined> {
        return await DatabaseConnection.getRow("DELETE FROM `lists` WHERE id = ?", listId);
    }

}

export let ListModelObj: ListModel = new ListModel();