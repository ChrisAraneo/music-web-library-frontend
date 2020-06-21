import Cover from "./Cover";
import Review from "./Review";
import Song from "./Song";

export default interface Album {
    albumID: number,
    title: string,
    year?: number,
    cover: Cover,
    reviews?: Review[],
    songs?: Song[]
}