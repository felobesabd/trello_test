import { List } from "../../types";

export interface GetListsResponse {
    lists: List[] | undefined;
}

export interface GetListResponse {
    list: List | undefined;
}