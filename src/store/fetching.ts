// DEFAULT STATE
const defaultState = {
    isPending: false,
    hasError: false,
    errorMessage: ""
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
export const actionFetchError = (message: string) => ({
    type: FETCH_ERROR,
    message
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
                errorMessage: ""
            };
        }
        case FETCH_SUCCESS: {
            return {
                isPending: false,
                hasError: false,
                errorMessage: ""
            };
        }
        case FETCH_ERROR: {
            const { message } = action;
            return {
                isPending: false,
                hasError: true,
                errorMessage: message
            };
        }
        default: {
            return state;
        }
    }
}