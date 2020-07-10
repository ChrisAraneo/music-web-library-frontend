import Playlist from "../model/Playlist";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";

// DEFAULT STATE
const defaultState: Array<Playlist> = [];

// ACTION TYPES
const SET_PLAYLIST = "SET_PLAYLIST";
const SET_PLAYLISTS = "SET_PLAYLISTS";
const DELETE_PLAYLIST = "DELETE_PLAYLIST";

// ACTION CREATORS
const actionSetPlaylist = (playlist: Playlist) => ({
    type: SET_PLAYLIST,
    playlist
});
const actionSetPlaylists = (playlists: Playlist[]) => ({
    type: SET_PLAYLISTS,
    playlists
});
const actionDeletePlaylist = (id: number) => ({
    type: DELETE_PLAYLIST,
    id
});

// REDUCER
export default function reducer(
    state = defaultState,
    action: any
) {
    switch (action.type) {
        case SET_PLAYLIST: {
            const { playlist } = action;
            return setSingleObject(state, playlist, playlist.playlistID);
        }
        case SET_PLAYLISTS: {
            const { playlists } = action;
            return setMultipleObjects(state, playlists, "playlistID");
        }
        case DELETE_PLAYLIST: {
            return deleteSingleObject(state, action.id);
        }
        default: {
            return state;
        }
    }
}

// PUBLIC ASYNC FUNCTIONS TO USE 
export function getPlaylistsList() {
    store.dispatch(requestGet(`http://localhost:8080/api/playlists`, actionSetPlaylists));
}
export function getPlaylist(id: number) {
    store.dispatch(requestGet(`http://localhost:8080/api/playlists/${id}`, actionSetPlaylist));
}
export function postPlaylist(title: string, successCallback?: any) {
    const details: any = {
        'title': title
    };

    let formBody = [];
    for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    store.dispatch(requestPost(
        `http://localhost:8080/api/playlists`,
        {
            body: formBody.join("&"),
            headers: {
                "Content-Type": `application/x-www-form-urlencoded; charset=UTF-8`
            }
        },
        (result) => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            return actionSetPlaylist(result);
        }));
}
export function updatePlaylist(id: number) {
    store.dispatch(requestPut(`http://localhost:8080/api/playlists/${id}`, {}, actionSetPlaylist));
}
export function deletePlaylist(id: number) {
    store.dispatch(requestDelete(`http://localhost:8080/api/playlists/${id}`, {},
        () => actionDeletePlaylist(id)));
}
export function addRecordToPlaylist(playlistID: number, songID: number) {
    store.dispatch(requestPost(`http://localhost:8080/api/playlists/${playlistID}/${songID}`, {}, (playlist: Playlist) => actionSetPlaylist(playlist)));
}
export function deleteRecordFromPlaylist(playlistID: number, track: number) {
    store.dispatch(requestDelete(`http://localhost:8080/api/playlists/${playlistID}/${track}`, {}, (playlist: Playlist) => actionSetPlaylist(playlist)));
}