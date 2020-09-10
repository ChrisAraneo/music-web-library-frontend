import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Grid from "@material-ui/core/Grid";
import Album from "../../model/Album";
import PageHeader from "../components/basic/PageHeader";
import { getAlbumsList } from "../../store/albums";
import CreateAlbum from "../components/sections/CreateAlbum";
import UpdateAlbum from "../components/sections/UpdateAlbum";
import RemoveAlbum from "../components/sections/RemoveAlbum";
import CreateSongAlbum from "../components/sections/CreateSongAlbum";
import { getSongsList } from "../../store/songs";
import Song from "../../model/Song";
import CreateCover from "../components/sections/CreateCover";
import CreateCoverAlbum from "../components/sections/CreateCoverAlbum";
import Cover from "../../model/Cover";
import RemoveCoverAlbum from "../components/sections/RemoveCoverAlbum";
import RemoveCover from "../components/sections/RemoveCover";
import { getCoversList } from "../../store/covers";

interface IProps {

}

interface IState {

}

type Props = IProps & LinkStateProps;

class AdminAlbumPage extends React.Component<Props, IState> {

    componentDidMount() {
        getAlbumsList();
        getSongsList();
        getCoversList();
    }

    render = () => {
        const { auth, albums, songs, covers } = this.props;
        const { roles } = auth;

        return (
            <>
                <PageHeader
                    title="Albumy muzyczne"
                    aboveTitle="Panel administratora" />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <CreateAlbum />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <UpdateAlbum albums={albums} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <RemoveAlbum albums={albums} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <CreateSongAlbum albums={albums} songs={songs} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <CreateCover />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <CreateCoverAlbum albums={albums} covers={covers} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <RemoveCoverAlbum albums={albums} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <RemoveCover covers={covers} />
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
    albums: Album[],
    songs: Song[],
    covers: Cover[],
    auth: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching,
    albums: state.albums,
    songs: state.songs,
    covers: state.covers,
    auth: state.auth
});

export default connect(mapStateToProps, null)(AdminAlbumPage);