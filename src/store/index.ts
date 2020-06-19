import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk, { ThunkMiddleware } from "redux-thunk";

import fetchingReducer from "./fetching";
import artistReducer from "./artists";

// CREATING ROUTING HISTORY
export const history = createBrowserHistory();

// ROOT REDUCER
export const rootReducer = combineReducers({
    router: connectRouter(history),
    fetching: fetchingReducer,
    artists: artistReducer
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