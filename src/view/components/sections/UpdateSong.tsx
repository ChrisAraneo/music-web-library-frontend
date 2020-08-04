import React from "react";
import { connect } from "react-redux";

import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { AppState } from "../../../store";
import { getSong, updateSong } from "../../../store/songs";
import Select from "@material-ui/core/Select/Select";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Song, { SongInPlaylist } from "../../../model/Song";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

interface IProps {
    classes: any,
    songs: Song[]
}

interface IState {
    songID: number,
    title: string,
    bpm?: number
    comment?: string,
    genre?: string,
    language?: string,
    length?: number
    mainKey?: string,
    publisher?: string,
    terms?: string,
    website?: string,
    year?: number
}

const initialState = {
    songID: Number.MIN_VALUE,
    title: "",
    bpm: undefined,
    comment: undefined,
    genre: undefined,
    language: undefined,
    length: undefined,
    mainKey: undefined,
    publisher: undefined,
    terms: undefined,
    website: undefined,
    year: undefined
}

type Props = IProps & LinkStateProps;

class UpdateSong extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = { ...initialState };
    }

    handleChangeSong = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            this.setState({ songID: value });
            getSong(value, (song: Song) => {
                this.setState({
                    songID: song?.songID,
                    title: song?.title,
                    bpm: song?.bpm,
                    comment: song?.comment,
                    genre: song?.genre,
                    language: song?.language,
                    length: song?.length,
                    mainKey: song?.mainKey,
                    publisher: song?.publisher,
                    terms: song?.terms,
                    website: song?.website,
                    year: song?.year
                });
            });
        }
    }

    handleChangeTitle = (event: any) => {
        this.setState({ title: event?.target?.value });
    }

    handleChangeBPM = (event: any) => {
        const { value } = event?.target;
        const conv = Number(value);

        if (isNaN(conv) === false) {
            this.setState({ bpm: conv });
        } else {
            if (this.state.bpm === undefined) {
                this.setState({ bpm: 0 });
            } else {
                if (isNaN(Number(this.state.bpm))) {
                    this.setState({ bpm: 0 });
                } else {
                    this.setState({ bpm: this.state.bpm });
                }
            }
        }
    }

    handleChangeComment = (event: any) => {
        this.setState({ comment: event?.target?.value });
    }

    handleChangeGenre = (event: any) => {
        this.setState({ genre: event?.target?.value });
    }

    handleChangeLanguage = (event: any) => {
        this.setState({ language: event?.target?.value });
    }

    handleChangeLength = (event: any) => {
        const { value } = event?.target;
        const conv = Number(value);

        if (isNaN(conv) === false) {
            this.setState({ length: conv });
        } else {
            if (this.state.length === undefined) {
                this.setState({ length: 0 });
            } else {
                if (isNaN(Number(this.state.length))) {
                    this.setState({ length: 0 });
                } else {
                    this.setState({ length: this.state.length });
                }
            }
        }
    }

    handleChangeMainKey = (event: any) => {
        this.setState({ mainKey: event?.target?.value });
    }

    handleChangePublisher = (event: any) => {
        this.setState({ publisher: event?.target?.value });
    }

    handleChangeTerms = (event: any) => {
        this.setState({ terms: event?.target?.value });
    }

    handleChangeWebsite = (event: any) => {
        this.setState({ website: event?.target?.value });
    }

    handleChangeYear = (event: any) => {
        const { value } = event?.target;
        const conv = Number(value);

        if (isNaN(conv) === false) {
            this.setState({ year: conv });
        } else {
            if (this.state.year === undefined) {
                this.setState({ year: 0 });
            } else {
                if (isNaN(Number(this.state.year))) {
                    this.setState({ year: 0 });
                } else {
                    this.setState({ year: this.state.year });
                }
            }
        }
    }

    submitForm = () => {
        const song = { ...this.state };

        updateSong(song,
            () => {
                this.setState({ ...initialState });
                alert("Wysłano, todo walidacja");
            });
    }

    render = () => {
        const { classes, fetching, songs } = this.props;
        const { isPending } = fetching;
        const disabled = isPending || this.state.songID == initialState.songID;

        return (
            <CardAdmin title="Edytuj informacje o utworze">
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
                                        return (<MenuItem key={song?.songID} value={song?.songID}>{song?.title}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz utwór do edycji</FormHelperText>
                    </FormControl>
                </div>
                <DividerGradient />
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Tytuł utworu"
                        required
                        onChange={this.handleChangeTitle}
                        value={this.state.title}
                        disabled={disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Tempo (BPM)"
                        onChange={this.handleChangeBPM}
                        value={this.state.bpm}
                        disabled={disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Komentarz"
                        onChange={this.handleChangeComment}
                        value={this.state.comment}
                        disabled={disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Gatunek muzyczny"
                        onChange={this.handleChangeGenre}
                        value={this.state.genre}
                        disabled={disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Język"
                        onChange={this.handleChangeLanguage}
                        value={this.state.language}
                        disabled={disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Długość utworu (sekundy)"
                        onChange={this.handleChangeLength}
                        value={this.state.length}
                        disabled={disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Tonacja"
                        onChange={this.handleChangeMainKey}
                        value={this.state.mainKey}
                        disabled={disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Wydawca"
                        onChange={this.handleChangePublisher}
                        value={this.state.publisher}
                        disabled={disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Licencja/warunki"
                        onChange={this.handleChangeTerms}
                        value={this.state.terms}
                        disabled={disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Strona internetowa"
                        onChange={this.handleChangeWebsite}
                        value={this.state.website}
                        disabled={disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Rok wydania"
                        onChange={this.handleChangeYear}
                        value={this.state.year}
                        disabled={disabled} />
                </form>
                <DividerGradient />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    size="large"
                    onClick={this.submitForm}
                    disabled={disabled}>
                    Zapisz zmiany
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

const Styled = withStyles(classes, { withTheme: true })(UpdateSong);
export default connect(mapStateToProps, null)(Styled);