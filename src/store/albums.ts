import Album from "../model/Album";
import { requestGet, requestPut, requestDelete } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";

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
    store.dispatch(requestGet(`http://localhost:8080/api/albums`, actionSetAlbums));
}
export function getAlbum(id: number) {
    store.dispatch(requestGet(`http://localhost:8080/api/albums/${id}`, actionSetAlbum));
}
export function updateAlbum(id: number) {
    store.dispatch(requestPut(`http://localhost:8080/api/albums/${id}`, {}, actionSetAlbum));
}
export function deleteAlbum(id: number) {
    store.dispatch(requestDelete(`http://localhost:8080/api/albums/${id}`, {}, actionDeleteAlbum));
}