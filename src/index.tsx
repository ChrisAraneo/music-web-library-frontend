import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import { store } from "./store/index";
// import AppRouter from "./router";

import { ConnectedRouter } from 'connected-react-router'

import { Router, Route, Switch, Link, NavLink } from "react-router-dom";

import { history } from "./store/index";

import HomePage from "./view/pages/HomePage";
import ArtistListPage from './view/pages/ArtistListPage';
import { ThemeProvider } from '@material-ui/core';
import theme from "./view/theme/theme";
import SongListPage from './view/pages/SongListPage';
import Page from './view/components/Page';
import AlbumListPage from './view/pages/AlbumListPage';
import ArtistPage from './view/pages/ArtistPage';

export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={theme}>
                    <Page title="Internetowy katalog muzyczny">
                        <Switch>
                            <Route path="/artists" exact component={ArtistListPage} />
                            <Route path="/artists/:artistID?" component={ArtistPage} />
                            <Route path="/songs" component={SongListPage} />
                            <Route path="/albums" component={AlbumListPage} />
                            <Route path="/" component={HomePage} />
                        </Switch>
                    </Page>
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
