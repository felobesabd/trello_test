import {Board} from "../../types";

export interface GetListBoardResponse {
    boards: Board[];
}

export interface GetBoardIdResponse {
    board: Board | undefined;
    message: string;
}