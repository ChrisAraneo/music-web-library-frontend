import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk, { ThunkMiddleware } from "redux-thunk";

import fetchingReducer from "./fetching";
import artistReducer from "./artists";
import artistTypesReducer from "./artistTypes";
import authReducer from "./auth";
import songReducer from "./songs";
import albumReducer from "./albums";
import playlistReducer from "./playlists";
import reviewsReducer from "./reviews";

// CREATING ROUTING HISTORY
export const history = createBrowserHistory();

// ROOT REDUCER
export const rootReducer = combineReducers({
    router: connectRouter(history),
    fetching: fetchingReducer,
    auth: authReducer,
    artists: artistReducer,
    artistTypes: artistTypesReducer,
    songs: songReducer,
    albums: albumReducer,
    playlists: playlistReducer,
    reviews: reviewsReducer
});

// CREATING STORE
export type AppState = ReturnType<typeof rootReducer>;
export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunk as ThunkMiddleware<AppState, any>)
    )
);

store.subscribe(() => console.log(store.getState()));