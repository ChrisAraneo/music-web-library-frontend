import { store } from ".";

// DEFAULT STATE
const defaultState = {
    isPending: false,
    errors: []
}

// ACTION TYPES
const FETCH_PENDING = "FETCH_PENDING";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";
const REMOVE_ERROR = "REMOVE_ERROR";

// ACTION CREATORS
export const actionFetchPending = () => ({
    type: FETCH_PENDING
});
export const actionFetchSuccess = () => ({
    type: FETCH_SUCCESS
});
export const actionFetchError = (error: any) => ({
    type: FETCH_ERROR,
    error
});
export const actionRemoveError = (id: number) => ({
    type: REMOVE_ERROR,
    id
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
                errors: [...state.errors]
            };
        }
        case FETCH_SUCCESS: {
            return {
                isPending: false,
                errors: [...state.errors]
            };
        }
        case FETCH_ERROR: {
            const { error } = action;
            return {
                isPending: false,
                errors: [...state.errors, error]
            };
        }
        case REMOVE_ERROR: {
            const { id } = action;
            const { errors } = state;
            return {
                isPending: state.isPending,
                errors: errors.filter((item: any, index: number) => {
                    if (index != id) {
                        return item;
                    }
                })
            };
        }
        default: {
            return state;
        }
    }
}

// PUBLIC ASYNC FUNCTIONS TO USE
export function removeError(id: number) {
    store.dispatch(actionRemoveError(id));
}