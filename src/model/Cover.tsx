import { validate, isURL } from "./common/validation";

export default interface Cover {
    coverID: number,
    data?: any
}

export const validateCoverData = (
    data: unknown,
    successCallback?: () => any,
    errorCallback?: () => any
): boolean => {
    return validate(
        [
            {
                result: isURL(data),
                title: "Niepoprawny url do okładki",
                message: "Wpisz poprawny url do obrazu okładki",
                errorCallback
            }
        ],
        successCallback
    );
}