import React from "react";
import { Provider, connect } from "react-redux";
import { store, AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { getArtistsList, getArtist } from "../../store/artists";

import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Page from '../components/basic/Page';
import Card from "../components/basic/Card";
import Table from "../components/basic/Table";
import Error from "../components/basic/Error";
import PageHeader from "../components/basic/PageHeader";

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
                data.push({
                    "Nazwa wykonawcy": (<Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>)
                });
            }
        });
        return data;
    }

    render = () => {
        const { isPending, hasError, error } = this.props.fetching;
        const { artists } = this.props;

        const data = this.processData(artists);

        return (
            <>
                {
                    hasError ?
                        (<Error title="Błąd pobierania danych" error={error} />)
                        :
                        null
                }
                <PageHeader title="Wykonawcy" />
                <Table title="Lista wykonawców" objects={data} isPending={isPending} />
            </>
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