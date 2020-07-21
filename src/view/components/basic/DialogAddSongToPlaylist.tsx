import React from "react";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Playlist from "../../../model/Playlist";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";


interface IProps {
    playlists: Playlist[],
    open: boolean,
    selectedPlaylistID: number | undefined,
    selectedSongID: number | undefined,
    handleClose: () => void,
    handleChoosePlaylist: (playlistID: number) => void,
    submit: () => void
}

const DialogAddSongToPlaylist: React.FC<IProps> = (props: IProps) => {
    const styles = useStyles();
    const { open, selectedPlaylistID, selectedSongID, handleClose, handleChoosePlaylist, playlists, submit } = props;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        handleChoosePlaylist(event.target.value as number);
    };

    const submitDisabled: boolean = (selectedPlaylistID === undefined || selectedSongID === undefined);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                Wybierz listę do której dodać utwór
            </DialogTitle>
            <DialogContent className={styles.root}>
                <FormControl className={styles.form}>
                    <Select
                        id="playlist-select"
                        value={undefined}
                        onChange={handleChange}
                        autoWidth>
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
                <Button
                    onClick={handleClose}
                    color="primary">
                    Anuluj
                </Button>
                <Button
                    onClick={() => submit()}
                    disabled={submitDisabled}
                    color="primary"
                    autoFocus>
                    Dodaj
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DialogAddSongToPlaylist;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: theme.breakpoints.up('sm'),
            maxWidth: '100%',
        },
        form: {
            width: '100%',
            minHeight: '64px'
        },
        select: {

        },
        title: {
            padding: theme.spacing(2),
        },
    })
);