import React from "react";
import { connect } from "react-redux";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import Button from "@material-ui/core/Button/Button";
import { AppState } from "../../../store";
import { deleteSong } from "../../../store/songs";
import Select from "@material-ui/core/Select/Select";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Album from "../../../model/Album";
import { deleteAlbum } from "../../../store/albums";
import { compareByProperty } from "../../../model/common/functions";

interface IProps {
    classes: any,
    albums: Album[]
}

interface IState {
    albumID: number
}

const initialState = {
    albumID: Number.MIN_VALUE
}

type Props = IProps & LinkStateProps;

class RemoveAlbum extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = { ...initialState };
    }

    handleChangeAlbum = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            this.setState({ albumID: value });
        }
    }

    submitForm = () => {
        const { albumID } = this.state;
        if (albumID != initialState.albumID) {
            deleteAlbum(albumID,
                () => {
                    this.setState({ ...initialState });
                });
        }
    }

    render = () => {
        const { classes, fetching, albums } = this.props;
        const { isPending } = fetching;
        const disabled = isPending || this.state.albumID == initialState.albumID;

        return (
            <CardAdmin title="Usuń album">
                <div className={classes.form}>
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeAlbum}
                            required
                            autoWidth>
                            {
                                [...albums].sort((a: Album, b: Album) => compareByProperty(a, b, "title")).map((album: Album) => {
                                    if (album) {
                                        return (<MenuItem key={album?.albumID} value={album?.albumID}>{album?.title}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz album do usunięcia</FormHelperText>
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
                    disabled={disabled}>
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

const Styled = withStyles(classes, { withTheme: true })(RemoveAlbum);
export default connect(mapStateToProps, null)(Styled); 