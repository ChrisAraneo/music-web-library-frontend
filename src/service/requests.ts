import { actionFetchPending, actionFetchSuccess, actionFetchError } from "../store/fetching";
import { store } from "../store/index";

function request(
    url: string,
    options: any,
    successCallback: (arg: any) => { type: string },
    errorCallback?: (arg: any) => { type: string }
) {
    const { auth } = store.getState();
    if (options && (options.headers && auth.token)) {
        options.headers = { ...options.headers, "Authentication": auth.token }
    }
    return (dispatch: any) => {
        dispatch(actionFetchPending());
        fetch(url, options)
            .then(result => result.json())
            .then(result => {
                if (result.error) {
                    dispatch(actionFetchError(result.error))
                    throw (result.error);
                }
                console.log(result);
                dispatch(actionFetchSuccess());
                dispatch(successCallback(result));
                return result;
            })
            .catch(error => {
                dispatch(actionFetchError(error));
                if (typeof errorCallback === "function") {
                    dispatch(errorCallback(error));
                }
            });
    }
}

export function requestGet(
    url: string,
    actionSuccess: (arg: any) => { type: string },
    actionError?: (arg: any) => { type: string }
) {
    return request(url, { method: "GET" }, actionSuccess, actionError);
}

export function requestPost(
    url: string,
    options: object,
    actionSuccess: (arg: any) => { type: string },
    actionError?: (arg: any) => { type: string }
) {
    return request(url, {
        ...options,
        method: "POST",
        headers: {
            "Content-Type": "application/json;",
        }
    }, actionSuccess, actionError);
}

export function requestPut(
    url: string,
    options: object,
    actionSuccess: (arg: any) => { type: string },
    actionError?: (arg: any) => { type: string }
) {
    return request(url, {
        ...options,
        method: "PUT",
        headers: {
            "Content-Type": "application/json;",
        }
    }, actionSuccess, actionError);
}

export function requestDelete(
    url: string,
    options: object,
    actionSuccess: (arg: any) => { type: string },
    actionError?: (arg: any) => { type: string }
) {
    return request(url, { ...options, method: "DELETE" }, actionSuccess, actionError);
}