import {ListItem} from "../../types";

export interface GetListItemsResponse {
    listItems: ListItem[] | undefined;
}

export interface GetListItemForUserResponse {
    listItem: ListItem | undefined;
}