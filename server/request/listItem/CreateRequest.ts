import {ListItem} from "../../types";

export type CreateListItemRequest = Pick<ListItem, 'content'| 'listId'>