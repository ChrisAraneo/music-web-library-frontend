import React from "react";
import { connect } from "react-redux";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import Button from "@material-ui/core/Button/Button";
import { AppState } from "../../../store";
import { deleteSong, getSong } from "../../../store/songs";
import Select from "@material-ui/core/Select/Select";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Album from "../../../model/Album";
import { getAlbum, postSongToAlbum } from "../../../store/albums";
import Song from "../../../model/Song";
import TextField from "@material-ui/core/TextField/TextField";

interface IProps {
    classes: any,
    albums: Album[],
    songs: Song[]
}

interface IState {
    albumID: number,
    songID: number,
    track: number | undefined
}

const initialState = {
    albumID: Number.MIN_VALUE,
    songID: Number.MIN_VALUE,
    track: undefined
}

type Props = IProps & LinkStateProps;

class CreateSongAlbum extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = { ...initialState };
    }

    handleChangeAlbum = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            getAlbum(value, () => {
                this.setState({ albumID: value });
            });
        }
    }

    handleChangeSong = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            getSong(value, () => {
                this.setState({ songID: value });
            });
        }
    }

    handleChangeTrack = (event: any) => {
        const { value } = event?.target;

        if (value !== "") {
            const conv = Number(value);
            if (isNaN(conv) === false) {
                this.setState({ track: conv });
            } else {
                if (this.state.track === undefined) {
                    this.setState({ track: 0 });
                } else {
                    if (isNaN(Number(this.state.track))) {
                        this.setState({ track: 0 });
                    } else {
                        this.setState({ track: this.state.track });
                    }
                }
            }
        } else {
            this.setState({ track: undefined });
        }
    }

    submitForm = () => {
        const { albumID, songID, track } = this.state;
        if (albumID && songID && track && albumID != initialState.albumID && songID != initialState.songID) {
            postSongToAlbum(albumID, songID, track,
                () => {
                    this.setState({ ...initialState });
                });
        }
    }

    render = () => {
        const { classes, fetching, albums, songs } = this.props;
        const { isPending } = fetching;
        const disabled = isPending || this.state.albumID == initialState.albumID || this.state.songID == initialState.songID;

        return (
            <CardAdmin title="Dodaj utwór do albumu">
                <div className={classes.form}>
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeAlbum}
                            required
                            autoWidth>
                            {
                                albums?.map((album: Album) => {
                                    if (album) {
                                        return (<MenuItem key={album?.albumID} value={album?.albumID}>{album?.title}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz album</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeSong}
                            required
                            autoWidth>
                            {
                                songs?.map((song: Song) => {
                                    if (song) {
                                        return (<MenuItem key={song?.songID} value={song?.songID}>{song?.title}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz utwór</FormHelperText>
                    </FormControl>
                </div>
                <DividerGradient />
                <div className={classes.form}>
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Numer utworu"
                        required
                        onChange={this.handleChangeTrack}
                        value={this.state.track}
                        disabled={disabled} />
                </div>
                <DividerGradient />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    size="large"
                    onClick={this.submitForm}
                    disabled={disabled}>
                    Dodaj utwór do albumu
                    </Button>
            </CardAdmin>
        );
    }
};

const classes = (theme: Theme) => createStyles({
    form: {
        padding: theme.spacing(3)
    },
    selectWrapper: {
        width: '100%',
        minHeight: '64px',
        marginTop: theme.spacing(2)
    },
    textInput: {
        marginBottom: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(3)
    }
});

interface LinkStateProps {
    fetching?: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching
});

const Styled = withStyles(classes, { withTheme: true })(CreateSongAlbum);
export default connect(mapStateToProps, null)(Styled); 