import Artist from "../model/Artist";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";
import ArtistType from "../model/ArtistType";
import { addSuccessNotification } from "./fetching";
import { API_URI } from "../config";

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
    store.dispatch(requestGet(`${API_URI}/artists`, actionSetArtists));
}
export function getArtist(id: number, successCallback?: any) {
    store.dispatch(requestGet(`${API_URI}/artists/${id}`,
        (result: Artist) => {
            if (typeof successCallback === "function") {
                successCallback(result);
            }
            return actionSetArtist(result);
        }));
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
        artistType
    };

    store.dispatch(requestPost(`${API_URI}/artists`, {
        body: JSON.stringify(body)
    }, (result: Artist) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Dodano wykonawcę", "Pomyślnie dodano wykonawcę");
        return actionSetArtist(result);
    }));
}
export function updateArtist(artist: Artist, successCallback?: any) {
    const body: any = {
        artistID: artist.artistID,
        artistName: artist.artistName,
        birthDate: artist.birthDate,
        country: artist.country,
        firstName: artist.firstName,
        lastName: artist.lastName,
        artistType: artist.artistType?.artistTypeID
    };

    store.dispatch(requestPut(`${API_URI}/artists/${artist.artistID}`, {
        body: JSON.stringify(body)
    }, (result: Artist) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Zapisano zmiany", "Pomyślnie zapisano zmiany");
        return actionSetArtist(result);
    }));
}
export function deleteArtist(id: number, successCallback?: any) {
    store.dispatch(requestDelete(`${API_URI}/artists/${id}`, {},
        () => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            addSuccessNotification("Usunięto wykonawcę", "Pomyślnie usunięto wykonawcę");
            return actionDeleteArtist(id);
        }));
}
export function postArtistURL(
    artistID: number,
    url: string,
    successCallback?: any
) {
    const body: any = {
        artist: {
            artistID
        },
        url
    };

    store.dispatch(requestPost(`${API_URI}/artisturls`, {
        body: JSON.stringify(body)
    }, (result: Artist) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Dodano URL", "Pomyślnie dodano URL");
        return actionSetArtist(result);
    }));
}
export function deleteArtistURL(
    artistURLID: number,
    successCallback?: any
) {
    store.dispatch(requestDelete(`${API_URI}/artisturls/${artistURLID}`, {}, (result: Artist) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Usunięto URL", "Pomyślnie usunięto URL");
        return actionSetArtist(result);
    }));
}
export function attachSongToArtist(
    artistID: number,
    songID: number,
    successCallback?: any
) {
    store.dispatch(requestPost(`${API_URI}/artists/${artistID}/${songID}`, {}, (result: Artist) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Połączono utwór z wykonawcą", "Pomyślnie połączono utwór muzyczny z wykonawcą");
        return actionSetArtist(result);
    }));
}
export function detachSongFromArtist(
    artistID: number,
    songID: number,
    successCallback?: any
) {
    store.dispatch(requestDelete(`${API_URI}/artists/${artistID}/${songID}`, {}, (result: Artist) => {
        if (typeof successCallback === "function") {
            successCallback(result);
        }
        addSuccessNotification("Usunięto połączenie", "Pomyślnie usunięto połączenie wykonawca-utwór");
        return actionSetArtist(result);
    }));
}