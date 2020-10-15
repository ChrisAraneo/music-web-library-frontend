import React from "react";
import { connect } from "react-redux";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import ArtistType from "../../../model/ArtistType";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import DatePicker from "../basic/DatePicker";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { updateArtist, getArtist } from "../../../store/artists";
import { AppState } from "../../../store";
import Artist, { validateArtistCountry, validateArtistName, validateArtistFirstName, validateArtistLastName, validateArtistType } from "../../../model/Artist";
import { compareByProperty } from "../../../model/common/functions";

interface IProps {
    classes: any,
    artists: Artist[],
    artistTypes: ArtistType[]
}

interface IState {
    artistID: number,
    artistName: string,
    validArtistName: boolean
    firstName?: string,
    validFirstName: boolean,
    lastName?: string,
    validLastName: boolean,
    country?: string,
    validCountry: boolean,
    birthDate?: MaterialUiPickersDate | undefined,
    validBirthDate: boolean,
    artistType?: ArtistType | undefined,
    validArtistType: boolean
}

const initialState = {
    artistID: Number.MIN_VALUE,
    artistName: "",
    validArtistName: true,
    firstName: "",
    validFirstName: true,
    lastName: "",
    validLastName: true,
    birthDate: undefined,
    validBirthDate: true,
    country: "",
    validCountry: true,
    artistType: undefined,
    validArtistType: true
}

type Props = IProps & LinkStateProps;

class UpdateArtist extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleChangeArtist = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            this.setState({ artistID: value });
            getArtist(value, (artist: Artist) => {
                this.setState({
                    artistID: artist.artistID,
                    artistName: artist.artistName,
                    firstName: artist.firstName || "",
                    lastName: artist.lastName || "",
                    birthDate: artist.birthDate || new Date(0),
                    country: artist.country || "",
                    artistType: undefined
                });
            });
        }
    }

    handleChangeArtistName = (event: any) => {
        this.setState({ artistName: event?.target?.value });
    }

    handleChangeFirstName = (event: any) => {
        this.setState({ firstName: event?.target?.value });
    }

    handleChangeLastName = (event: any) => {
        this.setState({ lastName: event?.target?.value });
    }

    handleChangeBirthDate = (pickersDate: MaterialUiPickersDate) => {
        this.setState({ birthDate: pickersDate });
    }

    handleChangeCountry = (event: any) => {
        this.setState({ country: event?.target?.value });
    }

    handleChangeArtistType = (event: any) => {
        this.setState({ artistType: event?.target?.value });
    }

    submitForm = () => {
        const { artistID, artistName, country, firstName, lastName, artistType } = this.state;

        const validArtistID = (artistID != initialState.artistID);

        const validArtistName = validateArtistName(artistName,
            () => this.setState({ validArtistName: true }),
            () => this.setState({ validArtistName: false })
        );

        let validCountry = true;
        if (country != initialState.country) {
            validCountry = validateArtistCountry(country,
                () => this.setState({ validCountry: true }),
                () => this.setState({ validCountry: false })
            );
        }

        let validFirstName = true;
        if (firstName != initialState.firstName) {
            validFirstName = validateArtistFirstName(firstName,
                () => this.setState({ validFirstName: true }),
                () => this.setState({ validFirstName: false })
            );
        }

        let validLastName = true;
        if (lastName != initialState.lastName) {
            validLastName = validateArtistLastName(lastName,
                () => this.setState({ validLastName: true }),
                () => this.setState({ validLastName: false })
            );
        }

        let validArtistType = true;
        if (artistType != initialState.artistType) {
            validArtistType = validateArtistType(artistType,
                () => this.setState({ validArtistType: true }),
                () => this.setState({ validArtistType: false })
            );
        }

        if (validArtistID && validArtistName && validCountry && validFirstName && validLastName && validArtistType) {
            let birthDate = undefined;
            if (this.state.birthDate) {
                birthDate = new Date();
                birthDate.setDate(this.state.birthDate.getDate());
                birthDate.setMonth(this.state.birthDate.getMonth());
                birthDate.setFullYear(this.state.birthDate.getFullYear());
            }
            const artist: Artist = { artistID, artistName, birthDate: birthDate ? birthDate : undefined, country, firstName, lastName, artistType };
            updateArtist(artist, () => {
                this.setState({ ...initialState });
            });
        }
    }

    render = () => {
        const { classes, fetching, artists, artistTypes } = this.props;
        const { isPending } = fetching;
        const disabled = this.state.artistID == Number.MIN_VALUE;

        return (
            <CardAdmin title="Edytuj informacje o wykonawcy">
                <div className={classes.form}>
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeArtist}
                            required
                            autoWidth>
                            {
                                [...artists].sort((a: Artist, b: Artist) => compareByProperty(a, b, "artistName")).map((artist: Artist) => {
                                    if (artist) {
                                        return (<MenuItem key={artist?.artistID} value={artist?.artistID}>{artist?.artistName}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz wykonawcę do edycji</FormHelperText>
                    </FormControl>
                </div>
                <DividerGradient />
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Pseudonim arytstyczny"
                        required
                        onChange={this.handleChangeArtistName}
                        value={this.state.artistName}
                        disabled={isPending || disabled}
                        error={!this.state.validArtistName} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Imię"
                        onChange={this.handleChangeFirstName}
                        value={this.state.firstName}
                        disabled={isPending || disabled}
                        error={!this.state.validFirstName} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Nazwisko"
                        onChange={this.handleChangeLastName}
                        value={this.state.lastName}
                        disabled={isPending || disabled}
                        error={!this.state.validLastName} />
                    <div className={classes.textInput}>
                        <DatePicker
                            label={`Data rozpoczęcia działalności`}
                            value={this.state.birthDate ? this.state.birthDate : new Date()}
                            handleChangeDate={this.handleChangeBirthDate}
                            disabled={isPending || disabled} />
                    </div>
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Kraj"
                        onChange={this.handleChangeCountry}
                        value={this.state.country}
                        disabled={isPending || disabled}
                        error={!this.state.validCountry} />
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeArtistType}
                            autoWidth
                            disabled={isPending || disabled}>
                            {
                                [...artistTypes].sort((a: ArtistType, b: ArtistType) => compareByProperty(a, b, "name")).map((type: ArtistType) => {
                                    if (type) {
                                        return (<MenuItem key={type?.artistTypeID} value={type?.artistTypeID}>{type?.name}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Rodzaj działalności</FormHelperText>
                    </FormControl>
                </form>
                <DividerGradient />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    size="large"
                    onClick={this.submitForm}
                    disabled={isPending || disabled}>
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

const StyledCreateArtist = withStyles(classes, { withTheme: true })(UpdateArtist);
export default connect(mapStateToProps, null)(StyledCreateArtist);