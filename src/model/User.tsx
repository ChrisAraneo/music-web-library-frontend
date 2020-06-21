export default interface User {
    userID: number,
    banned?: boolean,
    email?: string,
    name?: string,
    password?: string,
    resetCode?: string,
    resetDate?: Date,
    superUser?: boolean,

    // ??????
    user?: string
}