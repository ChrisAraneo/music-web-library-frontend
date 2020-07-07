import ArtistType from "./ArtistType";
import ArtistURL from "./ArtistURL";
import Album from "./Album";

export default interface Artist {
    artistID: number,
    artistName: string,

    birthDate?: Date,
    country?: string,
    firstName?: string,
    lastName?: string,
    artistType?: ArtistType

    albums?: Album[],
    urls?: ArtistURL[]
}