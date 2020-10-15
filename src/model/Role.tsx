import { isString, validate } from "./common/validation";

export const ROLE_USER = "ROLE_USER";
export const ROLE_ADMIN = "ROLE_ADMIN";

export default interface Role {
    id: number,
    name: string
}

export const validateRoleName = (
    name: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(name),
                title: "Niepoprawna nazwa",
                message: "Wpisz poprawną nazwę rodzaju działalności muzycznej.",
                errorCallback
            }
        ],
        successCallback
    );
}