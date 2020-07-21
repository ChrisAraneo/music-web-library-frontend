import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";
import Playlist from "../../model/Playlist";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Table from "../components/basic/Table";
import Error from "../components/basic/Error";
import { getSongsList } from "../../store/songs";
import Song from "../../model/Song";
import Icon from '@material-ui/icons/PlaylistAdd';
import { addRecordToPlaylist, getPlaylistsList } from "../../store/playlists";
import DialogAddSongToPlaylist from "../components/basic/DialogAddSongToPlaylist";
import PageHeader from "../components/basic/PageHeader";


interface IProps {
}

interface IState {
    open: boolean,
    selectedSongID: number | undefined,
    selectedPlaylistID: number | undefined
}

type Props = IProps & LinkStateProps;

class SongListPage extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
            selectedSongID: undefined,
            selectedPlaylistID: undefined
        }
    }

    componentDidMount() {
        getSongsList();

        const { token } = this.props?.auth;
        if (token) {
            getPlaylistsList();
        }
    }

    handleToggleDialog = (data: any) => {
        if (!this.state.open) {
            const link = data["Nazwa utworu"];
            if (link) {
                console.log("SONG DATA", data);
                const { props } = link;
                const { to } = props;
                const parts = to.split("/");
                const songID = parts[parts.length - 1];
                console.log("SONG ID", songID);
                this.setState({
                    open: true,
                    selectedSongID: songID
                });
            }
        } else {
            this.setState({
                open: false
            });
        }
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
            selectedSongID: undefined,
            selectedPlaylistID: undefined
        });
    }

    processArtistsArray = (artists: Artist[]) => {
        artists.sort((a: Artist, b: Artist) => {
            if (a.artistName < b.artistName) { return -1; }
            if (a.artistName > b.artistName) { return 1; }
            return 0;
        });
        return artists.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);
    }

    processData = (songs: Array<Song>) => {
        const data: any[] = [];
        songs.forEach((song) => {
            if (song) {
                const title = (<Link component={RouterLink} to={`/songs/${song.songID}`}>{song.title}</Link>);
                const artists = (<div>{song.artists ? this.processArtistsArray(song.artists) : null}</div>);
                data.push({
                    "Nazwa utworu": title,
                    "Wykonawcy": artists
                });
            }
        });
        return data;
    }

    render = () => {
        const { isPending, hasError, error } = this.props.fetching;
        const { open, selectedSongID, selectedPlaylistID } = this.state;
        const { token } = this.props?.auth;
        const { songs, playlists } = this.props;

        const data = this.processData(songs);
        const actions = (token ? [
            {
                icon: 'add',
                element: <Icon />,
                onClick: (event: any, data: any) => this.handleToggleDialog(data)
            }
        ] : undefined);

        return (
            <>
                {
                    hasError ?
                        (<Error title="Błąd pobierania danych" error={error} />)
                        :
                        null
                }
                <DialogAddSongToPlaylist
                    playlists={playlists}
                    open={!isPending && open}
                    selectedPlaylistID={selectedPlaylistID}
                    selectedSongID={selectedSongID}
                    handleClose={() => this.setState({ open: false })}
                    handleChoosePlaylist={(playlistID: number) => this.handleChoosePlaylist(playlistID)}
                    submit={() => this.handleAddSongToPlaylist(selectedPlaylistID, selectedSongID)}
                />
                <PageHeader title="Utwory muzyczne" />
                <Table
                    title="Lista utworów muzycznych"
                    objects={data}
                    isPending={isPending}
                    actions={actions} />
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

export default connect(mapStateToProps, null)(SongListPage);