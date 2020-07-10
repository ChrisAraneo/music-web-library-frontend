import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";
import Playlist from "../../model/Playlist";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Table from "../components/Table";
import Error from "../components/Error";
import { getSongsList } from "../../store/songs";
import Song from "../../model/Song";
import Icon from '@material-ui/icons/PlaylistAdd';
import { addRecordToPlaylist, getPlaylistsList } from "../../store/playlists";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";


interface IInnerProps {
    playlists: Playlist[],
    open: boolean,
    handleClose: () => void,
    handleChoosePlaylist: (playlistID: number) => void
}

const AddDialog: React.FC<IInnerProps> = (props: IInnerProps) => {
    const { open, handleClose, handleChoosePlaylist, playlists } = props;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        handleChoosePlaylist(event.target.value as number);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Wybierz listę do której dodać utwór</DialogTitle>
            <DialogContent style={{ minWidth: '400px', minHeight: '300px' }}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Wybierz</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={undefined}
                        onChange={handleChange}>
                        {
                            playlists.map((playlist: Playlist) => {
                                if (playlist) {
                                    return (<MenuItem value={playlist?.playlistID}>{playlist?.title}</MenuItem>);
                                } else {
                                    return null;
                                }
                            })
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => alert("Wyslano TODO")} color="primary">Dodaj</Button>
                <Button onClick={handleClose} color="primary" autoFocus>Anuluj</Button>
            </DialogActions>
        </Dialog>
    );
}

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
        getPlaylistsList();
    }

    handleOpenAddDialog = (data: any) => {
        if (!this.state.open) {
            const link = data["Nazwa utworu"];
            if (link) {
                const { props } = link;
                const { to } = props;
                const parts = to.split("/");
                const songID = parts[parts.length - 1];
                this.setState({
                    open: true,
                    selectedSongID: songID
                });
            }
        } else {
            this.setState({
                open: false,
                selectedSongID: undefined
            });
        }
    }

    handleChoosePlaylist = (playlistID: number) => {
        alert(`Wybrano playliste ${playlistID}`);
        this.setState({
            selectedPlaylistID: playlistID
        });
    }

    handleAddSongToPlaylist = (playlistID: number | undefined, songID: number | undefined) => {
        if (songID === undefined || playlistID === undefined) {
            return;
        }

        this.setState({
            open: false,
            selectedSongID: undefined,
            selectedPlaylistID: undefined
        },
            () => addRecordToPlaylist(playlistID, songID)
        );
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
        const { songs, playlists } = this.props;

        const data = this.processData(songs);

        return (
            <>
                {
                    hasError ?
                        (<Error title="Błąd pobierania danych" error={error} />)
                        :
                        null
                }
                <AddDialog
                    playlists={playlists}
                    open={!isPending && open}
                    handleClose={() => this.setState({ open: false })}
                    handleChoosePlaylist={(playlistID: number) => this.handleChoosePlaylist(playlistID)}
                />
                <Table
                    title="Utwory muzyczne"
                    objects={data}
                    isPending={isPending}
                    actions={[
                        {
                            icon: 'add',
                            element: <Icon />,
                            onClick: (event: any, data: any) => this.handleOpenAddDialog(data)
                        }
                    ]} />
            </>
        );
    }
};

interface LinkStateProps {
    fetching: any,
    songs: Song[],
    playlists: Playlist[]
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        songs: state.songs,
        playlists: state.playlists
    });

export default connect(mapStateToProps, null)(SongListPage);