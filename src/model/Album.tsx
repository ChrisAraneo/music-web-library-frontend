import Cover from "./Cover";
import Review from "./Review";
import Song, { SongInAlbum } from "./Song";
import Artist from "./Artist";
import { isNumber, isString, validate } from "./validation/common";

export default interface Album {
    albumID: number,
    title: string,
    year: number,
    artists?: Artist[],

    cover?: Cover,
    reviews?: Review[],
    songs?: SongInAlbum[]
}

export const validateAlbumTitle = (
    title: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(title),
                title: "Niepoprawny tytuł albumu",
                message: "Wpisz poprawny tytuł albumu",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateAlbumYear = (
    year: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isNumber(year),
                title: "Niepoprawny rok wydania albumu",
                message: "Wpisz poprawny rok wydania albumu",
                errorCallback
            }
        ],
        successCallback
    )
}