import React from "react";


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

interface IProps {
    classes: any,
    isPending: any,
    artistTypes: ArtistType[] | undefined
}

interface IState {
    artistName: string,
    firstName: string,
    lastName: string,
    country: string,
    birthDate: MaterialUiPickersDate,
    artistType: ArtistType | undefined,
}

class AddArtist extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            artistName: "",
            firstName: "",
            lastName: "",
            birthDate: new Date(),
            country: "",
            artistType: undefined,
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

    // TODO
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
        alert("TODO");
        /*

{"artistID":1,"artistName":"Michał Meloman","birthDate":"1989-12-12","country":"Polska","firstName":"Michał","lastName":"Meloman","artistType":{"artistTypeID":1,"name":"Główny wykonawca"},"albums":[{"albumID":1,"title":"Najmniejsze przeboje","year":2020}],"urls":[{"artistUrlID":1,"url":"http://www.google.pl/"}]}

        */
    }

    render = () => {
        const { classes, isPending, artistTypes } = this.props;

        return (
            <CardAdmin title="Dodaj nowego wykonawcę">
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Pseudonim arytstyczny"
                        required
                        onChange={this.handleChangeArtistName}
                        value={this.state.artistName} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Imię"
                        onChange={this.handleChangeFirstName}
                        value={this.state.firstName} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Nazwisko"
                        onChange={this.handleChangeLastName}
                        value={this.state.lastName} />
                    <DatePicker
                        label={`Data rozpoczęcia działalności`}
                        value={this.state.birthDate}
                        handleChangeDate={this.handleChangeBirthDate} />
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Kraj"
                        onChange={this.handleChangeCountry}
                        value={this.state.country} />
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeArtistType}
                            autoWidth>
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
                    disabled={isPending}>
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

export default (withStyles(classes, { withTheme: true })(AddArtist));