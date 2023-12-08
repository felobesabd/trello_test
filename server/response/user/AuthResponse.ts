import { User } from "../../types";

export interface SignUpResponse {
    users: User;
    jwt: string;
}

export type SignInResponse = {
    user: Pick<User, 'id'|'name'|'username'|'email'>
    jwt: string;
}