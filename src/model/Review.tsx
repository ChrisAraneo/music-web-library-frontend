import Album from "./Album";
import User from "./User";

export default interface Review {
    reviewID: number,
    content: string,
    title: string,
    album: Album,
    user: User
}