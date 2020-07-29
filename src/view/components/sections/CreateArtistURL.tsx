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
import { postArtist, updateArtist, getArtistsList, getArtist, postArtistURL } from "../../../store/artists";
import { AppState } from "../../../store";
import Artist from "../../../model/Artist";
import { getArtistTypesList } from "../../../store/artistTypes";

interface IProps {
    classes: any,
    artists: Artist[]
}

interface IState {
    artistID: number,
    url: string
}

const initialState = {
    artistID: Number.MIN_VALUE,
    url: ""
}

type Props = IProps & LinkStateProps;

class CreateArtistURL extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleChangeArtist = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            this.setState({ artistID: value });
            getArtist(value, (artist: Artist) => {
                this.setState({ artistID: artist.artistID });
            });
        }
    }

    handleChangeURL = (event: any) => {
        this.setState({ url: event?.target?.value });
    }

    submitForm = () => {
        const { artistID, url } = this.state;

        if (artistID != initialState.artistID) {
            postArtistURL(artistID, url, () => {
                this.setState({ ...initialState });
                alert("Zmieniono, todo walidacja");
            });
        }
    }

    render = () => {
        const { classes, fetching, artists } = this.props;
        const { isPending } = fetching;
        const disabled = this.state.artistID == Number.MIN_VALUE;

        return (
            <CardAdmin title="Dodaj URL wykonawcy">
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
                        <FormHelperText>Wybierz wykonawcę</FormHelperText>
                    </FormControl>
                </div>
                <DividerGradient />
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="URL"
                        required
                        onChange={this.handleChangeURL}
                        value={this.state.url}
                        disabled={isPending || disabled} />
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
                    Dodaj
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

const StyledCreateArtist = withStyles(classes, { withTheme: true })(CreateArtistURL);
export default connect(mapStateToProps, null)(StyledCreateArtist);