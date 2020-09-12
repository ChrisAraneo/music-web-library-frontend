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
import { postArtist } from "../../../store/artists";
import { AppState } from "../../../store";
import Artist, { validateArtistName, validateArtistFirstName, validateArtistCountry, validateArtistLastName, validateArtistBirthDate, validateArtistType } from "../../../model/Artist";

interface IProps {
    artistTypes: ArtistType[],
    classes: any
}

interface IState {
    artistName: string,
    validArtistName: boolean,
    firstName: string,
    validFirstName: boolean,
    lastName: string,
    validLastName: boolean,
    country: string,
    validCountry: boolean,
    birthDate: MaterialUiPickersDate | undefined,
    validBirthDate: boolean,
    artistType: ArtistType | undefined,
    validArtistType: boolean
}

const initialState = {
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

class CreateArtist extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = initialState;
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
        const { artistName,
            firstName,
            lastName,
            birthDate,
            country,
            artistType } = this.state;

        const validArtistName = validateArtistName(artistName,
            () => this.setState({ validArtistName: true }),
            () => this.setState({ validArtistName: false })
        );

        let validFirstName = true;
        if (firstName.length > 0) {
            validFirstName = validateArtistFirstName(firstName,
                () => this.setState({ validFirstName: true }),
                () => this.setState({ validFirstName: false })
            );
        }

        let validLastName = true;
        if (lastName.length > 0) {
            validLastName = validateArtistLastName(lastName,
                () => this.setState({ validLastName: true }),
                () => this.setState({ validLastName: false })
            );
        }

        let validBirthDate = true;
        if (birthDate != initialState.birthDate) {
            validBirthDate = validateArtistBirthDate(birthDate,
                () => this.setState({ validBirthDate: true }),
                () => this.setState({ validBirthDate: false })
            );
        }

        let validCountry = true;
        if (country.length > 0) {
            validCountry = validateArtistCountry(country,
                () => this.setState({ validCountry: true }),
                () => this.setState({ validCountry: false })
            );
        }

        let validArtistType = true;
        if (artistType != initialState.artistType) {
            validArtistType = validateArtistType(artistType,
                () => this.setState({ validArtistType: true }),
                () => this.setState({ validArtistType: false })
            );
        }

        if (validArtistName && validFirstName && validLastName && validBirthDate && validCountry && validArtistType) {
            postArtist(artistName, birthDate?.toJSON(), country, firstName, lastName, artistType, () => {
                this.setState({ ...initialState });
            });
        }
    }

    render = () => {
        const { classes, fetching, artistTypes } = this.props;
        const { isPending } = fetching;
        const disabled = isPending;

        return (
            <CardAdmin title="Dodaj nowego wykonawcę">
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Pseudonim arytstyczny"
                        required
                        onChange={this.handleChangeArtistName}
                        value={this.state.artistName}
                        disabled={disabled}
                        error={this.state.validArtistName} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Imię"
                        onChange={this.handleChangeFirstName}
                        value={this.state.firstName}
                        disabled={disabled}
                        error={this.state.validFirstName} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Nazwisko"
                        onChange={this.handleChangeLastName}
                        value={this.state.lastName}
                        disabled={disabled}
                        error={this.state.validLastName} />
                    <div className={classes.textInput}>
                        <DatePicker
                            label={`Data rozpoczęcia działalności`}
                            value={this.state.birthDate ? this.state.birthDate : new Date()}
                            handleChangeDate={this.handleChangeBirthDate}
                            disabled={disabled}
                            error={this.state.validBirthDate} />
                    </div>
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Kraj"
                        onChange={this.handleChangeCountry}
                        value={this.state.country}
                        disabled={disabled}
                        error={this.state.validCountry} />
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeArtistType}
                            autoWidth
                            disabled={disabled}
                            error={this.state.validArtistType}>
                            {
                                artistTypes?.map((type: ArtistType) => {
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
                    disabled={disabled}>
                    Dodaj wykonawcę
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

const StyledCreateArtist = withStyles(classes, { withTheme: true })(CreateArtist);
export default connect(mapStateToProps, null)(StyledCreateArtist);