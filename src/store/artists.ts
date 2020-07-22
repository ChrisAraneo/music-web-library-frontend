import Artist from "../model/Artist";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";
import ArtistType from "../model/ArtistType";

// DEFAULT STATE
const defaultState: Array<Artist> = [];

// ACTION TYPES
const SET_ARTIST = "SET_ARTIST";
const SET_ARTISTS = "SET_ARTISTS";
const DELETE_ARTIST = "DELETE_ARTIST";

// ACTION CREATORS
const actionSetArtist = (artist: Artist) => ({
    type: SET_ARTIST,
    artist
});
const actionSetArtists = (artists: Artist[]) => ({
    type: SET_ARTISTS,
    artists
});
const actionDeleteArtist = (id: number) => ({
    type: DELETE_ARTIST,
    id
});

// REDUCER
export default function reducer(
    state = defaultState,
    action: any
) {
    switch (action.type) {
        case SET_ARTIST: {
            const { artist } = action;
            return setSingleObject(state, artist, artist.artistID);
        }
        case SET_ARTISTS: {
            const { artists } = action;
            return setMultipleObjects(state, artists, "artistID");
        }
        case DELETE_ARTIST: {
            return deleteSingleObject(state, action.id);
        }
        default: {
            return state;
        }
    }
}

// PUBLIC ASYNC FUNCTIONS TO USE
export function getArtistsList() {
    store.dispatch(requestGet(`http://localhost:8080/api/artists`, actionSetArtists));
}
export function getArtist(id: number) {
    store.dispatch(requestGet(`http://localhost:8080/api/artists/${id}`, actionSetArtist));
}
export function postArtist(
    artistName: string,
    birthDate?: string,
    country?: string,
    firstName?: string,
    lastName?: string,
    artistType?: ArtistType,
    successCallback?: any
) {
    const body: any = {
        artistName,
        birthDate,
        country,
        firstName,
        lastName,
        artistType: artistType?.artistTypeID
    };

    store.dispatch(requestPost(`http://localhost:8080/api/artists`, {
        body: JSON.stringify(body)
    }, (result: Artist) => {
        if (typeof successCallback === "function") {
            successCallback();
        }
        return actionSetArtist(result);
    }));
}
export function updateArtist(id: number) {
    store.dispatch(requestPut(`http://localhost:8080/api/artists/${id}`, {}, actionSetArtist));
}
export function deleteArtist(id: number) {
    store.dispatch(requestDelete(`http://localhost:8080/api/artists/${id}`, {}, actionDeleteArtist));
}