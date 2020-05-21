import { FETCH_PENDING, FETCH_SUCCESS, FETCH_ERROR } from "./types";

export interface FetchPendingAction {
    type: typeof FETCH_PENDING
}

export const fetchPending = (): FetchPendingAction => ({
    type: FETCH_PENDING
});

export interface FetchSuccessAction {
    type: typeof FETCH_SUCCESS
}

export const fetchSuccess = (): FetchSuccessAction => ({
    type: FETCH_SUCCESS
});

export interface FetchErrorAction {
    type: typeof FETCH_ERROR,
    payload: string
}

export const fetchError = (error: string): FetchErrorAction => ({
    type: FETCH_ERROR,
    payload: error
});

export type FetchActionTypes =
    | FetchPendingAction
    | FetchSuccessAction
    | FetchErrorAction;