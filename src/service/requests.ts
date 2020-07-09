import { actionFetchPending, actionFetchSuccess, actionFetchError } from "../store/fetching";
import { store } from "../store/index";

function request(
    url: string,
    options: any,
    successCallback: (arg: any) => { type: string },
    errorCallback?: (arg: any) => { type: string }
) {
    const { auth } = store.getState();

    return (dispatch: any) => {
        dispatch(actionFetchPending());
        fetch(url,
            {
                ...options,
                headers: {
                    "Authorization": `Bearer ${auth.token}`,
                    "Content-Type": "application/json;",
                    ...options.headers
                }
            })
            .then(result => {
                console.log("STATUS", result.status);
                const json = result.json();
                return json;
            })
            .then(json => {
                console.log("JSON", json);
                if (json.error) {
                    dispatch(actionFetchError(json.error))
                    throw (json.error);
                }
                // console.log(result); // TESTING PURPOSES
                dispatch(actionFetchSuccess());
                dispatch(successCallback(json));
                return json;
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
        method: "POST"
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
        method: "PUT"
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