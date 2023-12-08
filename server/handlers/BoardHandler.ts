import {BoardModelObj} from "../database/sql/BoardModel";
import {Board, ExpressHandler} from "../types";
import {GetBoardIdRequest, GetListBoardRequest} from "../request/board/GetRequest";
import {GetBoardIdResponse, GetListBoardResponse} from "../response/board/GetResponse";
import {DeleteBoardRequest} from "../request/board/DeleteRequest";
import {DeleteBoardResponse} from "../response/board/DeleteResponse";
import {UpdateBoardRequest} from "../request/board/UpdateRequest";
import {UpdateBoardResponse} from "../response/board/UpdateResponse";
import {CreateBoardRequest} from "../request/board/CreateRequest";
import {CreateBoardResponse} from "../response/board/CreateResponse";
import {log} from "winston";

//TODO run this

export const getBoardsForLoggedUserHandler: ExpressHandler<GetListBoardRequest, GetListBoardResponse> = async (req, res)=> {

    const userId: number = res.locals.userId;

    return res.status(200).send({
        boards: await BoardModelObj.getBoardsForLoggedUser(userId)
    })

}

export const createBoardsHandler: ExpressHandler<CreateBoardRequest, CreateBoardResponse> = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({error: 'name|userId field is require'});
    }

    const now = (new Date().toISOString().slice(0, 19).replace('T', ' '));

    const board: Board = {
        name,
        userId: res.locals.userId,
        createdAt: now
    };

    const boardId:number = await BoardModelObj.createBoard(board);

    const boardObj:Board | undefined = await BoardModelObj.getBoard(boardId);

    res.status(201).send({
        message: 'create user success',
        board: boardObj
    });
}

export const getBoardHandler: ExpressHandler<GetBoardIdRequest, GetBoardIdResponse> = async (req, res) => {
    // @ts-ignore
    const boardId: number = req.params.id;

    const boardObj = await BoardModelObj.getBoardForLoggedUser(res.locals.userId, boardId);

    if (boardObj === undefined) {
        return res.status(404).send({message: `Logged User not permission to get board by id ${boardId}`})
    }

    return res.status(200).send({
        board: boardObj
    })
}

export const updateBoardHandler: ExpressHandler<UpdateBoardRequest, UpdateBoardResponse> = async (req, res)=> {
    const { name } = req.body;

    // @ts-ignore
    const boardId: number = req.params.id;

    const getBoard = await BoardModelObj.getBoardForLoggedUser(res.locals.userId, boardId);

    if (getBoard === undefined) {
        return res.status(404).send({message: `Logged User not permission to update board by id ${boardId}`})
    }

    const board: Board = {
        name,
    }

    await BoardModelObj.updateBoard(boardId, board);

    const boardObj: Board | undefined = await BoardModelObj.getBoard(boardId);

    res.status(200).send({
        board: boardObj,
        message: 'updated successfully',
    })
}

export const deleteBoardHandler: ExpressHandler<DeleteBoardRequest, DeleteBoardResponse> = async (req, res) => {
    // @ts-ignore
    const boardId: number = req.params.id;

    const getBoard = await BoardModelObj.getBoardForLoggedUser(res.locals.userId, boardId);

    if (getBoard === undefined) {
        return res.status(404).send({message: `Logged User not permission to delete board by id ${boardId}`})
    }

    await BoardModelObj.deleteBoard(boardId);

    return res.status(200).send({
        message: 'delete successfully'
    });
}