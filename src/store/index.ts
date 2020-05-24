import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import fetchingReducer from "./fetching";
import artistReducer from "./artists";

export const rootReducer = combineReducers({
    fetching: fetchingReducer,
    artists: artistReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, any>)
);

store.subscribe(() => console.log(store.getState()));