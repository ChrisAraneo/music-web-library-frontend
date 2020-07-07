import Artist from "./Artist";
import SongURL from "./SongURL";

export default interface Song {
    songID: number,
    title: string,

    bpm?: number
    comment?: string,
    genre?: string,
    language?: string,
    length?: number
    mainKey?: string,
    publisher?: string,
    terms?: string,
    website?: string,
    year?: number,

    albums?: any[],
    artists?: Artist[],
    songURLs?: SongURL[]
}

export interface SongInAlbum {
    id: { trackNumber: number },
    song: Song
}

export interface SongInPlaylist {
    id: { trackNumber: number },
    song: Song
}