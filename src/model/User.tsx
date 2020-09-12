import { isNumber } from "./validation/common"
import { isString } from "util"

export default interface User {
    userID: number,
    name: string,
    username?: string,
    email?: string
    role?: string
}

export const isUser = (input: any): boolean => {
    return (isNumber(input?.userID) && isString(input?.name));
}