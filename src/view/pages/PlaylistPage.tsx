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
import { getPlaylist } from "../../store/playlists";
import PageHeader from "../components/PageHeader";
import Playlist from "../../model/Playlist";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import Table from "../components/Table";

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

    render = () => {
        const { fetching, playlists, match } = this.props;
        const { isPending } = fetching;
        const { playlistID } = match.params;

        const playlist = playlists.find((playlist: Playlist) => (playlist ? playlist.playlistID == playlistID : undefined));

        const songs = this.processSongs(playlist?.songs);
        // const reviews = album?.reviews;

        return (
            <>
                <PageHeader title={playlist?.title} />
                {/* <Table title={`Utwory na liście`} data={songs} isPending={isPending} /> */}
                {/* <h1>{JSON.stringify(playlist)}</h1> */}
                <Table title={playlist?.title} objects={songs} isPending={isPending} />
            </>
        );
    }
};

const styles = (theme: Theme) => createStyles({
    reviewShort: {
        margin: theme.spacing(1, 0, 1, 0)
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