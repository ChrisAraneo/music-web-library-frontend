import React from "react";
import { connect } from "react-redux";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { AppState } from "../../../store";
import { getSong, updateSong, deleteSong } from "../../../store/songs";
import Select from "@material-ui/core/Select/Select";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Song, { SongInPlaylist } from "../../../model/Song";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { compareByProperty } from "../../../model/common/functions";

interface IProps {
    classes: any,
    songs: Song[]
}

interface IState {
    songID: number
}

const initialState = {
    songID: Number.MIN_VALUE
}

type Props = IProps & LinkStateProps;

class RemoveSong extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = { ...initialState };
    }

    handleChangeSong = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            getSong(value, (song: Song) => {
                this.setState({ songID: song?.songID });
            });
        }
    }

    submitForm = () => {
        const { songID } = this.state;
        if (songID != initialState.songID) {
            deleteSong(songID,
                () => {
                    this.setState({ ...initialState });
                });
        }
    }

    render = () => {
        const { classes, fetching, songs } = this.props;
        const { isPending } = fetching;
        const disabled = isPending || this.state.songID == initialState.songID;

        return (
            <CardAdmin title="Usuń utwór">
                <div className={classes.form}>
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeSong}
                            required
                            autoWidth>
                            {
                                [...songs].sort((a: Song, b: Song) => compareByProperty(a, b, "title")).map((song: Song) => {
                                    if (song) {
                                        return (<MenuItem key={song?.songID} value={song?.songID}>{song?.title}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz utwór do usunięcia</FormHelperText>
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
                    Usuń
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

const Styled = withStyles(classes, { withTheme: true })(RemoveSong);
export default connect(mapStateToProps, null)(Styled); 