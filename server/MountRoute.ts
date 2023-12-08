import asyncHandler from "express-async-handler";
import {
    createBoardsHandler,
    deleteBoardHandler,
    getBoardHandler,
    getBoardsForLoggedUserHandler,
    updateBoardHandler,
    //getBoardsForLoggedUserHandler,
} from "./handlers/BoardHandler";
import {
    allowedTo, deleteUserHandler,
    getUserHandler,
    getUsersHandler,
    signInHandler,
    signUpHandler, updateUserHandler
} from "./handlers/UserHandler";
import {signInValidator, signUpValidator} from "./request/user/AuthRequest";
import {authMiddleware} from "./middleware/AuthMiddleware";
import {updateUserValidator} from "./request/user/UpdateRequest";
import {
    createListHandler,
    deleteListHandler,
    getListHandler,
    getListsForBoardIdHandler,
    updateListHandler
} from "./handlers/ListHandler";
import {
    createListItemHandler, deleteListItemHandler,
    getListItemForUserHandler,
    getListItemsHandler,
    updateListItemHandler
} from "./handlers/ListItemHandler";


export const mountRoute = (app: any)=> {
    // auth
    app.post('/api/v1/signup', signUpValidator, asyncHandler(signUpHandler));
    app.post('/api/v1/signin', signInValidator, asyncHandler(signInHandler));

    app.use(authMiddleware);

    // Users
    app.get('/api/v1/users', allowedTo, asyncHandler(getUsersHandler));
    app.get('/api/v1/users/id', asyncHandler(getUserHandler));
    app.put('/api/v1/users/id', updateUserValidator, asyncHandler(updateUserHandler));
    app.delete('/api/v1/users/id', asyncHandler(deleteUserHandler));

    // Boards
    app.post('/api/v1/boards', asyncHandler(createBoardsHandler));
    app.get('/api/v1/boards', asyncHandler(getBoardsForLoggedUserHandler));
    app.get('/api/v1/boards/:id', asyncHandler(getBoardHandler));
    app.put('/api/v1/boards/:id', asyncHandler(updateBoardHandler));
    app.delete('/api/v1/boards/:id', asyncHandler(deleteBoardHandler));


    // lists
    app.post('/api/v1/lists', asyncHandler(createListHandler));
    app.get('/api/v1/lists/boardId', asyncHandler(getListsForBoardIdHandler));
    app.get('/api/v1/lists/:id', asyncHandler(getListHandler));
    app.put('/api/v1/lists/:id', asyncHandler(updateListHandler));
    app.delete('/api/v1/lists/:id', asyncHandler(deleteListHandler));

    // listItems
    app.post('/api/v1/listitems', asyncHandler(createListItemHandler));
    app.get('/api/v1/listitems', asyncHandler(getListItemsHandler));
    app.get('/api/v1/listitems/:id', asyncHandler(getListItemForUserHandler));
    app.put('/api/v1/listitems/:id', asyncHandler(updateListItemHandler));
    app.delete('/api/v1/listitems/:id', asyncHandler(deleteListItemHandler));
}