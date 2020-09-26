import { isNumber, validate, isEmail, isPassword, identicalPasswords } from "./validation/common"
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

export const validateUserName = (
    name: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(name),
                title: "Niepoprawne imię",
                message: "Wpisz poprawne imię",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateUserUsername = (
    username: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(username),
                title: "Niepoprawna nazwa użytkownika",
                message: "Wpisz poprawną nazwę użytkownika",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateUserEmail = (
    email: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(email),
                title: "Proszę wpisać email",
                message: "Wpisz poprawny email",
                errorCallback
            },
            {
                result: isEmail(email),
                title: "Niepoprawny email",
                message: "Wpisz poprawny email",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateUserPassword = (
    password1: unknown,
    password2: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: identicalPasswords(password1, password2),
                title: "Hasła nie są takie same",
                message: "Wpisz identyczne hasło",
                errorCallback
            },
            {
                result: isPassword(password1) && isPassword(password2),
                title: "Proszę wpisać dłuższe hasło",
                message: "Wpisz dłuższe hasło",
                errorCallback
            }
        ],
        successCallback
    );
}