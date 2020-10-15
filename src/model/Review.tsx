import Album from "./Album";
import User from "./User";
import { validate, isString, isStringShorterThan } from "./common/validation";
import { isUser } from "./User";

export default interface Review {
    reviewID: number,
    content: string,
    title: string,
    user: User,
    album?: Album
}

export const validateReviewContent = (
    content: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    const length = 400;
    return validate(
        [
            {
                result: isString(content),
                title: "Niepoprawna treść",
                message: "Wpisz treść recenzji albumu.",
                errorCallback
            },
            {
                result: isStringShorterThan(content, length),
                title: "Za długa recenzja",
                message: `Recenzja powinna mieć mniej niż ${length} znaków.`,
                errorCallback
            },
        ],
        successCallback
    );
}

export const validateReviewTitle = (
    title: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isString(title),
                title: "Niepoprawny tytuł recenzji",
                message: "Wpisz poprawny tytuł recenzji.",
                errorCallback
            }
        ],
        successCallback
    );
}

export const validateReviewUser = (
    user: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isUser(user),
                title: "Niepoprawny użytkownik",
                message: "Nie można przypisać recenzji do użytkownika.",
                errorCallback
            }
        ],
        successCallback
    );
}