import { validate, isURL } from "./common/validation";

export default interface ArtistURL {
    artistUrlID: number,
    url: string
}

export const validateArtistURL = (
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