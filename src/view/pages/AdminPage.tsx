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
import Error from "../components/Error";
import Title from "../components/Title";
import Paper from "@material-ui/core/Paper";
import Table from "../components/TableDepr";
import TableDetails from "../components/TableDetails";
import Grid from "@material-ui/core/Grid";
import Album from "../../model/Album";
import Song from "../../model/Song";
import { getAlbumsList } from "../../store/albums";

interface IProps {
    match: { params: { artistID: number } },
}

interface IState {

}

type Props = IProps & LinkStateProps;

class AdminPage extends React.Component<Props, IState> {

    componentDidMount() {
    }

    render = () => {
        const { isPending, hasError, error } = this.props.fetching;
        const { artists } = this.props;
        const { artistID } = this.props.match.params;

        return (
            <>
                <h1>Panel admina</h1>
            </>
        );
    }
};

interface LinkStateProps {
    fetching: any,
    artists: Artist[],
    albums: Album[],
}
const mapStateToProps = (
    state: AppState,
    ownProps: IProps
): LinkStateProps => ({
    fetching: state.fetching,
    artists: state.artists,
    albums: state.albums,
});

export default connect(mapStateToProps, null)(AdminPage);