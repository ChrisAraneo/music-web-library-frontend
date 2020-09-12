import { validate, isURL } from "./validation/common";

export default interface AlbumURL {
    artistUrlID: number,
    url: string
}

export const validateAlbumURL = (
    url: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isURL(url),
                title: "Niepoprawny url",
                message: "Wpisz poprawny url",
                errorCallback
            }
        ],
        successCallback
    );
}