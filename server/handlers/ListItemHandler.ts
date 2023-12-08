import {ExpressHandler, ListItem} from "../types";
import { ListItemModelObj } from "../database/sql/ListItemModel";
import {BoardModelObj} from "../database/sql/BoardModel";
import {GetListItemForUserRequest, GetListItemsRequest} from "../request/listItem/GetRequest";
import {GetListItemForUserResponse, GetListItemsResponse} from "../response/listItem/GetResponse";
import {CreateListItemRequest} from "../request/listItem/CreateRequest";
import {CreateListItemResponse} from "../response/listItem/CreateResponse";
import {UpdateListItemResponse} from "../response/listItem/UpdateResponse";
import {UpdateListItemRequest} from "../request/listItem/UpdateRequest";
import {DeleteListItemResponse} from "../response/listItem/DeleteResponse";
import {DeleteListItemRequest} from "../request/listItem/DeleteRequest";
import {ListModelObj} from "../database/sql/ListModel";

export const getListItemsHandler: ExpressHandler<GetListItemsRequest, GetListItemsResponse> = async (req, res) => {

    const boardId: number = req.body.boardId!;
    const listId: number = req.body.listId!;

    const listItemObj: any = await ListItemModelObj.getListItems(res.locals.userId, boardId, listId);

    if (listItemObj.length === 0) {
        res.status(401).send({ error: `user not permission this items` })
    }

    return res.send({
        listItems: listItemObj
    })
}

export const createListItemHandler: ExpressHandler<CreateListItemRequest, CreateListItemResponse> = async (req, res) => {
    const { content, listId } = req.body;

    if (!content || !listId ) {
        return res.status(400).send({ error: 'name field is require' });
    }

    const boardObj = await ListModelObj.getListForUser(res.locals.userId, listId);

    if (boardObj === undefined) {
        return res.status(400).send({ error: `logged user not found list ${listId}` });
    }

    const now = (new Date().toISOString().slice(0, 19).replace('T', ' '));

    const list: ListItem = {
        content,
        listId,
        createdAt: now
    };

    const listItemObj = await ListItemModelObj.createListItem(list);

    res.status(201).send({ message: 'create user success', list: listItemObj });
}

export const getListItemForUserHandler: ExpressHandler<GetListItemForUserRequest, GetListItemForUserResponse> = async (req, res) => {
    // @ts-ignore
    const id: number = req.params.id;
    const listObj = await ListItemModelObj.getListItemForUser(res.locals.userId, id);
    console.log(id)

    if (listObj === undefined) {
        return res.status(404).send({ error: `not found listItem for user By id ${id}` })
    }


    return res.status(200).send({
        listItem: listObj
    })
}

export const updateListItemHandler: ExpressHandler<UpdateListItemRequest, UpdateListItemResponse> = async (req, res)=> {

    const { content, listId } = req.body;

    if (!content || !listId ) {
        return res.status(400).send({error: 'name field is require'});
    }

    // @ts-ignore
    const id: number = req.params.id;

    const listObjID = await ListItemModelObj.getListItemForUser(res.locals.userId, id);

    if (listObjID === undefined) {
        return res.status(400).send({ error: `logged user not Permission update on listItem ${id}` });
    }

    const list: ListItem = {
        content,
        listId,
    }

    const listObj = await ListItemModelObj.updateListItem(id, list);

    if (listObj === undefined) {
        return res.status(404).send({ error: `Invalid id ${id}` })
    }

    return res.status(200).send({
        message: `updated successfully`,
        list: listObj
    })
}

export const deleteListItemHandler: ExpressHandler<DeleteListItemRequest, DeleteListItemResponse> = async (req, res) => {
    // @ts-ignore
    const id: number = req.params.id;
    const listObj = await ListItemModelObj.deleteListItem(id);

    return res.status(200).send({message: 'delete successfully'});

    // return res.status(404).send({error: `Invalid id ${id}`})
}