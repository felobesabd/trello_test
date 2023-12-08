import {User} from "../../types";

export interface GetUsersResponse {
    users: User[];
}

export interface GetUserResponse {
    user: Pick<User, 'id' | 'name' | 'username' | 'email'>;
}