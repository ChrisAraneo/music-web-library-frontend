import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { getArtistsList } from "../../store/artists";

import Grid from "@material-ui/core/Grid";
import PageHeader from "../components/basic/PageHeader";

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
import CreateSongArtist from "../components/sections/CreateSongArtist";
import Song from "../../model/Song";
import { getSongsList } from "../../store/songs";
import RemoveSongArtist from "../components/sections/RemoveSongArtist";


interface IProps {

}

interface IState {

}

type Props = IProps & LinkStateProps;

class AdminArtistPage extends React.Component<Props, IState> {

    componentDidMount() {
        getArtistsList();
        getArtistTypesList();
        getSongsList();
    }

    render = () => {
        const { auth, artists, songs, artistTypes } = this.props;
        const { roles } = auth;


        return (
            <>
                <PageHeader
                    title="Wykonawcy"
                    aboveTitle="Panel administratora" />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <CreateArtist
                                    artistTypes={artistTypes} />
                            </Grid>
                            <Grid item xs={12}>
                                <UpdateArtist
                                    artists={artists}
                                    artistTypes={artistTypes} />
                            </Grid>
                            <Grid item xs={12}>
                                <RemoveArtist
                                    artists={artists} />
                            </Grid>
                        </ Grid>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <CreateArtistType />
                            </Grid>
                            <Grid item xs={12}>
                                <UpdateArtistType artistTypes={artistTypes} />
                            </Grid>
                            <Grid item xs={12}>
                                <RemoveArtistType artistTypes={artistTypes} />
                            </Grid>
                            <Grid item xs={12}>
                                <CreateSongArtist artists={artists} songs={songs} />
                            </Grid>
                            <Grid item xs={12}>
                                <RemoveSongArtist songs={songs} />
                            </Grid>
                            <Grid item xs={12}>
                                <CreateArtistURL artists={artists} />
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
    artists: Artist[],
    songs: Song[],
    artistTypes: ArtistType[],
    auth: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching,
    artists: state.artists,
    songs: state.songs,
    artistTypes: state.artistTypes,
    auth: state.auth
});

export default connect(mapStateToProps, null)(AdminArtistPage);