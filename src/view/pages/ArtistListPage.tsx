import React from "react";
import { Provider, connect } from "react-redux";
import { store, AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { getArtistsList, getArtist } from "../../store/artists";

import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Page from '../components/Page';
import Card from "../components/Card";
import Table from "../components/Table";

interface IProps {

}

interface IState {

}

type Props = IProps & LinkStateProps;

class ArtistListPage extends React.Component<Props, IState> {

    componentDidMount() {
        getArtistsList();
    }

    processData = (artists: Array<Artist>) => {
        const data: any[] = [];
        artists.forEach(artist => {
            if (artist) {
                const item = {
                    "Nazwa wykonawcy": (<Link component={RouterLink} to={`/artist/${artist.artistID}`}>
                        {artist.artistName}
                    </Link>)
                };
                data.push(item);
            }
        });
        return data;
    }

    render = () => {
        const { isPending } = this.props.fetching;
        const { artists } = this.props;

        const data = this.processData(artists);

        return (
            <Page title="Wykonawcy">
                <Table title="Wykonawcy" data={data} pending={isPending} />
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
    ownProps: IProps
): LinkStateProps => ({
    fetching: state.fetching,
    artists: state.artists
});

export default connect(mapStateToProps, null)(ArtistListPage);