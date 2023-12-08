import { Board } from "../../types";

export interface CreateBoardResponse {
    board: Board | undefined;
    message: string;
}
