import Song from "../model/Song";
import { requestGet, requestPut, requestDelete } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";

// DEFAULT STATE
const defaultState: Array<Song> = [];

// ACTION TYPES
const SET_SONG = "SET_SONG";
const SET_SONGS = "SET_SONGS";
const DELETE_SONG = "DELETE_SONG";

// ACTION CREATORS
const actionSetSong = (song: Song) => ({
    type: SET_SONG,
    song
});
const actionSetSongs = (songs: Song[]) => ({
    type: SET_SONGS,
    songs
});
const actionDeleteSong = (id: number) => ({
    type: DELETE_SONG,
    id
});

// REDUCER
export default function reducer(
    state = defaultState,
    action: any
) {
    switch (action.type) {
        case SET_SONG: {
            const { song } = action;
            return setSingleObject(state, song, song.songID);
        }
        case SET_SONGS: {
            const { songs } = action;
            return setMultipleObjects(state, songs, "songID");
        }
        case DELETE_SONG: {
            return deleteSingleObject(state, action.id);
        }
        default: {
            return state;
        }
    }
}

// PUBLIC ASYNC FUNCTIONS TO USE
export function getSongsList() {
    store.dispatch(requestGet(`http://localhost:8080/api/songs`, actionSetSongs));
}
export function getSong(id: number) {
    store.dispatch(requestGet(`http://localhost:8080/api/songs/${id}`, actionSetSong));
}
export function updateSong(id: number) {
    store.dispatch(requestPut(`http://localhost:8080/api/songs/${id}`, actionSetSong));
}
export function deleteSong(id: number) {
    store.dispatch(requestDelete(`http://localhost:8080/api/songs/${id}`, actionDeleteSong));
}