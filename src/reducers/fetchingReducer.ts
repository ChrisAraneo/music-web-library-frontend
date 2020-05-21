import { FETCH_PENDING, FETCH_SUCCESS, FETCH_ERROR } from "../actions/types";
import { FetchActionTypes } from "../actions/fetching";

export interface FetchState {
    pending: boolean,
    hasFailed: boolean,
    errorMessage: string
}

const defaultState = {
    pending: false,
    hasFailed: false,
    errorMessage: ""
};

const fetchingReducer = (
    state = defaultState,
    action: FetchActionTypes
): FetchState => {
    switch (action.type) {
        case FETCH_PENDING: {
            return {
                pending: true,
                hasFailed: false,
                errorMessage: ""
            };
        }
        case FETCH_SUCCESS: {
            return {
                pending: false,
                hasFailed: false,
                errorMessage: ""
            };
        }
        case FETCH_ERROR: {
            return {
                pending: false,
                hasFailed: true,
                errorMessage: action.payload
            };
        }
        default:
            return state;
    }
};

export { fetchingReducer };