import {Board} from "../../types";

export interface BoardDao {
    createBoard(board: Board): Promise<number>;

    getBoards(): Promise<Board[]>;

    getBoardForLoggedUser(userId: number, boardId: number): Promise<Board | undefined>;

    getBoardsForLoggedUser(userId: number): Promise<Board[] | undefined>;

    getBoard(boardId: number): Promise<Board | undefined>;

    deleteBoard(boardId: number): Promise<Board  | undefined>;

    updateBoard(boardId: number, board: Board): Promise<Board  | undefined>;
}