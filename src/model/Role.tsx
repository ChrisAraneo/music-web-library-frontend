export const ROLE_USER = "USER_ROLE";
export const ROLE_ADMIN = "ROLE_ADMIN";

enum ROLE {
    ROLE_ADMIN,
    ROLE_USER
}

export default interface Role {
    id: number,
    name: ROLE
}