import Album from "../model/Album";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";
import { addSuccessNotification } from "./fetching";
import { API_URI } from "../config";

// DEFAULT STATE
const defaultState: Array<Album> = [];

// ACTION TYPES
const SET_ALBUM = "SET_ALBUM";
const SET_ALBUMS = "SET_ALBUMS";
const DELETE_ALBUM = "DELETE_ALBUM";

// ACTION CREATORS
const actionSetAlbum = (album: Album) => ({
    type: SET_ALBUM,
    album
});
const actionSetAlbums = (albums: Album[]) => ({
    type: SET_ALBUMS,
    albums
});
const actionDeleteAlbum = (id: number) => ({
    type: DELETE_ALBUM,
    id
});

// REDUCER
export default function reducer(
    state = defaultState,
    action: any
) {
    switch (action.type) {
        case SET_ALBUM: {
            const { album } = action;
            return setSingleObject(state, album, album.albumID);
        }
        case SET_ALBUMS: {
            const { albums } = action;
            return setMultipleObjects(state, albums, "albumID");
        }
        case DELETE_ALBUM: {
            return deleteSingleObject(state, action.id);
        }
        default: {
            return state;
        }
    }
}

// PUBLIC ASYNC FUNCTIONS TO USE
export function getAlbumsList() {
    store.dispatch(requestGet(`${API_URI}/albums`, actionSetAlbums));
}
export function getAlbum(id: number, successCallback?: any) {
    store.dispatch(requestGet(`${API_URI}/albums/${id}`,
        (result: Album) => {
            if (typeof successCallback === "function") {
                successCallback(result);
            }
            return actionSetAlbum(result);
        }));
}
export function postAlbum(
    title: string,
    year: number,
    successCallback?: any
) {
    const body: any = {
        title,
        year
    };

    store.dispatch(requestPost(`${API_URI}/albums`, {
        body: JSON.stringify(body)
    }, (result: Album) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Dodano album", "Pomyślnie dodano album muzyczny");
        return actionSetAlbum(result);
    }));
}
export function updateAlbum(album: Album, successCallback?: any) {
    const body: any = {
        albumID: album.albumID,
        title: album.title,
        year: album.year
    };

    store.dispatch(requestPut(`${API_URI}/albums/${album.albumID}`, {
        body: JSON.stringify(body)
    }, (result: Album) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Zapisano zmiany", "Pomyślnie zapisano zmiany");
        return actionSetAlbum(result);
    }));
}
export function deleteAlbum(id: number, successCallback?: any) {
    store.dispatch(requestDelete(`${API_URI}/albums/${id}`, {},
        () => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            addSuccessNotification("Usunięto album", "Pomyślnie usunięto album muzyczny.");
            return actionDeleteAlbum(id);
        }));
}
export function postSongToAlbum(
    albumID: number,
    songID: number,
    track: number,
    successCallback?: any
) {
    store.dispatch(requestPost(`${API_URI}/albums/${albumID}/${songID}/${track}`, {}, (result: Album) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Dodano utwór do albumu", "Pomyślnie dodano utwór muzyczny do albumu");
        return actionSetAlbum(result);
    }));
}
export function deleteSongFromAlbum(
    albumID: number,
    songID: number,
    track: number,
    successCallback?: any
) {
    store.dispatch(requestDelete(`${API_URI}/albums/${albumID}/${songID}/${track}`, {}, (result: Album) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Usunięto utwór z albumu", "Pomyślnie usunięto utwór muzyczny z albumu");
        return actionSetAlbum(result);
    }));
}
export function attachCoverToAlbum(
    albumID: number,
    coverID: number,
    successCallback?: any
) {
    store.dispatch(requestPost(`${API_URI}/covers/${coverID}/${albumID}`, {}, (result: Album) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Dodano okładkę do albumu", "Pomyślnie dodano okładkę do albumu");
        return actionSetAlbum(result);
    }));
}
export function detachCoverFromAlbum(
    coverID: number,
    albumID: number,
    successCallback?: any
) {
    store.dispatch(requestDelete(`${API_URI}/covers/${coverID}/${albumID}`, {}, (result: Album) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Usunięto połączenie", "Pomyślnie usunięto połączenie okładka-album");
        return actionSetAlbum(result);
    }));
}