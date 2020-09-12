import ArtistType from "./ArtistType";
import ArtistURL from "./ArtistURL";
import Album from "./Album";
import { isString, validate, isDate, isCountry } from "./validation/common";

export default interface Artist {
    artistID: number,
    artistName: string,
    birthDate?: Date,
    country?: string,
    firstName?: string,
    lastName?: string,
    artistType?: ArtistType
    albums?: Album[],
    urls?: ArtistURL[]
}

export const validateArtistName = (
    artistName: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(artistName),
                title: "Niepoprawna nazwa wykonawcy",
                message: "Wpisz poprawną nazwę wykonawcy",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateArtistBirthDate = (
    birthDate: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isDate(birthDate),
                title: "Niepoprawna data",
                message: "Wprowadź poprawną",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateArtistCountry = (
    country: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: Boolean(isString(country) && isCountry(country)),
                title: "Niepoprawny kraj",
                message: "Wpisz kraj",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateArtistFirstName = (
    firstName: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(firstName),
                title: "Niepoprawne imię",
                message: "Wpisz poprawne imię",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateArtistLastName = (
    lastName: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(lastName),
                title: "Niepoprawne nazwisko",
                message: "Wpisz poprawne nazwisko",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateArtistType = (
    artistType?: ArtistType,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    if (artistType) {
        return validate(
            [
                {
                    result: isString(artistType?.name),
                    title: "Niepoprawny typ",
                    message: "Wybierz poprawny typ działalności muzycznej wykonawcy",
                    errorCallback
                }
            ],
            successCallback
        );
    }
    return false;
}