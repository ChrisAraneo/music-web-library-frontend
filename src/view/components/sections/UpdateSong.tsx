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
import Song, { SongInPlaylist, validateSongTitle, validateSongComment, validateSongLength, validateSongLanguage, validateSongGenre, validateSongBpm, validateSongMainKey, validateSongPublisher, validateSongTerms, validateSongWebsite } from "../../../model/Song";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { compareByProperty } from "../../../model/common/functions";

interface IProps {
    classes: any,
    songs: Song[]
}

interface IState {
    songID: number,
    title: string,
    validTitle: boolean,
    bpm?: number,
    validBPM: boolean,
    comment?: string,
    validComment: boolean,
    genre?: string,
    validGenre: boolean,
    language?: string,
    validLanguage: boolean,
    length?: number,
    validLength: boolean,
    mainKey?: string,
    validMainKey: boolean,
    publisher?: string,
    validPublisher: boolean,
    terms?: string,
    validTerms: boolean,
    website?: string,
    validWebsite: boolean,
    year?: number,
    validYear: boolean
}

const initialState = {
    songID: Number.MIN_VALUE,
    title: "",
    validTitle: true,
    bpm: undefined,
    validBPM: true,
    comment: undefined,
    validComment: true,
    genre: undefined,
    validGenre: true,
    language: undefined,
    validLanguage: true,
    length: undefined,
    validLength: true,
    mainKey: undefined,
    validMainKey: true,
    publisher: undefined,
    validPublisher: true,
    terms: undefined,
    validTerms: true,
    website: undefined,
    validWebsite: true,
    year: undefined,
    validYear: true
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
        const { songID, title, bpm, comment, genre, language, length, mainKey, publisher, terms, website, year } = this.state;

        const validSongID = (songID != initialState.songID);

        const validTitle = validateSongTitle(title,
            () => this.setState({ validTitle: true }),
            () => this.setState({ validTitle: false })
        );

        let validBPM = true;
        if (bpm != initialState.bpm) {
            validBPM = validateSongBpm(bpm,
                () => this.setState({ validBPM: true }),
                () => this.setState({ validBPM: false })
            );
        }

        let validComment = true;
        if (comment != initialState.comment) {
            validComment = validateSongComment(comment,
                () => this.setState({ validComment: true }),
                () => this.setState({ validComment: false })
            );
        }

        let validGenre = true;
        if (genre != initialState.genre) {
            validGenre = validateSongGenre(genre,
                () => this.setState({ validGenre: true }),
                () => this.setState({ validGenre: false })
            );
        }

        let validLanguage = true;
        if (language != initialState.language) {
            validLanguage = validateSongLanguage(language,
                () => this.setState({ validLanguage: true }),
                () => this.setState({ validLanguage: false })
            );
        }

        let validLength = true;
        if (length != initialState.length) {
            validLength = validateSongLength(length,
                () => this.setState({ validLength: true }),
                () => this.setState({ validLength: false })
            );
        }

        let validMainKey = true;
        if (mainKey != initialState.mainKey) {
            validMainKey = validateSongMainKey(mainKey,
                () => this.setState({ validMainKey: true }),
                () => this.setState({ validMainKey: false })
            );
        }

        let validPublisher = true;
        if (publisher != initialState.publisher) {
            validPublisher = validateSongPublisher(publisher,
                () => this.setState({ validPublisher: true }),
                () => this.setState({ validPublisher: false })
            );
        }

        let validTerms = true;
        if (terms != initialState.terms) {
            validTerms = validateSongTerms(terms,
                () => this.setState({ validTerms: true }),
                () => this.setState({ validTerms: false })
            );
        }

        let validWebsite = true;
        if (website != initialState.website) {
            validWebsite = validateSongWebsite(website,
                () => this.setState({ validWebsite: true }),
                () => this.setState({ validWebsite: false })
            );
        }

        let validYear = true;
        if (year != initialState.year) {
            validYear = validateSongWebsite(year,
                () => this.setState({ validYear: true }),
                () => this.setState({ validYear: false })
            );
        }

        if (validSongID && validTitle && validBPM && validComment && validGenre && validLanguage && validYear) {
            const song: Song = { songID, title, bpm, comment, genre, language, length, mainKey, publisher, terms, website, year };
            updateSong(song,
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
                                [...songs].sort((a: Song, b: Song) => compareByProperty(a, b, "title")).map((song: Song) => {
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
                        disabled={disabled}
                        error={!this.state.validTitle} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Tempo (BPM)"
                        onChange={this.handleChangeBPM}
                        value={this.state.bpm}
                        disabled={disabled}
                        error={!this.state.validBPM} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Komentarz"
                        onChange={this.handleChangeComment}
                        value={this.state.comment}
                        disabled={disabled}
                        error={!this.state.validComment} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Gatunek muzyczny"
                        onChange={this.handleChangeGenre}
                        value={this.state.genre}
                        disabled={disabled}
                        error={!this.state.validGenre} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Język"
                        onChange={this.handleChangeLanguage}
                        value={this.state.language}
                        disabled={disabled}
                        error={!this.state.validLanguage} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Długość utworu (sekundy)"
                        onChange={this.handleChangeLength}
                        value={this.state.length}
                        disabled={disabled}
                        error={!this.state.validLength} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Tonacja"
                        onChange={this.handleChangeMainKey}
                        value={this.state.mainKey}
                        disabled={disabled}
                        error={!this.state.validMainKey} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Wydawca"
                        onChange={this.handleChangePublisher}
                        value={this.state.publisher}
                        disabled={disabled}
                        error={!this.state.validPublisher} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Licencja/warunki"
                        onChange={this.handleChangeTerms}
                        value={this.state.terms}
                        disabled={disabled}
                        error={!this.state.validTerms} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Strona internetowa"
                        onChange={this.handleChangeWebsite}
                        value={this.state.website}
                        disabled={disabled}
                        error={!this.state.validWebsite} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Rok wydania"
                        onChange={this.handleChangeYear}
                        value={this.state.year}
                        disabled={disabled}
                        error={!this.state.validYear} />
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