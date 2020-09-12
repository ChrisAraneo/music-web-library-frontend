import { isURL, validate } from "./validation/common";

export default interface SongURL {
    songURLID: number,
    url: string
}

export const validateSongURL = (
    url: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isURL(url),
                title: "Niepoprawny url",
                message: "Wpisz poprawny url utworu.",
                errorCallback
            }
        ],
        successCallback
    );
}