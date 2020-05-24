import { actionFetchPending, actionFetchSuccess, actionFetchError } from "../store/fetching";

function request(
    url: string,
    options: Object,
    successCallback: (arg: any) => { type: string },
    errorCallback?: (arg: any) => { type: string }
) {
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
    const options = {
        method: "GET"
    }
    return request(url, options, actionSuccess, actionError);
}

export function requestPost(
    url: string,
    actionSuccess: (arg: any) => { type: string },
    actionError?: (arg: any) => { type: string }
) {
    const options = {
        method: "POST"
    }
    return request(url, options, actionSuccess, actionError);
}

export function requestPut(
    url: string,
    actionSuccess: (arg: any) => { type: string },
    actionError?: (arg: any) => { type: string }
) {
    const options = {
        method: "PUT"
    }
    return request(url, options, actionSuccess, actionError);
}

export function requestDelete(
    url: string,
    actionSuccess: (arg: any) => { type: string },
    actionError?: (arg: any) => { type: string }
) {
    const options = {
        method: "DELETE"
    }
    return request(url, options, actionSuccess, actionError);
}