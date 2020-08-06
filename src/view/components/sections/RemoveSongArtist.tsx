import React from "react";
import { connect } from "react-redux";

import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import Button from "@material-ui/core/Button/Button";
import { AppState } from "../../../store";
import { getSong } from "../../../store/songs";
import Select from "@material-ui/core/Select/Select";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Song from "../../../model/Song";
import Artist from "../../../model/Artist";
import { getArtist, attachSongToArtist, detachSongFromArtist } from "../../../store/artists";


interface IProps {
    classes: any,
    songs: Song[]
}

interface IState {
    songID: number,
    artists: Artist[] | undefined,
    artistID: number,
}

const initialState = {
    artistID: Number.MIN_VALUE,
    artists: undefined,
    songID: Number.MIN_VALUE
}

type Props = IProps & LinkStateProps;

class RemoveSongArtist extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = { ...initialState };
    }

    handleChangeSong = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            getSong(value, (song: Song) => {
                this.setState({
                    songID: song?.songID,
                    artists: song?.artists
                });
            });
        }
    }

    handleChangeArtist = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            getArtist(value, () => {
                this.setState({ artistID: value });
            });
        }
    }

    submitForm = () => {
        const { artistID, songID } = this.state;
        if (artistID && songID) {
            detachSongFromArtist(artistID, songID,
                () => {
                    this.setState({ ...initialState });
                    getSong(songID);
                    alert("TODO walidacja");
                });
        }
    }

    render = () => {
        const { classes, fetching, songs } = this.props;
        const { isPending } = fetching;
        const disabled = isPending || this.state.artistID == initialState.artistID || this.state.songID == initialState.songID;

        return (
            <CardAdmin title="Usuń powiązanie utwór-wykonawca">
                <div className={classes.form}>
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
                                        return (<MenuItem key={song.songID} value={song.songID}>{song.title}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz utwór</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeArtist}
                            required
                            disabled={this.state.artists === undefined || this.state.artists?.length < 1}
                            autoWidth>
                            {
                                this.state.artists?.map((artist: Artist) => {
                                    if (artist) {
                                        return (<MenuItem key={artist.artistID} value={artist.artistID}>{artist.artistName}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz wykonawcę</FormHelperText>
                    </FormControl>
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
                    Usuń powiązanie
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

const Styled = withStyles(classes, { withTheme: true })(RemoveSongArtist);
export default connect(mapStateToProps, null)(Styled); 