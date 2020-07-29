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
import { postArtist, updateArtist, getArtistsList, getArtist } from "../../../store/artists";
import { AppState } from "../../../store";
import Artist from "../../../model/Artist";
import { getArtistTypesList } from "../../../store/artistTypes";

interface IProps {
    classes: any,
    artists: Artist[],
    artistTypes: ArtistType[]
}

interface IState {
    artistID: number,
    artistName: string,
    firstName: string,
    lastName: string,
    country: string,
    birthDate: MaterialUiPickersDate,
    artistType: ArtistType | undefined,
}

const initialState = {
    artistID: Number.MIN_VALUE,
    artistName: "",
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    country: "",
    artistType: undefined
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

        let birthDate;
        if (this.state.birthDate) {
            birthDate = new Date();
            birthDate.setDate(this.state.birthDate.getDate());
            birthDate.setMonth(this.state.birthDate.getMonth());
            birthDate.setFullYear(this.state.birthDate.getFullYear());
        }

        const artist: Artist = { artistID, artistName, birthDate: birthDate ? birthDate : undefined, country, firstName, lastName, artistType };
        if (artist) {
            updateArtist(artist, () => {
                this.setState({ ...initialState });
                alert("Zmieniono, todo walidacja");
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
                                artists?.map((artist: Artist) => {
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
                        disabled={isPending || disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Imię"
                        onChange={this.handleChangeFirstName}
                        value={this.state.firstName}
                        disabled={isPending || disabled} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Nazwisko"
                        onChange={this.handleChangeLastName}
                        value={this.state.lastName}
                        disabled={isPending || disabled} />
                    <div className={classes.textInput}>
                        <DatePicker
                            label={`Data rozpoczęcia działalności`}
                            value={this.state.birthDate}
                            handleChangeDate={this.handleChangeBirthDate}
                            disabled={isPending || disabled} />
                    </div>
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Kraj"
                        onChange={this.handleChangeCountry}
                        value={this.state.country}
                        disabled={isPending || disabled} />
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeArtistType}
                            autoWidth
                            disabled={isPending || disabled}>
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