import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import TableDetails from "../components/TableDetails";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Album from "../../model/Album";
import Song, { SongInAlbum, SongInPlaylist } from "../../model/Song";
import { getPlaylist, deleteRecordFromPlaylist, deletePlaylist } from "../../store/playlists";
import PageHeader from "../components/PageHeader";
import Playlist from "../../model/Playlist";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import Table from "../components/Table";
import Card from "../components/Card";
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import { history } from "../../store/index";

interface IProps {
    match: { params: { playlistID: number } },
    classes: any
}

interface IState {

}

type Props = IProps & LinkStateProps;

class PlaylistPage extends React.Component<Props, IState> {

    componentDidMount() {
        const { playlistID } = this.props.match.params;
        getPlaylist(playlistID);
    }

    processArtistsArray = (artists: Artist[] | undefined) => {
        if (artists) {
            artists.sort((a: Artist, b: Artist) => {
                if (a.artistName < b.artistName) { return -1; }
                if (a.artistName > b.artistName) { return 1; }
                return 0;
            });
            return artists.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);
        }
        return "";
    }

    processSongTitle = (song: Song | undefined) => {
        if (song) {
            return (<>
                <Link component={RouterLink} to={`/songs/${song.songID}`}>
                    {song.title}
                </Link>
            </>);
        }
        return "";
    }

    processSongs = (songsInPlaylist: SongInPlaylist[] | undefined) => {
        const data: object[] = [];
        songsInPlaylist?.forEach((songInPlaylist: SongInPlaylist) => {
            const id = songInPlaylist.id.trackNumber;
            const { song } = songInPlaylist;

            const title = this.processSongTitle(song);
            const artists = this.processArtistsArray(song?.artists);

            data.push({
                "#": id,
                "Tytuł": title,
                "Wykonawcy": artists
            });
        });
        return data;
    }

    handleRemoveSong = (data: any, playlistID: number) => {
        const track = data["#"];
        deleteRecordFromPlaylist(playlistID, track);
    }

    handleRemovePlaylist = (playlistID: number) => {
        deletePlaylist(playlistID);
        history.push("/playlists");
    }

    render = () => {
        const { fetching, playlists, match, classes } = this.props;
        const { isPending } = fetching;
        const { playlistID } = match.params;

        const playlist = playlists.find((playlist: Playlist) => (playlist ? playlist.playlistID == playlistID : undefined));

        const songs = this.processSongs(playlist?.songs);

        return (
            <>
                <PageHeader title={playlist?.title} />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Table
                            title={playlist?.title}
                            objects={songs}
                            isPending={isPending}
                            deleteRow={(data: any) => this.handleRemoveSong(data, playlistID)}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card title="">
                            <div className={classes.wrapper}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    size="large"
                                    onClick={() => this.handleRemovePlaylist(playlistID)}
                                    disabled={isPending}
                                    startIcon={<DeleteIcon />}>
                                    Usuń listę utworów
                                </Button>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </>
        );
    }
};

const styles = (theme: Theme) => createStyles({
    reviewShort: {
        margin: theme.spacing(1, 0, 1, 0)
    },
    button: {
        color: theme.palette.getContrastText(red[600]),
        backgroundColor: red[600],
        '&:hover': {
            backgroundColor: red[800],
        },
    },
    wrapper: {
        padding: theme.spacing(2)
    }
});

interface LinkStateProps {
    fetching: any,
    playlists: Playlist[],
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        playlists: state.playlists,
    });

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(PlaylistPage));