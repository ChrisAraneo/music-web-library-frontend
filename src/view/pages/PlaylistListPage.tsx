import React from "react";
import { Provider, connect } from "react-redux";
import { store, AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { getArtistsList, getArtist } from "../../store/artists";

import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Playlist from "../../model/Playlist";

import Page from '../components/Page';
import Card from "../components/Card";
import Table from "../components/Table";
import Error from "../components/Error";
import { getPlaylistsList, postPlaylist } from "../../store/playlists";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

interface IProps {
    classes: any
}

interface IState {
    title: string
}

type Props = IProps & LinkStateProps;

class PlaylistListPage extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            title: ""
        }
    }

    componentDidMount() {
        getPlaylistsList();
    }

    handleChangeTitle = (event: any) => {
        this.setState({ title: event?.target?.value });
    }

    submitForm = (event: any) => {
        const { title } = this.state;
        if (title.length > 0) {
            postPlaylist(title, () => this.setState({ title: "" }));
        }
    }

    processData = (playlists: Array<Playlist>) => {
        const data: any[] = [];
        playlists.forEach(playlist => {
            if (playlist) {
                data.push({
                    "Tytuł listy utworów": (<Link component={RouterLink} to={`/playlists/${playlist.playlistID}`}>{playlist.title}</Link>),
                    "Twórca listy": playlist.user?.name
                });
            }
        });
        return data;
    }

    render = () => {
        const { isPending, hasError, error } = this.props.fetching;
        const { playlists } = this.props;

        const data = this.processData(playlists);
        const { classes } = this.props;

        return (
            <>
                {
                    hasError ?
                        (<Error title="Błąd pobierania danych" error={error} />)
                        :
                        null
                }

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Table title="Twoje listy utworów" objects={data} isPending={isPending} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card title="Utwórz nową listę utworów">
                            <form className={classes.form} noValidate autoComplete="off">
                                <TextField
                                    className={classes.textInput}
                                    fullWidth={true}
                                    label="Nazwa listy"
                                    required
                                    onChange={this.handleChangeTitle}
                                    value={this.state.title} />
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    size="large"
                                    onClick={this.submitForm}
                                    disabled={isPending}>
                                    Utwórz listę
                                </Button>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </>
        );
    }
};

const styles = (theme: Theme) => createStyles({
    form: {
        padding: theme.spacing(3)
    },
    textInput: {
        marginBottom: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(1, 0, 0, 0)
    }
});

interface LinkStateProps {
    fetching: any,
    playlists: Playlist[]
}
const mapStateToProps = (
    state: AppState,
    ownProps: IProps
): LinkStateProps => ({
    fetching: state.fetching,
    playlists: state.playlists
});

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(PlaylistListPage));