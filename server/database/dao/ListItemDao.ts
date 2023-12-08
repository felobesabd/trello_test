import { ListItem } from "../../types";

export interface ListItemDao {
    createListItem(list: ListItem): Promise<ListItem | undefined>;

    getListItems(userId: number, boardId: number, listId: number): Promise<ListItem[] | undefined>;

    getListItemForUser(userId: number, id: number): Promise<ListItem | undefined>;

    updateListItem(id: number, list: ListItem): Promise<ListItem | undefined>;

    deleteListItem(id: number): Promise<ListItem  | undefined>;
}