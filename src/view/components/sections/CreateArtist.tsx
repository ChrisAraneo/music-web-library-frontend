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
import Artist from "../../../model/Artist";

interface IProps {
    artistTypes: ArtistType[],
    classes: any
}

interface IState {
    artistName: string,
    firstName: string,
    lastName: string,
    country: string,
    birthDate: MaterialUiPickersDate,
    artistType: ArtistType | undefined,
}

const initialState = {
    artistName: "",
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    country: "",
    artistType: undefined
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

    submitForm = (event: any) => {

        const { artistName,
            firstName,
            lastName,
            birthDate,
            country,
            artistType } = this.state;

        postArtist(artistName, birthDate?.toJSON(), country, firstName, lastName, artistType, () => {
            this.setState({ ...initialState });
            alert("Wysłano, todo walidacja");
        });
    }

    render = () => {
        const { classes, fetching, artistTypes } = this.props;
        const { isPending } = fetching;
        const disabled = isPending;

        return (
            <div className={classes.marginBottom}>
                <CardAdmin title="Dodaj nowego wykonawcę">
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            className={classes.textInput}
                            fullWidth={true}
                            label="Pseudonim arytstyczny"
                            required
                            onChange={this.handleChangeArtistName}
                            value={this.state.artistName}
                            disabled={disabled} />
                        <TextField
                            className={classes.textInput}
                            fullWidth={true}
                            label="Imię"
                            onChange={this.handleChangeFirstName}
                            value={this.state.firstName}
                            disabled={disabled} />
                        <TextField
                            className={classes.textInput}
                            fullWidth={true}
                            label="Nazwisko"
                            onChange={this.handleChangeLastName}
                            value={this.state.lastName}
                            disabled={disabled} />
                        <div className={classes.textInput}>
                            <DatePicker
                                label={`Data rozpoczęcia działalności`}
                                value={this.state.birthDate}
                                handleChangeDate={this.handleChangeBirthDate}
                                disabled={disabled} />
                        </div>
                        <TextField
                            className={classes.textInput}
                            fullWidth={true}
                            label="Kraj"
                            onChange={this.handleChangeCountry}
                            value={this.state.country}
                            disabled={disabled} />
                        <FormControl className={classes.selectWrapper}>
                            <Select
                                id="type-select"
                                value={undefined}
                                onChange={this.handleChangeArtistType}
                                autoWidth
                                disabled={disabled}>
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
            </div>
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
    },
    marginBottom: {
        marginBottom: theme.spacing(3)
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