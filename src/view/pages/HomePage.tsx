import React from "react";
import { Provider, connect } from "react-redux";
import { store, AppState } from "../../store/configureStore";
import AppRouter from "../../router";
import Artist from "../../model/Artist";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../actions/actions";
import { bindActionCreators } from "redux";
import { createArtist, readArtist, deleteArtist, updateArtist } from "../../actions/actions";

import Page from '../components/Page';

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

    render = () => {

        return (
            <Page title="Witam">

            </Page>
        );
    }
};

interface LinkStateProps {
    artists: Artist[];
}

const mapStateToProps = (
    state: AppState,
    ownProps: HomePageProps
): LinkStateProps => ({
    artists: state.artists
});

interface LinkDispatchProps {
    createArtist: (artist: Artist) => void;
}
const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>,
    ownProps: HomePageProps
): LinkDispatchProps => ({
    createArtist: bindActionCreators(createArtist, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);