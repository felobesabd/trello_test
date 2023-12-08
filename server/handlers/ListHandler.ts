import {ExpressHandler, List} from "../types";
import {GetListRequest, GetListsRequest} from "../request/list/GetRequest";
import {GetListResponse, GetListsResponse} from "../response/list/GetResponse";
import { ListModelObj } from "../database/sql/ListModel";
import {CreateListRequest} from "../request/list/CreateRequest";
import {CreateListResponse} from "../response/list/CreateResponse";
import {UpdateListRequest} from "../request/list/UpdateRequest";
import {UpdateListResponse} from "../response/list/UpdateResponse";
import {DeleteListRequest} from "../request/list/DeleteRequest";
import {DeleteListResponse} from "../response/list/DeleteResponse";
import {BoardModelObj} from "../database/sql/BoardModel";

export const getListsForBoardIdHandler: ExpressHandler<GetListsRequest, GetListsResponse> = async (req, res) => {
    //todo get lists of certain board of certin user

    // @ts-ignore
    const boardId: number = req.body.boardId

    const listObj: any = await ListModelObj.getListsForBoard(res.locals.userId, boardId)

    if (listObj.length === 0) {
        res.status(401).send({ error: `user not permission this items` })
    }

    return res.send({
        lists: listObj
    })
}

export const createListHandler: ExpressHandler<CreateListRequest, CreateListResponse> = async (req, res) => {
    const { name, boardId } = req.body;

    if (!name || !boardId ) {
        return res.status(400).send({ error: 'name field is require' });
    }

    const boardObj = await BoardModelObj.getBoardForLoggedUser(res.locals.userId, boardId);
    console.log(boardObj);

    if (boardObj === undefined) {
        return res.status(400).send({ error: `logged user not found board ${boardId}` });
    }

    const now = (new Date().toISOString().slice(0, 19).replace('T', ' '));

    const list: List = {
        name,
        boardId,
        createdAt: now
    };

    await ListModelObj.createList(list);

    res.status(201).send({ message: 'create user success' });
}

export const getListHandler: ExpressHandler<GetListRequest, GetListResponse> = async (req, res) => {
    // @ts-ignore
    const listId: number = req.params.id;
    const listObj = await ListModelObj.getListForUser(res.locals.userId, listId);

    if (listObj === undefined) {
        return res.status(404).send({ error: `Invalid id ${listId}` })
    }


    return res.status(200).send({
        list: listObj
    })
}

export const updateListHandler: ExpressHandler<UpdateListRequest, UpdateListResponse> = async (req, res)=> {

    const { name, boardId } = req.body;

    if (!name || !boardId ) {
        return res.status(400).send({error: 'name field is require'});
    }

    // @ts-ignore
    const listId: number = req.params.id;

    const listObjID = await ListModelObj.getListForUser(res.locals.userId, listId);

    if (listObjID === undefined) {
        return res.status(400).send({ error: `logged user not permission to update list ${listId}` });
    }

    const list: List = {
        name,
        boardId,
    }

    const listObj = await ListModelObj.updateList(listId, list);

    if (listObj === undefined) {
        return res.status(404).send({ error: `Invalid id ${listId}` })
    }

    return res.status(200).send({
        list: listObj
    })
}

export const deleteListHandler: ExpressHandler<DeleteListRequest, DeleteListResponse> = async (req, res) => {
    // @ts-ignore
    const listId: number = req.params.id;

    const listObjID = await ListModelObj.getListForUser(res.locals.userId, listId);

    if (listObjID === undefined) {
        return res.status(400).send({ error: `logged user not permission to delete list ${listId}` });
    }

    const listObj = await ListModelObj.deleteList(listId);

    return res.status(200).send({message: 'delete successfully'});

    // return res.status(404).send({error: `Invalid id ${id}`})
}