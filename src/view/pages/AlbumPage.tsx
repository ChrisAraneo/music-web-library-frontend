import React from "react";
import { connect } from "react-redux";
import { history, AppState } from "../../store/index";
import Artist from "../../model/Artist";

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Table from "../components/basic/Table";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Album from "../../model/Album";
import Song, { SongInAlbum } from "../../model/Song";
import { getAlbum, deleteSongFromAlbum } from "../../store/albums";
import PageHeader from "../components/basic/PageHeader";
import Review from "../../model/Review";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import { getPlaylistsList, addRecordToPlaylist } from "../../store/playlists";
import { getSong } from "../../store/songs";
import DialogAddSongToPlaylist from "../components/basic/DialogAddSongToPlaylist";
import Playlist from "../../model/Playlist";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ReviewIcon from '@material-ui/icons/RateReview';
import Button from "@material-ui/core/Button/Button";
import Role, { ROLE_ADMIN } from "../../model/Role";
import Cover from "../components/basic/Cover";

interface IProps {
    match: { params: { albumID: number } },
    classes: any
}

interface IState {
    open: boolean,
    selectedSongID: number | undefined,
    selectedPlaylistID: number | undefined
}

type Props = IProps & LinkStateProps;

class AlbumPage extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
            selectedSongID: undefined,
            selectedPlaylistID: undefined
        }
    }

    componentDidMount() {
        const { albumID } = this.props.match.params;
        getAlbum(albumID, (album: Album) => {
            album.songs?.forEach((sia: SongInAlbum) => {
                console.log("AHOY", sia);
                getSong(sia?.song?.songID);
            });
        });

        const { token } = this.props?.auth;
        if (token) {
            getPlaylistsList();
        }
    }

    handleToggleDialog = (data: any) => {
        if (!this.state.open) {
            const link = data["Tytuł"];
            if (link) {
                const { props } = link;
                const { to } = props;
                const parts = to.split("/");
                const songID = parts[parts.length - 1];

                this.setState({
                    open: true,
                    selectedSongID: songID
                });
            }
        } else {
            this.setState({
                open: false
            });
        }
    }

    handleChoosePlaylist = (playlistID: number) => {
        this.setState({
            selectedPlaylistID: playlistID
        });
    }

    handleAddSongToPlaylist = (selectedPlaylistID: number | undefined, selectedSongID: number | undefined) => {
        if (selectedSongID === undefined || selectedPlaylistID === undefined) {
            return;
        }

        addRecordToPlaylist(selectedPlaylistID, selectedSongID);

        this.setState({
            open: false,
            selectedSongID: undefined,
            selectedPlaylistID: undefined
        });
    }

    handleRemoveSongFromAlbum = (albumID: number, data: any) => {
        const link = data["Tytuł"];
        if (link) {
            const { props } = link;
            const { to } = props;
            const parts = to.split("/");
            const songID = Number(parts[parts.length - 1]);
            if (songID) {
                const track = Number(data['#']);
                if (typeof songID === "number" && typeof track === "number") {
                    deleteSongFromAlbum(albumID, songID, track);
                }
            }
        }
    }

    processAlbum = (album: Album | undefined) => {
        if (album) {
            return {
                "Tytuł albumu": album.title,
                "Rok": album.year
            }
        }
        return undefined;
    }

    processLength = (length: number | undefined) => {
        if (length !== undefined && length > 0) {
            const minutes = Math.floor(length / 60);
            const seconds = length - (minutes * 60);
            if (seconds >= 10) {
                return `${minutes}:${seconds}`;
            } else {
                return `${minutes}:0${seconds}`;
            }
        }
        return "";
    }

    processSongs = (songs: Array<SongInAlbum> | undefined) => {
        const data: any[] = [];

        songs?.forEach((item: SongInAlbum) => {
            const { id, song } = item;
            if (song) {
                const track = id.trackNumber;

                const title = (<Link component={RouterLink} to={`/songs/${song.songID}`}>{song.title}</Link>);

                const artists = song.artists?.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);

                const length = (this.props.songs && this.props.songs[song.songID]) ? this.processLength(this.props.songs[song.songID]?.length) : "";

                data.push({
                    "#": track,
                    "Tytuł": title,
                    "Wykonawcy": artists,
                    "Czas": length
                });
            }
        });

        data.sort((A, B) => A['#'] - B['#']);
        return data;
    }

    processReviews = (reviews: Array<Review> | undefined) => {
        const { classes } = this.props;
        const data: object[] = [];

        reviews?.forEach((review: Review) => {
            const { reviewID } = review;
            const row = (<>
                <Link href="#" variant="body1" className={classes.reviewShort} component={RouterLink} to={`/reviews/${reviewID}`}>
                    {review.title}
                </Link>
                <Typography className={classes.reviewShort} variant="body2" component="p">
                    {`${String(review.content).substring(0, 380)}...`}
                </Typography>
                <Link href="#" variant="body2" component={RouterLink} to={`/reviews/${reviewID}`}>
                    {` Czytaj więcej`}
                </Link>
            </>);
            data.push({
                "Recenzja": row
            });
        });

        return data;
    }

    render = () => {
        const { fetching, albums, playlists, match, auth } = this.props;
        const { isPending } = fetching;
        const { token, roles } = auth;
        const { albumID } = match.params;

        const { open, selectedSongID, selectedPlaylistID } = this.state;

        const album = albums.find((album: Album) => (album ? album.albumID == albumID : undefined));
        const cover = album?.cover;
        const reviews = album?.reviews;

        const isAdmin = (roles?.find((role: Role) => role?.name == ROLE_ADMIN) ? true : false);
        const actions = [];
        if (token) {
            actions.push({
                icon: 'add',
                element: <PlaylistAddIcon />,
                onClick: (event: any, data: any) => this.handleToggleDialog(data)
            });
        }
        if (isAdmin) {
            actions.push({
                icon: 'add',
                element: <DeleteForeverIcon />,
                onClick: (event: any, data: any) => this.handleRemoveSongFromAlbum(albumID, data)
            })
        }

        return (
            <>
                <DialogAddSongToPlaylist
                    playlists={playlists}
                    open={open}
                    selectedPlaylistID={selectedPlaylistID}
                    selectedSongID={selectedSongID}
                    handleClose={() => this.setState({ open: false })}
                    handleChoosePlaylist={(playlistID: number) => this.handleChoosePlaylist(playlistID)}
                    submit={() => this.handleAddSongToPlaylist(selectedPlaylistID, selectedSongID)}
                />
                <PageHeader
                    title={album?.title}
                    aboveTitle="Album muzyczny" />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={cover ? 8 : 12}>
                                <Table
                                    title={`Utwory w albumie muzycznym`}
                                    objects={this.processSongs(album?.songs)}
                                    isPending={isPending}
                                    actions={actions} />
                            </Grid>
                            {
                                cover ?
                                    (<Grid item xs={12} md={4}>
                                        <Cover data={cover?.data} />
                                    </Grid>)
                                    :
                                    null
                            }
                        </Grid>
                    </Grid>


                    <Grid item xs={12} md={12}>
                        <Table
                            title="Recenzje albumu"
                            objects={this.processReviews(reviews)}
                            isPending={isPending}
                        />
                    </Grid>
                    {
                        token ?
                            (<Grid item xs={12} md={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ReviewIcon />}
                                    onClick={() => history.push(`/writereview/${albumID}`)}>
                                    Napisz recenzję
                                </Button>
                            </Grid>)
                            :
                            null
                    }
                </Grid>
            </>
        );
    }
};

const styles = (theme: Theme) => createStyles({
    reviewShort: {
        margin: theme.spacing(1, 0, 1, 0)
    }
});

interface LinkStateProps {
    fetching: any,
    albums: Album[],
    playlists: Playlist[],
    songs: Song[],
    auth: any
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        albums: state.albums,
        playlists: state.playlists,
        songs: state.songs,
        auth: state.auth
    });

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(AlbumPage));