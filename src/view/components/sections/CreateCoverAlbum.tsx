import React from "react";
import { connect } from "react-redux";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import Button from "@material-ui/core/Button/Button";
import { AppState } from "../../../store";
import Select from "@material-ui/core/Select/Select";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Album from "../../../model/Album";
import { getAlbum, attachCoverToAlbum } from "../../../store/albums";
import Cover from "../../../model/Cover";
import { getCover } from "../../../store/covers";

interface IProps {
    classes: any,
    albums: Album[],
    covers: Cover[]
}

interface IState {
    albumID: number,
    coverID: number
}

const initialState = {
    albumID: Number.MIN_VALUE,
    coverID: Number.MIN_VALUE
}

type Props = IProps & LinkStateProps;

class CreateCoverAlbum extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = { ...initialState };
    }

    handleChangeAlbum = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            getAlbum(value, () => {
                this.setState({ albumID: value });
            });
        }
    }

    handleChangeCover = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            getCover(value, () => this.setState({ coverID: value }));
        }
    }

    submitForm = () => {
        const { albumID, coverID } = this.state;
        if (albumID && coverID) {
            attachCoverToAlbum(albumID, coverID,
                () => {
                    this.setState({ ...initialState });
                    alert("TODO walidacja");
                });
        }
    }

    render = () => {
        const { classes, fetching, albums, covers } = this.props;
        const { isPending } = fetching;
        const disabled = isPending || this.state.albumID == initialState.albumID || this.state.coverID == initialState.coverID;

        return (
            <CardAdmin title="Przypisz okładkę do albumu">
                <div className={classes.form}>
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeAlbum}
                            required
                            autoWidth>
                            {
                                albums?.map((album: Album) => {
                                    if (album) {
                                        return (<MenuItem key={album?.albumID} value={album?.albumID}>{album?.title}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz album</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeCover}
                            required
                            autoWidth>
                            {
                                covers?.map((cover: Cover) => {
                                    if (cover) {
                                        return (<MenuItem key={cover?.coverID} value={cover?.coverID}>{cover?.data}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz okładkę</FormHelperText>
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
                    Dodaj okładkę do albumu
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

const Styled = withStyles(classes, { withTheme: true })(CreateCoverAlbum);
export default connect(mapStateToProps, null)(Styled);