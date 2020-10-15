import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import { getSong, deleteSongURL } from "../../store/songs";

import TableDetails from "../components/basic/TableDetails";
import Grid from "@material-ui/core/Grid";
import Song from "../../model/Song";
import Artist from "../../model/Artist";

import { Link as RouterLink } from 'react-router-dom';
import Link from "@material-ui/core/Link";
import PageHeader from "../components/basic/PageHeader";
import SongURL from "../../model/SongURL";
import TableList from "../components/basic/TableList";
import { getPlaylistsList, addRecordToPlaylist } from "../../store/playlists";
import Playlist from "../../model/Playlist";
import DialogAddSongToPlaylist from "../components/basic/DialogAddSongToPlaylist";
import Card from "../components/basic/Card";
import Button from "@material-ui/core/Button/Button";
import Icon from '@material-ui/icons/PlaylistAdd';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Role, { ROLE_ADMIN } from "../../model/Role";

interface IProps {
    match: { params: { songID: number } },
}

interface IState {
    open: boolean,
    selectedPlaylistID: number | undefined
}

type Props = IProps & LinkStateProps;

class SongPage extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
            selectedPlaylistID: undefined
        }
    }

    componentDidMount() {
        const { songID } = this.props.match.params;
        getSong(songID);

        const { token } = this.props?.auth;
        if (token) {
            getPlaylistsList();
        }
    }

    processSong = (song: Song | undefined): object => {
        if (song) {

            const artists = song.artists?.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);

            return {
                "Tytuł": song.title,
                "Tempo (BPM)": song.bpm,
                "Komentarz": song.comment,
                "Gatunek": song.genre,
                "Język": song.language,
                "Długość": song.length,
                "Tonacja": song.mainKey,
                "Wydawca": song.publisher,
                "Licencja": song.terms,
                "Strona internetowa": song.website,
                "Rok": song.year,
                "Albumy": song.albums,
                "Wykonawcy": artists
            }
        }
        return ({});
    }

    processURLs = (songURLs: undefined | SongURL[], isAdmin: boolean) => {
        return songURLs?.map((url: SongURL, index: number, array: Array<any>) => <><a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary" href={`${url.url}`} target="_blank">{url.url}</a>{isAdmin ? <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary" href="#" onClick={() => deleteSongURL(url.songURLID)}><BackspaceIcon style={{ marginLeft: '1rem' }} fontSize="small" color="primary" /></a> : null}</>);
    }

    handleChoosePlaylist = (playlistID: number) => {
        this.setState({
            selectedPlaylistID: playlistID
        });
    }

    handleAddSongToPlaylist = (selectedPlaylistID: number | undefined, selectedSongID: number | undefined) => {
        if (selectedSongID === undefined || selectedPlaylistID === undefined) {
            return;
        }

        addRecordToPlaylist(selectedPlaylistID, selectedSongID);

        this.setState({
            open: false,
            selectedPlaylistID: undefined
        });
    }

    render = () => {
        const { songs, playlists, fetching, auth } = this.props;
        const { isPending } = fetching;
        const { songID } = this.props.match.params;

        const { selectedPlaylistID, open } = this.state;
        const { token, roles } = auth;

        const isAdmin = (roles?.find((role: Role) => role?.name == ROLE_ADMIN) ? true : false);

        const song = songs.find((song: Song) => (song ? song.songID == songID : undefined));
        const urls = (song ? this.processURLs(song.songURLs, isAdmin) : []);

        return (
            <>
                <DialogAddSongToPlaylist
                    playlists={playlists}
                    open={open}
                    selectedPlaylistID={selectedPlaylistID}
                    selectedSongID={songID}
                    handleClose={() => this.setState({ open: false })}
                    handleChoosePlaylist={(playlistID: number) => this.handleChoosePlaylist(playlistID)}
                    submit={() => this.handleAddSongToPlaylist(selectedPlaylistID, songID)}
                />
                <PageHeader
                    title={song?.title}
                    aboveTitle="Utwór muzyczny"
                />
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <TableDetails object={this.processSong(song)} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TableList array={urls} />
                        </Grid>
                        {
                            token ?
                                (<Grid item xs={12} md={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<Icon />}
                                        onClick={() => this.setState({ open: true })}>
                                        Dodaj utwór do listy
                                    </Button>
                                </Grid>)
                                :
                                null
                        }
                    </Grid>
                </div>
            </>
        );
    }
};

interface LinkStateProps {
    fetching: any,
    songs: Song[],
    playlists: Playlist[],
    auth: any
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        songs: state.songs,
        playlists: state.playlists,
        auth: state.auth
    });

export default connect(mapStateToProps, null)(SongPage);