import User from "./User";
import { SongInPlaylist } from "./Song";

export default interface Artist {
    playlistID: number,
    title: string,

    user: User,
    songs?: SongInPlaylist[]
}