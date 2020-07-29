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
import { deleteArtist } from "../../../store/artists";
import { getArtistType, deleteArtistType } from "../../../store/artistTypes";

interface IProps {
    classes: any,
    artistTypes: ArtistType[]
}

interface IState {
    artistTypeID: number
}

const initialState = {
    artistTypeID: Number.MIN_VALUE
}

type Props = IProps & LinkStateProps;

class RemoveArtistType extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleChangeArtistType = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            this.setState({ artistTypeID: value });
            getArtistType(value, (type: ArtistType) => {
                this.setState({ artistTypeID: type?.artistTypeID });
            });
        }
    }

    submitForm = () => {
        const { artistTypeID } = this.state;
        deleteArtistType(artistTypeID);
    }

    render = () => {
        const { classes, fetching, artistTypes } = this.props;
        const { isPending } = fetching;
        const disabled = this.state?.artistTypeID == Number.MIN_VALUE;

        return (
            <CardAdmin title="Usuń rodzaj działalności muzycznej">
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
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    size="large"
                    onClick={this.submitForm}
                    disabled={isPending || disabled}>
                    Usuń
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

const Styled = withStyles(classes, { withTheme: true })(RemoveArtistType);
export default connect(mapStateToProps, null)(Styled);