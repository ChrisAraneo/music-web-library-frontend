import Artist from "./Artist";
import SongURL from "./SongURL";
import { isString, validate, isStringShorterThan, isURL } from "./validation/common";
import { isNumber } from "util";

export default interface Song {
    songID: number,
    title: string,
    bpm?: number
    comment?: string,
    genre?: string,
    language?: string,
    length?: number
    mainKey?: string,
    publisher?: string,
    terms?: string,
    website?: string,
    year?: number,
    albums?: any[],
    artists?: Artist[],
    songURLs?: SongURL[]
}

export interface SongInAlbum {
    id: { trackNumber: number },
    song: Song
}

export interface SongInPlaylist {
    id: { trackNumber: number },
    song: Song
}

export const validateSongTitle = (
    title: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(title),
                title: "Niepoprawny tytuł utworu",
                message: "Wpisz poprawny tytuł utworu muzycznego.",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateSongBpm = (
    bpm: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isNumber(bpm),
                title: "Niepoprawne tempo utworu",
                message: "Tempo powinno być liczbą (BPM).",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateSongComment = (
    comment: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    const length = 50;
    return validate(
        [
            {
                result: isStringShorterThan(comment, length),
                title: "Niepoprawny komentarz",
                message: `Komentarz utworu powinien mieć mniej niż ${length} znaków.`,
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateSongGenre = (
    genre: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(genre),
                title: "Niepoprawny gatunek",
                message: "Wpisz poprawny gatunek utworu muzycznego.",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateSongLanguage = (
    language: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(language),
                title: "Niepoprawny język",
                message: "Wpisz poprawny język utworu muzycznego.",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateSongLength = (
    length: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isNumber(length),
                title: "Niepoprawna długość utworu",
                message: "Wpisz poprawną długość utworu - liczbę wyrażoną w sekundach.",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateSongMainKey = (
    mainKey: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(mainKey),
                title: "Niepoprawna tonacja",
                message: "Wpisz poprawną tonację utworu.",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateSongPublisher = (
    publisher: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(publisher),
                title: "Niepoprawne wydawnictwo",
                message: "Wpisz wydawnictwo, które wydało utwór.",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateSongTerms = (
    terms: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    const length = 125;
    return validate(
        [
            {
                result: isStringShorterThan(terms, length),
                title: "Niepoprawna licencja",
                message: `Wpisz licencję danego utworu muzycznego, w mniej niż ${length} znakach.`,
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateSongWebsite = (
    website: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isURL(website),
                title: "Niepoprawna strona",
                message: "Wpisz poprawny adres URL strony internetowej.",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateSongYear = (
    year: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isNumber(year),
                title: "Niepoprawny rok",
                message: "Wpisz poprawny rok (wydania bądź nagrania) utworu.",
                errorCallback
            }
        ],
        successCallback
    );
}