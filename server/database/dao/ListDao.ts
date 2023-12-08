import { List } from "../../types";

export interface ListDao {
    createList(list: List): Promise<void>;

    getListsForBoard(userId: number, boardId: number): Promise<List[] | undefined>

    getListForUser(userId: number, listId: number): Promise<List | undefined>;

    updateList(listId: number, list: List): Promise<List | undefined>;

    deleteList(listId: number): Promise<List  | undefined>;
}