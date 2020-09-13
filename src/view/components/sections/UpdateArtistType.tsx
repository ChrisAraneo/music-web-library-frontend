import React from "react";
import { connect } from "react-redux";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import ArtistType, { validateArtistTypeName } from "../../../model/ArtistType";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import { AppState } from "../../../store";
import { getArtistType, updateArtistType } from "../../../store/artistTypes";

interface IProps {
    classes: any,
    artistTypes: ArtistType[]
}

interface IState {
    artistTypeID: number,
    name: string,
    validName: boolean
}

const initialState = {
    artistTypeID: Number.MIN_VALUE,
    name: "",
    validName: true
}

type Props = IProps & LinkStateProps;

class UpdateArtistType extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleChangeArtistType = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            this.setState({ artistTypeID: value });
            getArtistType(value, (type: ArtistType) => {
                this.setState({
                    artistTypeID: type?.artistTypeID,
                    name: type?.name
                });
            });
        }
    }

    handleChangeName = (event: any) => {
        this.setState({ name: event?.target?.value });
    }

    submitForm = () => {
        const { artistTypeID, name } = this.state;

        const validArtistTypeID = (artistTypeID != initialState.artistTypeID);

        const validName = validateArtistTypeName(name,
            () => this.setState({ validName: true }),
            () => this.setState({ validName: false })
        );

        if (validArtistTypeID && validName) {
            const type: ArtistType = { artistTypeID, name };
            updateArtistType(type, () => {
                this.setState({ ...initialState });
            });
        }
    }

    render = () => {
        const { classes, fetching, artistTypes } = this.props;
        const { isPending } = fetching;
        const disabled = this.state.artistTypeID == Number.MIN_VALUE;

        return (
            <CardAdmin title="Edytuj działalność muzyczną">
                <div className={classes.form}>
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeArtistType}
                            required
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
                        <FormHelperText>Wybierz</FormHelperText>
                    </FormControl>
                </div>
                <DividerGradient />
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="Nazwa"
                        required
                        onChange={this.handleChangeName}
                        value={this.state.name}
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

const StyledCreateArtist = withStyles(classes, { withTheme: true })(UpdateArtistType);
export default connect(mapStateToProps, null)(StyledCreateArtist);