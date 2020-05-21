import Artist from '../model/Artist';
import { CREATE_ARTIST, READ_ARTIST, UPDATE_ARTIST, DELETE_ARTIST } from "./types";

export interface CreateArtistAction {
    type: typeof CREATE_ARTIST,
    payload: Artist
}

export const createArtist = (artist: Artist): CreateArtistAction => ({
    type: CREATE_ARTIST,
    payload: artist
});

export interface ReadArtistAction {
    type: typeof READ_ARTIST,
    payload: number
}

export const readArtist = (artistID: number): ReadArtistAction => ({
    type: READ_ARTIST,
    payload: artistID
});

export interface UpdateArtistAction {
    type: typeof UPDATE_ARTIST,
    payload: Artist
}

export const updateArtist = (artist: Artist): UpdateArtistAction => ({
    type: UPDATE_ARTIST,
    payload: artist
});

export interface DeleteArtistAction {
    type: typeof DELETE_ARTIST,
    payload: number
}

export const deleteArtist = (artistID: number): DeleteArtistAction => ({
    type: DELETE_ARTIST,
    payload: artistID
});

export type ArtistActionTypes =
    | CreateArtistAction
    | ReadArtistAction
    | UpdateArtistAction
    | DeleteArtistAction;