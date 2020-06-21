// DEFAULT STATE
const defaultState = {
    isPending: false,
    hasError: false,
    error: null
}

// ACTION TYPES
const FETCH_PENDING = "FETCH_PENDING";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

// ACTION CREATORS
export const actionFetchPending = () => ({
    type: FETCH_PENDING
});
export const actionFetchSuccess = () => ({
    type: FETCH_SUCCESS
});
export const actionFetchError = (error: Error) => ({
    type: FETCH_ERROR,
    error
});

// REDUCER
export default function reducer(
    state = defaultState,
    action: any
) {
    switch (action.type) {
        case FETCH_PENDING: {
            return {
                isPending: true,
                hasError: false,
                error: null
            };
        }
        case FETCH_SUCCESS: {
            return {
                isPending: false,
                hasError: false,
                error: null
            };
        }
        case FETCH_ERROR: {
            const { error } = action;
            return {
                isPending: false,
                hasError: true,
                error
            };
        }
        default: {
            return state;
        }
    }
}