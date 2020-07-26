import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { getArtist } from "../../store/artists";

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Table from "../components/basic/Table";
import TableDetails from "../components/basic/TableDetails";
import Grid from "@material-ui/core/Grid";
import Album from "../../model/Album";
import PageHeader from "../components/basic/PageHeader";
import TableList from "../components/basic/TableList";
import AddArtist from "../components/sections/CreateArtist";

import ArtistURL from "../../model/ArtistURL";
import Role, { ROLE_ADMIN } from "../../model/Role";
import ArtistType from "../../model/ArtistType";
import { getArtistTypesList } from "../../store/artistTypes";
import CreateArtist from "../components/sections/CreateArtist";
import UpdateArtist from "../components/sections/UpdateArtist";


interface IProps {

}

interface IState {

}

type Props = IProps & LinkStateProps;

class AdminArtistPage extends React.Component<Props, IState> {

    componentDidMount() {
        // getArtist(artistID);
        getArtistTypesList();
    }

    render = () => {
        const { fetching, auth, artists, artistTypes } = this.props;
        const { isPending } = fetching;
        // const { artistID } = match?.params;
        const { roles } = auth;

        // const artist = artists.find((artist: Artist) => (artist ? artist.artistID == artistID : undefined));
        // const albums = this.processAlbums(artist);
        const isAdmin = (roles?.find((role: Role) => role?.name == ROLE_ADMIN) ? true : false);

        return (
            <>
                <PageHeader
                    title="Wykonawcy"
                    aboveTitle="Panel administratora" />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <CreateArtist />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <UpdateArtist />
                    </Grid>
                </Grid>
            </>
        );

    }
};

interface LinkStateProps {
    fetching: any,
    artists: Artist[],
    artistTypes: ArtistType[],
    auth: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching,
    artists: state.artists,
    artistTypes: state.artistTypes,
    auth: state.auth
});

export default connect(mapStateToProps, null)(AdminArtistPage);