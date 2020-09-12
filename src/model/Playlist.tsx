import User, { isUser } from "./User";
import { SongInPlaylist } from "./Song";
import { validate, isString } from "./validation/common";

export default interface Artist {
    playlistID: number,
    title: string,
    user: User,
    songs?: SongInPlaylist[]
}

export const validatePlaylistTitle = (
    title: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(title),
                title: "Niepoprawny tytuł listy",
                message: "Wpisz poprawny tytuł listy utworów",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validatePlaylistUser = (
    user: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isUser(user),
                title: "Niepoprawny użytkownik",
                message: "Nie można przypisać listy utworów do użytkownika.",
                errorCallback
            }
        ],
        successCallback
    );
}