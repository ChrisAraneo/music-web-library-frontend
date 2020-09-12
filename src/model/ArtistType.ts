import { validate, isString } from "./validation/common";

export default interface ArtistType {
    artistTypeID: number,
    name: string
}

export const validateArtistTypeName = (
    name: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(name),
                title: "Niepoprawna nazwa",
                message: "Wpisz poprawną nazwę rodzaju działalności muzycznej",
                errorCallback
            }
        ],
        successCallback
    );
}