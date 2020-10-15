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
import { getAlbum, detachCoverFromAlbum } from "../../../store/albums";
import Cover from "../../../model/Cover";
import { compareByProperty } from "../../../model/common/functions";

interface IProps {
    classes: any,
    albums: Album[]
}

interface IState {
    albumID: number,
    cover?: Cover,
}

const initialState = {
    albumID: Number.MIN_VALUE,
    cover: undefined
}

type Props = IProps & LinkStateProps;

class RemoveCoverAlbum extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = { ...initialState };
    }

    handleChangeAlbum = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            getAlbum(value, (album: Album) => {
                this.setState({
                    albumID: album?.albumID,
                    cover: album?.cover
                });
            });
        }
    }

    submitForm = () => {
        const { albumID, cover } = this.state;
        if (albumID != initialState.albumID && cover != initialState.cover) {
            const { coverID } = cover;
            if (coverID !== undefined && coverID !== null) {
                detachCoverFromAlbum(coverID, albumID,
                    () => {
                        this.setState({ ...initialState });
                        getAlbum(albumID);
                    });
            }
        }
    }

    render = () => {
        const { classes, fetching, albums } = this.props;
        const { isPending } = fetching;
        const disabled = isPending || this.state.albumID == initialState.albumID || this.state.cover == initialState.cover;

        return (
            <CardAdmin title="Usuń powiązanie okładki z utworem">
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
                                    if (album && album?.albumID) {
                                        return (<MenuItem key={album.albumID} value={album.albumID}>{album.title}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz album</FormHelperText>
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
                    Usuń okładkę z tego albumu
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

const Styled = withStyles(classes, { withTheme: true })(RemoveCoverAlbum);
export default connect(mapStateToProps, null)(Styled); 