import { ListItem } from "../../types";
import {DatabaseConnection} from "../DatabaseConnection";
import {ListItemDao} from "../dao/ListItemDao";

export class ListItemModel implements ListItemDao {

    async createListItem(listItem: ListItem): Promise<ListItem | undefined> {

        let insertedRow = await DatabaseConnection.query(
            "INSERT INTO `list_items`(`id`, `content`, `list_id`, `created_at`) VALUES (?,?,?,?)",
            [
                listItem.id,
                listItem.content,
                listItem.listId,
                listItem.createdAt
            ]
        )

        return insertedRow;
    }

    async getListItems(userId: number, boardId: number, listId: number): Promise<ListItem[] | undefined> {
        return await DatabaseConnection.query(
            `SELECT
                 list_items.*
               FROM  users
                       INNER JOIN boards ON boards.user_id = users.id AND users.id = ?
                       INNER JOIN lists ON lists.board_id = boards.id AND lists.board_id = ?
                       INNER JOIN list_items ON list_items.list_id = lists.id AND list_items.list_id = ?
                       `,
            [
                userId,
                boardId,
                listId
            ]
        );
    }

    async getListItemForUser(userId: number, id: number): Promise<ListItem | undefined> {
        return await DatabaseConnection.getRow(
            `SELECT 
                         list_items.* 
                 FROM  users 
                     INNER JOIN boards ON boards.user_id = users.id AND users.id = ? 
                     INNER JOIN lists ON lists.board_id = boards.id 
                     INNER JOIN list_items ON list_items.list_id = lists.id AND list_items.id = ?
            `,
            [
                userId,
                id
            ]
        );
    }

    async updateListItem(id: number, listItem: ListItem): Promise<ListItem | undefined> {
        let insertedRow = await DatabaseConnection.query(
            'UPDATE `list_items` SET `content` = ?, `list_id` = ? WHERE `list_items`.`id` = ?',
            [
                listItem.content,
                listItem.listId,
                id
            ]
        );

        return insertedRow;
    }

    async deleteListItem(id: number): Promise<ListItem | undefined> {
        return await DatabaseConnection.getRow("DELETE FROM `list_items` WHERE id = ?", id);
    }

}

export let ListItemModelObj: ListItemModel = new ListItemModel();