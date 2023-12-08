import {Board} from "../../types";

export interface UpdateBoardResponse {
    board: Board | undefined;
    message: string;
}