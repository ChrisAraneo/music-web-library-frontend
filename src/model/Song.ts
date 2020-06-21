import Artist from "./Artist";

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
    artists?: Artist[]
}