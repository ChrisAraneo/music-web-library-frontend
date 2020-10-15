import React from "react";
import { connect } from "react-redux";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import Button from "@material-ui/core/Button/Button";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import { getArtist } from "../../../store/artists";
import { AppState } from "../../../store";
import Artist from "../../../model/Artist";
import { deleteArtist } from "../../../store/artists";
import { compareByProperty } from "../../../model/common/functions";

interface IProps {
    classes: any,
    artists: Artist[]
}

interface IState {
    artistID: number
}

const initialState = {
    artistID: Number.MIN_VALUE
}

type Props = IProps & LinkStateProps;

class RemoveArtist extends React.Component<Props, IState> {

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

    submitForm = () => {
        const { artistID } = this.state;
        if (artistID != initialState.artistID) {
            deleteArtist(artistID);
        }
    }

    render = () => {
        const { classes, fetching, artists } = this.props;
        const { isPending } = fetching;
        const disabled = this.state.artistID == Number.MIN_VALUE;

        return (
            <CardAdmin title="Usuń wykonawcę">
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
                        <FormHelperText>Wybierz wykonawcę</FormHelperText>
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

const Styled = withStyles(classes, { withTheme: true })(RemoveArtist);
export default connect(mapStateToProps, null)(Styled);