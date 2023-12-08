import {User} from "../../types";

export interface UpdateUserResponse {
    user: Pick<User, 'name' | 'username'| 'email'>;
    message: string;
}