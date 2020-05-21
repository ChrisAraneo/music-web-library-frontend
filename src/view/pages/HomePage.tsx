import React from "react";
import { Provider, connect } from "react-redux";
import { store, AppState } from "../../store/configureStore";
import AppRouter from "../../router";
import Artist from "../../model/Artist";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../actions/merge";
import { bindActionCreators } from "redux";
import { createArtist, readArtist, deleteArtist, updateArtist } from "../../actions/artist";

import Page from '../components/Page';
import fetchData from "../../service/fetching";
import { FetchState } from "../../reducers/fetchingReducer";

interface HomePageProps {

}

interface IState {

}

type Props = HomePageProps & LinkStateProps & LinkDispatchProps;

class HomePage extends React.Component<Props, IState> {

    dodajWykonawce = () => {
        const artist: Artist = {
            artistID: 10,
            artistName: "Krzysztof P",
            birthDate: new Date(),
            country: "Polska",
            firstName: "Krzysztof",
            lastName: "Pająk",
            artistType: {
                artistTypeID: 1,
                name: "Perkusista"
            }
        };

        this.props.createArtist(artist);
    }

    usunWykonawce = (id: number) => {
        this.props.deleteArtist(id);
    }

    apiTescik = async () => {
        const { fetchData } = this.props;
        fetchData('http://localhost:8080/api/artists', createArtist);
    }

    render = () => {
        const { pending } = this.props.fetching;

        return (
            <Page title="Witam">
                {
                    pending ?
                        (
                            <h1>Czekanie na odpowiedź serwera...</h1>
                        )
                        :
                        null
                }
                <button onClick={this.dodajWykonawce}>Dodaj wykonawce</button>
                <button onClick={() => this.usunWykonawce(1)}>Usun wykonawce</button>
                <button onClick={this.apiTescik}>Usun wykonawce</button>
                <p>{JSON.stringify(this.props)}</p>
            </Page>
        );
    }
};

interface LinkStateProps {
    artists: Artist[],
    fetching: FetchState
}
const mapStateToProps = (
    state: AppState,
    ownProps: HomePageProps
): LinkStateProps => ({
    artists: state.artists,
    fetching: state.fetching
});

interface LinkDispatchProps {
    fetchData: any,
    createArtist: (artist: Artist) => void,
    readArtist: (id: number) => void,
    deleteArtist: (id: number) => void
}
const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>,
    ownProps: HomePageProps
) => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    createArtist: bindActionCreators(createArtist, dispatch),
    readArtist: bindActionCreators(readArtist, dispatch),
    deleteArtist: bindActionCreators(deleteArtist, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);