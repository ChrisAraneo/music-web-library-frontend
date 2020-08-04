import Song, { SongInAlbum } from "../model/Song";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";
import { addNotification } from "./fetching";

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
export function getSong(id: number, successCallback?: any) {
    store.dispatch(requestGet(`http://localhost:8080/api/songs/${id}`,
        (result: Song) => {
            if (typeof successCallback === "function") {
                successCallback(result);
            }
            return actionSetSong(result);
        }));
}
export function postSong(
    title: string,
    bpm?: number,
    comment?: string,
    genre?: string,
    language?: string,
    length?: number,
    mainKey?: string,
    publisher?: string,
    terms?: string,
    website?: string,
    year?: number,
    successCallback?: any
) {
    const body: any = {
        title,
        bpm,
        comment,
        genre,
        language,
        length,
        mainKey,
        publisher,
        terms,
        website,
        year
    };

    store.dispatch(requestPost(`http://localhost:8080/api/songs`, {
        body: JSON.stringify(body)
    }, (result: Song) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addNotification("Dodano utwór muzyczny", "Pomyślnie dodano utwór muzyczny");
        return actionSetSong(result);
    }));
}
export function updateSong(song: Song, successCallback?: any) {
    const body: any = {
        songID: song?.songID,
        title: song?.title,
        bpm: song?.bpm,
        comment: song?.comment,
        genre: song?.genre,
        language: song?.language,
        length: song?.length,
        mainKey: song?.mainKey,
        publisher: song?.publisher,
        terms: song?.terms,
        website: song?.website,
        year: song?.year
    };

    store.dispatch(requestPut(`http://localhost:8080/api/songs/${song?.songID}`, {
        body: JSON.stringify(body)
    }, (result: Song) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addNotification("Zapisano zmiany", "Pomyślnie zapisano zmiany");
        return actionSetSong(result);
    }));
}
export function deleteSong(id: number, successCallback?: any) {
    store.dispatch(requestDelete(`http://localhost:8080/api/songs/${id}`, {},
        () => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            addNotification("Usunięto utwór", "Pomyślnie usunięto utwór muzyczny");
            return actionDeleteSong(id);
        }));
}
export function postSongURL(
    songID: number,
    url: string,
    successCallback?: any
) {
    const body: any = {
        song: {
            songID
        },
        url
    };

    store.dispatch(requestPost(`http://localhost:8080/api/songurls`, {
        body: JSON.stringify(body)
    }, (result: Song) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addNotification("Dodano URL", "Pomyślnie dodano URL");
        return actionSetSong(result);
    }));
}
export function deleteSongURL(
    songURLID: number,
    successCallback?: any
) {
    store.dispatch(requestDelete(`http://localhost:8080/api/songurls/${songURLID}`, {}, (result: Song) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addNotification("Usunięto URL", "Pomyślnie usunięto URL");
        return actionSetSong(result);
    }));
}