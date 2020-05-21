import ArtistType from "./ArtistType";

export default interface Artist {
    artistID: number,
    artistName: string,
    birthDate: Date,
    country: string,
    firstName: string,
    lastName: string,
    artistType: ArtistType
}