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
import Role, { ROLE_ADMIN } from "../../model/Role";
import Grid from "@material-ui/core/Grid/Grid";
import AddArtist from "../components/sections/AddArtist";
import ArtistType from "../../model/ArtistType";
import { getArtistTypesList } from "../../store/artistTypes";

interface IProps {

}

interface IState {

}

type Props = IProps & LinkStateProps;

class ArtistListPage extends React.Component<Props, IState> {

    componentDidMount() {
        getArtistsList();
        getArtistTypesList();
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
        const { auth, fetching } = this.props;
        const { isPending, hasError, error } = fetching;
        const { artists, artistTypes } = this.props;

        const data = this.processData(artists);
        const isAdmin = (auth?.roles?.find((role: Role) => role?.name == ROLE_ADMIN) ? true : false);

        return (
            <>
                {
                    hasError ?
                        (<Error title="Błąd pobierania danych" error={error} />)
                        :
                        null
                }
                <PageHeader title="Wykonawcy" />

                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Table title="Lista wykonawców" objects={data} isPending={isPending} />
                    </Grid>
                    {
                        isAdmin ?
                            (<Grid item xs={12} md={6}>
                                <AddArtist
                                    isPending={isPending}
                                    artistTypes={artistTypes}>
                                </AddArtist>
                            </Grid>)
                            :
                            null
                    }
                </Grid>

            </>
        );
    }
};

interface LinkStateProps {
    fetching: any,
    auth: any,
    artists: Artist[],
    artistTypes: ArtistType[]
}
const mapStateToProps = (
    state: AppState,
    ownProps: IProps
): LinkStateProps => ({
    fetching: state.fetching,
    auth: state.auth,
    artists: state.artists,
    artistTypes: state.artistTypes
});

export default connect(mapStateToProps, null)(ArtistListPage);