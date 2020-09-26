import Playlist from "../model/Playlist";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";
import { addSuccessNotification } from "./fetching";

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
    const body: any = { title };

    store.dispatch(requestPost(
        `http://localhost:8080/api/playlists`, {
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

    store.dispatch(requestPut(`http://localhost:8080/api/playlists/${playlist.playlistID}`, {
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
    store.dispatch(requestDelete(`http://localhost:8080/api/playlists/${id}`, {},
        () => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            addSuccessNotification("Usunięto listę utworów", "Pomyślnie usunięto listę utworów.");
            return actionDeletePlaylist(id);
        }));
}
export function addRecordToPlaylist(playlistID: number, songID: number) {
    store.dispatch(requestPost(`http://localhost:8080/api/playlists/${playlistID}/${songID}`, {},
        (playlist: Playlist) => {
            addSuccessNotification("Dodano utwór do listy", "Pomyślnie dodano utwór do listy.");
            return actionSetPlaylist(playlist);
        })
    );
}
export function deleteRecordFromPlaylist(playlistID: number, track: number) {
    store.dispatch(requestDelete(`http://localhost:8080/api/playlists/${playlistID}/${track}`, {},
        (playlist: Playlist) => {
            addSuccessNotification("Usunięto utwór z listy", "Pomyślnie usunięto utwór z listy utworów.");
            return actionSetPlaylist(playlist);
        }));
}