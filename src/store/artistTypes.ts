import ArtistType from "../model/ArtistType";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";
import { addSuccessNotification } from "./fetching";

// DEFAULT STATE
const defaultState: Array<ArtistType> = [];

// ACTION TYPES
const SET_ARTIST_TYPE = "SET_ARTIST_TYPE";
const SET_ARTIST_TYPES = "SET_ARTIST_TYPES";
const DELETE_ARTIST_TYPE = "DELETE_ARTIST_TYPE";

// ACTION CREATORS
const actionSetArtistType = (artistType: ArtistType) => ({
    type: SET_ARTIST_TYPE,
    artistType
});
const actionSetArtistTypes = (artistTypes: ArtistType[]) => ({
    type: SET_ARTIST_TYPES,
    artistTypes
});
const actionDeleteArtistType = (id: number) => ({
    type: DELETE_ARTIST_TYPE,
    id
});

// REDUCER
export default function reducer(
    state = defaultState,
    action: any
) {
    switch (action.type) {
        case SET_ARTIST_TYPE: {
            const { artistType } = action;
            return setSingleObject(state, artistType, artistType.artistTypeID);
        }
        case SET_ARTIST_TYPES: {
            const { artistTypes } = action;
            return setMultipleObjects(state, artistTypes, "artistTypeID");
        }
        case DELETE_ARTIST_TYPE: {
            return deleteSingleObject(state, action.id);
        }
        default: {
            return state;
        }
    }
}

// PUBLIC ASYNC FUNCTIONS TO USE
export function getArtistTypesList() {
    store.dispatch(requestGet(`http://localhost:8080/api/artisttypes`, actionSetArtistTypes));
}
export function getArtistType(id: number, successCallback?: any) {
    store.dispatch(requestGet(`http://localhost:8080/api/artisttypes/${id}`,
        (result: ArtistType) => {
            if (typeof successCallback === "function") {
                successCallback(result);
            }
            return actionSetArtistType(result);
        })
    );
}
export function postArtistType(
    name: string,
    successCallback?: any
) {
    const body: any = {
        name,
    };

    store.dispatch(requestPost(`http://localhost:8080/api/artisttypes`, {
        body: JSON.stringify(body)
    }, (result: ArtistType) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Dodano rodzaj", "Pomyślnie dodano rodzaj działalności muzycznej");
        return actionSetArtistType(result);
    }));
}
export function updateArtistType(type: ArtistType, successCallback?: any) {
    const body: any = {
        artistTypeID: type.artistTypeID,
        name: type.name
    };

    store.dispatch(requestPut(`http://localhost:8080/api/artisttypes/${type.artistTypeID}`, {
        body: JSON.stringify(body)
    }, (result: ArtistType) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Zapisano zmiany", "Pomyślnie zapisano zmiany");
        return actionSetArtistType(result);
    }));
}
export function deleteArtistType(id: number) {
    store.dispatch(requestDelete(`http://localhost:8080/api/artisttypes/${id}`, {},
        () => {
            addSuccessNotification("Usunięto", "Pomyślnie usunięto rodzaj działalności muzycznej");
            return actionDeleteArtistType(id);
        }));
}