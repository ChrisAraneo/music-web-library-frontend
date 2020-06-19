import React from "react";
import { Provider, connect } from "react-redux";
import { store, AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { getArtistsList, getArtist } from "../../store/artists";

import Page from '../components/Page';

interface HomePageProps {

}

interface IState {

}

type Props = HomePageProps & LinkStateProps;

class HomePage extends React.Component<Props, IState> {

    render = () => {

        const { isPending } = this.props.fetching;
        const { artists } = this.props;

        return (
            <Page title="Witam">
                {
                    isPending ?
                        (
                            <h1>Czekanie na odpowiedź serwera...</h1>
                        )
                        :
                        null
                }
                <button onClick={() => getArtistsList()}>Pobierz listę wykonawców</button>
                <ul>
                    {
                        artists ?
                            artists.map((artist: any) => {
                                if (artist) {
                                    return (
                                        <li key={artist.artistID}>
                                            <button onClick={() => getArtist(artist.artistID)}>
                                                {artist.artistName}
                                            </button>
                                            <p>{artist.firstName}</p>
                                            <p>{artist.lastName}</p>
                                        </li>
                                    );
                                }
                                return null;
                            })
                            :
                            (<li><h2>Brak wykonawców</h2></li>)
                    }
                </ul>
                <br />
                <br />
                <p>{JSON.stringify(this.props)}</p>
            </Page >
        );
    }
};

interface LinkStateProps {
    fetching: any,
    artists: Artist[]
}
const mapStateToProps = (
    state: AppState,
    ownProps: HomePageProps
): LinkStateProps => ({
    fetching: state.fetching,
    artists: state.artists
});

export default connect(mapStateToProps, null)(HomePage);