import Album from "../model/Album";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";
import { actionFetchSuccess, addSuccessNotification } from "./fetching";
import Cover from "../model/Cover";
import { API_URI } from "../config";

// DEFAULT STATE
const defaultState: Array<Cover> = [];

// ACTION TYPES
const SET_COVER = "SET_COVER";
const SET_COVERS = "SET_COVERS";
const DELETE_COVER = "DELETE_COVER";

// ACTION CREATORS
const actionSetCover = (cover: Cover) => ({
    type: SET_COVER,
    cover
});
const actionSetCovers = (covers: Cover[]) => ({
    type: SET_COVERS,
    covers
});
const actionDeleteCover = (id: number) => ({
    type: DELETE_COVER,
    id
});

// REDUCER
export default function reducer(
    state = defaultState,
    action: any
) {
    switch (action.type) {
        case SET_COVER: {
            const { cover } = action;
            return setSingleObject(state, cover, cover.coverID);
        }
        case SET_COVERS: {
            const { covers } = action;
            return setMultipleObjects(state, covers, "coverID");
        }
        case DELETE_COVER: {
            return deleteSingleObject(state, action.id);
        }
        default: {
            return state;
        }
    }
}

// PUBLIC ASYNC FUNCTIONS TO USE
export function getCoversList() {
    store.dispatch(requestGet(`${API_URI}/covers`, actionSetCovers));
}
export function getCover(id: number, successCallback?: any) {
    store.dispatch(requestGet(`${API_URI}/covers/${id}`,
        (result: Cover) => {
            if (typeof successCallback === "function") {
                successCallback(result);
            }
            return actionSetCover(result);
        }));
}
export function postCover(
    data: string,
    successCallback?: any
) {
    const body: any = {
        data
    };

    store.dispatch(requestPost(`${API_URI}/covers`, {
        body: JSON.stringify(body)
    }, (result: Cover) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Dodano okładkę albumu", "Pomyślnie dodano okładkę albumu");
        return actionSetCover(result);
    }));
}
export function deleteCover(id: number, successCallback?: any) {
    store.dispatch(requestDelete(`${API_URI}/albums/${id}`, {},
        () => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            addSuccessNotification("Usunięto okładkę albumu", "Pomyślnie usunięto okładkę albumu.");
            return actionDeleteCover(id);
        }));
}