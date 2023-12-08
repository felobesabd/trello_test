import {ListItem} from "../../types";

export type UpdateListItemRequest = Pick<ListItem, 'content' | 'listId'>