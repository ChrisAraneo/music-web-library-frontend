import { CREATE_ARTIST, READ_ARTIST, UPDATE_ARTIST, DELETE_ARTIST } from "../actions/types";
import { ArtistActionTypes, AppActions } from "../actions/actions";
import Artist from "../model/Artist";

const expensesReducerDefaultState: Artist[] = [];

const artistReducer = (
    state = expensesReducerDefaultState,
    action: ArtistActionTypes
): Artist[] => {
    switch (action.type) {
        case CREATE_ARTIST: {
            const artist: Artist = action.payload;
            return [...state, artist];
        }
        case READ_ARTIST: {
            return state;
        }
        case UPDATE_ARTIST: {
            return state;
        }
        case DELETE_ARTIST: {
            return state;
        }
        default:
            return state;
    }
};

export { artistReducer };