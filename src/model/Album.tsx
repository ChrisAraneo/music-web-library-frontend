import Cover from "./Cover";
import Review from "./Review";
import Song, { SongInAlbum } from "./Song";
import Artist from "./Artist";

export default interface Album {
    albumID: number,
    title: string,
    year: number,
    artists?: Artist[],

    cover?: Cover,
    reviews?: Review[],
    songs?: SongInAlbum[]
}