import Playlist from "../model/Playlist";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";
import { addSuccessNotification } from "./fetching";
import { API_URI } from "../config";

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
    store.dispatch(requestGet(`${API_URI}/playlists`, actionSetPlaylists));
}
export function getPlaylist(id: number, successCallback?: any) {
    store.dispatch(requestGet(`${API_URI}/playlists/${id}`,
        (result: Playlist) => {
            if (typeof successCallback === "function") {
                successCallback(result);
            }
            return actionSetPlaylist(result);
        }));
}
export function postPlaylist(title: string, successCallback?: any) {
    const body: any = { title };

    store.dispatch(requestPost(
        `${API_URI}/playlists`, {
        body: JSON.stringify(body)
    },
        (result) => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            addSuccessNotification("Utworzono listę utworów", "Pomyślnie utworzono listę utworów");
            return actionSetPlaylist(result);
        })
    );
}
export function updatePlaylist(playlist: Playlist, successCallback?: any) {
    const body: any = {
        playlistID: playlist.playlistID,
        title: playlist.title
    };

    store.dispatch(requestPut(`${API_URI}/playlists/${playlist.playlistID}`, {
        body: JSON.stringify(body)
    }, (result: Playlist) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Zapisano zmiany", "Pomyślnie zapisano zmiany");
        return actionSetPlaylist(result);
    }));
}
export function deletePlaylist(id: number, successCallback?: any) {
    store.dispatch(requestDelete(`${API_URI}/playlists/${id}`, {},
        () => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            addSuccessNotification("Usunięto listę utworów", "Pomyślnie usunięto listę utworów.");
            return actionDeletePlaylist(id);
        }));
}
export function addRecordToPlaylist(playlistID: number, songID: number) {
    store.dispatch(requestPost(`${API_URI}/playlists/${playlistID}/${songID}`, {},
        (playlist: Playlist) => {
            addSuccessNotification("Dodano utwór do listy", "Pomyślnie dodano utwór do listy.");
            return actionSetPlaylist(playlist);
        })
    );
}
export function deleteRecordFromPlaylist(playlistID: number, track: number) {
    store.dispatch(requestDelete(`${API_URI}/playlists/${playlistID}/${track}`, {},
        (playlist: Playlist) => {
            addSuccessNotification("Usunięto utwór z listy", "Pomyślnie usunięto utwór z listy utworów.");
            return actionSetPlaylist(playlist);
        }));
}