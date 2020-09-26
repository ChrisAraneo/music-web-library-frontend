import React from "react";
import { connect } from "react-redux";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import { AppState } from "../../../store";
import Album, { validateAlbumTitle, validateAlbumYear } from "../../../model/Album";
import { getAlbum, updateAlbum } from "../../../store/albums";

interface IProps {
    classes: any,
    albums: Album[]
}

interface IState {
    albumID: number,
    title: string,
    validTitle: boolean,
    year: number | undefined,
    validYear: boolean
}

const initialState = {
    albumID: Number.MIN_VALUE,
    title: "",
    validTitle: true,
    year: undefined,
    validYear: true
}

type Props = IProps & LinkStateProps;

class UpdateAlbum extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleChangeAlbum = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            this.setState({ albumID: value });
            getAlbum(value, (album: Album) => {
                this.setState({
                    albumID: album.albumID,
                    title: album.title,
                    year: album.year
                });
            });
        }
    }

    handleChangeTitle = (event: any) => {
        this.setState({ title: event?.target?.value });
    }

    handleChangeYear = (event: any) => {
        const { value } = event?.target;

        if (value !== "") {
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
        } else {
            this.setState({ year: undefined });
        }
    }

    submitForm = () => {
        const { albumID, title, year } = this.state;

        const validTitle = validateAlbumTitle(title,
            () => this.setState({ validTitle: true }),
            () => this.setState({ validTitle: false })
        );

        const validYear = validateAlbumYear(Number(year),
            () => this.setState({ validYear: true }),
            () => this.setState({ validYear: false })
        );

        if (validTitle && validYear) {
            const album: Album = { albumID, title, year: Number(year) };
            updateAlbum(album, () => {
                this.setState({ ...initialState });
            });
        }
    }

    render = () => {
        const { classes, fetching, albums } = this.props;
        const { isPending } = fetching;
        const disabled = isPending || this.state.albumID == initialState.albumID;

        return (
            <CardAdmin title="Edytuj informacje o albumie">
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
                        <FormHelperText>Wybierz album do edycji</FormHelperText>
                    </FormControl>
                </div>
                <DividerGradient />
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Nazwa albumu"
                        required
                        onChange={this.handleChangeTitle}
                        value={this.state.title}
                        disabled={disabled}
                        error={!this.state.validTitle} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Rok wydania"
                        required
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
                    disabled={isPending}>
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

const Styled = withStyles(classes, { withTheme: true })(UpdateAlbum);
export default connect(mapStateToProps, null)(Styled);