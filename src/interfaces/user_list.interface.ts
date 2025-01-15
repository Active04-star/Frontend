import { IuserWithoutToken } from "@/types/zTypes";

export interface IUserList {
    items: number,
    page: number,
    limit: number,
    total_pages: number,
    users: IuserWithoutToken[],
}