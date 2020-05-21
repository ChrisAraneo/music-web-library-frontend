import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { artistReducer } from "../reducers/artistReducer";
import { AppActions } from "../actions/actions";

export const rootReducer = combineReducers({
    artists: artistReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);

store.subscribe(() => console.log(store.getState()));