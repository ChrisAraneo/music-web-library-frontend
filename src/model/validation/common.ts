import { addValidationErrorNotification } from "../../store/fetching";

export const isString = (input: any): boolean => {
    return Boolean(input && typeof input == "string" && input.length > 0);
}

export const isStringShorterThan = (input: any, length: number): boolean => {
    return Boolean(isString(input) && input.length < length);
}

export const isNumber = (input: any): boolean => {
    return Boolean(input && typeof input == "number" && input > 0);
}

export const isDate = (input: any): boolean => {
    return Boolean(input && input instanceof Date);
}

export const isCountry = (input: any): boolean => {
    return Boolean(input && !(/\d/.test(input)));
}

export const isURL = (input: any): boolean => {
    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    if (input && typeof input == "string") {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(input);
    } else {
        return false;
    }
}

export const isEmail = (input: any): boolean => {
    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    if (input && typeof input == "string") {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !!pattern.test(input);
    } else {
        return false;
    }
}

export const isPassword = (input: any): boolean => {
    const minLength = 6;
    return Boolean(isString(input) && input.length >= minLength);
}

export const identicalPasswords = (input1: any, input2: any): boolean => {
    return Boolean(isString(input1) && isString(input1) && input1 === input2);
}

export interface Condition {
    result: boolean,
    title: string,
    message: string,
    errorCallback?: () => any
}

export const validate = (
    conditions: Condition[],
    successCallback?: () => any
): boolean => {
    let valid = true;
    conditions.forEach((item: Condition) => {
        if (item?.result == false) {
            addValidationErrorNotification(item?.title, item?.message);
            if (typeof item?.errorCallback == "function") {
                item?.errorCallback();
            }
            valid = false;
        }
    });
    if (valid) {
        if (typeof successCallback == "function") {
            successCallback();
        }
        return true;
    }
    return false;
}