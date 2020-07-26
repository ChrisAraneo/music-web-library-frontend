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
import Page from './view/components/basic/Page';
import AlbumListPage from './view/pages/AlbumListPage';
import ArtistPage from './view/pages/ArtistPage';
import SignUpPage from './view/pages/SignUpPage';
import SignInPage from './view/pages/SignInPage';
import AdminPage from './view/pages/AdminPage';
import AlbumPage from './view/pages/AlbumPage';
import SongPage from './view/pages/SongPage';
import PlaylistListPage from './view/pages/PlaylistListPage';
import PlaylistPage from './view/pages/PlaylistPage';
import ReviewPage from './view/pages/ReviewPage';
import WriteReviewPage from './view/pages/WriteReviewPage';
import AdminArtistPage from './view/pages/AdminArtistPage';

export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={theme}>
                    <Page title="Internetowy katalog muzyczny">
                        <Switch>
                            <Route path="/signup" component={SignUpPage} />
                            <Route path="/signin" component={SignInPage} />
                            <Route path="/artists" exact component={ArtistListPage} />
                            <Route path="/artists/:artistID?" component={ArtistPage} />
                            <Route path="/admin" exact component={AdminPage} />
                            <Route path="/admin/artists" component={AdminArtistPage} />
                            <Route path="/songs" exact component={SongListPage} />
                            <Route path="/songs/:songID?" component={SongPage} />
                            <Route path="/albums" exact component={AlbumListPage} />
                            <Route path="/albums/:albumID?" component={AlbumPage} />
                            <Route path="/playlists" exact component={PlaylistListPage} />
                            <Route path="/playlists/:playlistID?" component={PlaylistPage} />
                            <Route path="/reviews/:reviewID?" component={ReviewPage} />
                            <Route path="/writereview/:albumID?/:reviewID?" exact component={WriteReviewPage} />
                            <Route path="/writereview/:albumID?" component={WriteReviewPage} />
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
