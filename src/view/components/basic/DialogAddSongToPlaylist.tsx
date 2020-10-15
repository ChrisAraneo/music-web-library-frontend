import React from "react";

import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Playlist from "../../../model/Playlist";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import { getPlaylist } from "../../../store/playlists";
import { SongInPlaylist } from "../../../model/Song";
import Alert from "@material-ui/lab/Alert/Alert";
import Typography from "@material-ui/core/Typography/Typography";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { CircularProgress } from "@material-ui/core";
import { compareByProperty } from "../../../model/common/functions";

interface IProps {
    playlists: Playlist[],
    open: boolean,
    selectedPlaylistID: number | undefined,
    selectedSongID: number | undefined,
    handleClose: () => void,
    handleChoosePlaylist: (playlistID: number) => void,
    submit: () => void,
    classes?: any
}

interface IState {
    exists: boolean
}

const initialState = {
    exists: false
}

type Props = IProps & LinkStateProps;

class DialogAddSongToPlaylist extends React.Component<Props, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { ...initialState };
    }

    handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { selectedSongID, handleChoosePlaylist } = this.props;
        const playlistID: number = event.target.value as number
        getPlaylist(playlistID, (playlist: Playlist) => {
            const index = playlist?.songs?.findIndex((o: SongInPlaylist) => (o && o.song && o.song.songID == selectedSongID));
            if (index === -1) {
                this.setState({ exists: false }, () => {
                    handleChoosePlaylist(event.target.value as number);
                });
            } else {
                this.setState({ exists: true }, () => {
                    handleChoosePlaylist(event.target.value as number);
                });
            }
        });
    };

    handleSubmit = () => {
        const { submit } = this.props;
        this.setState({ ...initialState }, () => submit());
    }

    render = () => {
        const { classes, open, selectedPlaylistID, selectedSongID, playlists, handleClose, fetching } = this.props;
        const { exists } = this.state;

        const submitDisabled: boolean = (selectedPlaylistID === undefined || selectedSongID === undefined || fetching.isPending);

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">
                    Wybierz listę do której dodać utwór
            </DialogTitle>
                <DialogContent className={classes.root}>
                    <FormControl className={classes.form}>
                        <Select
                            id="playlist-select"
                            value={undefined}
                            onChange={this.handleChange}
                            autoWidth>
                            {
                                [...playlists].sort((a: Playlist, b: Playlist) => compareByProperty(a, b, "title")).map((playlist: Playlist) => {
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
                {
                    exists ?
                        (
                            <Alert
                                severity="warning">
                                <AlertTitle>Wybrany utwór jest na liście</AlertTitle>
                                <Typography>
                                    {
                                        "Ten utwór znajduje się już na wybranej liście utworów. Czy dodać utwór muzyczny jeszcze raz?"
                                    }
                                </Typography>
                            </Alert>
                        )
                        :
                        null
                }
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary">
                        Anuluj
                </Button>
                    <Button
                        onClick={this.handleSubmit}
                        disabled={submitDisabled}
                        color={exists ? 'secondary' : 'primary'}
                        autoFocus>
                        {exists ? 'Dodaj mimo to' : 'Dodaj'}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const classes = (theme: Theme) => createStyles({
    root: {
        minWidth: theme.breakpoints.up('sm'),
        maxWidth: '100%',
    },
    form: {
        width: '100%',
        minHeight: '64px'
    },
    title: {
        padding: theme.spacing(2),
    },
});

interface LinkStateProps {
    fetching?: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching
});

const Styled = withStyles(classes, { withTheme: true })(DialogAddSongToPlaylist);
export default connect(mapStateToProps, null)(Styled);