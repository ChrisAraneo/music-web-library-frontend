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
        const headers: any = { "Content-Type": "application/json;" };
        if (auth.token) {
            headers["Authorization"] = `Bearer ${auth.token}`;
        }
        fetch(url,
            {
                ...options,
                headers: {
                    ...headers,
                    ...options.headers
                }
            })
            .then((result: Response) => {
                const status = result.status;
                const json = result.json();

                if (Math.floor(status / 100) != 2) {
                    throw json;
                }

                return json;
            })
            .then((json: object) => {
                dispatch(actionFetchSuccess());
                dispatch(successCallback(json));
                return json;
            })
            .catch((error: any) => {
                if (error) {
                    if (typeof error.then == "function") {
                        error.then((json: any) => {
                            dispatch(actionFetchError(json));
                            if (typeof errorCallback === "function") {
                                dispatch(errorCallback(error));
                            }
                        });
                    } else {
                        console.error("ERROR", error);
                    }
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