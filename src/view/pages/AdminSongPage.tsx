import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { getSongsList } from "../../store/songs";

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
import RemoveArtist from "../components/sections/RemoveArtist";
import CreateArtistType from "../components/sections/CreateArtistType";
import RemoveArtistType from "../components/sections/RemoveArtistType";
import UpdateArtistType from "../components/sections/UpdateArtistType";
import CreateArtistURL from "../components/sections/CreateArtistURL";
import Song from "../../model/Song";
import CreateSong from "../components/sections/CreateSong";
import UpdateSong from "../components/sections/UpdateSong";
import RemoveSong from "../components/sections/RemoveSong";
import CreateSongURL from "../components/sections/CreateSongURL";


interface IProps {

}

interface IState {

}

type Props = IProps & LinkStateProps;

class AdminSongPage extends React.Component<Props, IState> {

    componentDidMount() {
        getSongsList();
    }

    render = () => {
        const { fetching, auth, songs } = this.props;
        const { roles } = auth;

        const isAdmin = (roles?.find((role: Role) => role?.name == ROLE_ADMIN) ? true : false);

        return (
            <>
                <PageHeader
                    title="Utwory muzyczne"
                    aboveTitle="Panel administratora" />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <CreateSong />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <RemoveSong songs={songs} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <CreateSongURL songs={songs} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <UpdateSong songs={songs} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );

    }
};

interface LinkStateProps {
    fetching: any,
    songs: Song[],
    auth: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching,
    songs: state.songs,
    auth: state.auth
});

export default connect(mapStateToProps, null)(AdminSongPage);