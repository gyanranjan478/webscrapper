import { Account } from '../server/Model';

export enum AccessRight{
    CREATE,
    READ,
    UPDATE,
    DELETE
}


export interface UserCredentials extends Account {
    accessRights: AccessRight[];
}