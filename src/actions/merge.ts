import { ArtistActionTypes } from "./artist";
import { FetchActionTypes } from "./fetching";

export type AppActions = FetchActionTypes | ArtistActionTypes;