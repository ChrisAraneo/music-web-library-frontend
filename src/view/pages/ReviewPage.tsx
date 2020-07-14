import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Table from "../components/Table";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Album from "../../model/Album";
import { SongInAlbum } from "../../model/Song";
import { getAlbum, getAlbumsList } from "../../store/albums";
import PageHeader from "../components/PageHeader";
import Review from "../../model/Review";
import { Theme, withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import { getPlaylistsList, addRecordToPlaylist } from "../../store/playlists";
import { getSongsList } from "../../store/songs";
import DialogAddSongToPlaylist from "../components/DialogAddSongToPlaylist";
import Playlist from "../../model/Playlist";
import Icon from '@material-ui/icons/PlaylistAdd';
import { getReview } from "../../store/reviews";
import Card from "../components/Card";
import Paper from "@material-ui/core/Paper/Paper";
import DividerGradient from "../components/DividerGradient";
import { CircularProgress } from "@material-ui/core";


interface IPropsCard {
    review: Review | undefined,
    children?: any
}

const ReviewCard: React.FC<IPropsCard> = (props: IPropsCard) => {
    const { review } = props;
    const styles = useStyles();

    if (review === undefined) {
        return (
            <Paper className={styles.root} elevation={2}>
                <CircularProgress />
            </Paper>
        );
    } else {
        const { title, content, user, album } = review;

        return (
            <Paper className={styles.root} elevation={2}>
                <div className={styles.contentWrapper}>
                    {
                        user ?
                            (<Typography variant="body2" gutterBottom className={styles.written}>
                                {user.name} napisał/a:
                            </Typography>)
                            :
                            null
                    }
                    <Typography variant="body1" gutterBottom>
                        {content}
                    </Typography>
                </div>
                <DividerGradient />
                <div className={styles.footer}>
                    {
                        album ?
                            (<Link component={RouterLink} to={`/albums/${album?.albumID}`}>Wróć do albumu</Link>)
                            :
                            null
                    }
                </div>
            </Paper>
        );
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        contentWrapper: {
            padding: theme.spacing(3),
        },
        written: {
            marginBottom: theme.spacing(2)
        },
        footer: {
            padding: theme.spacing(2, 3, 2, 3),
        }
    })
);

interface IProps {
    match: { params: { reviewID: number } },
    classes: any
}

interface IState {
}

type Props = IProps & LinkStateProps;

class ReviewPage extends React.Component<Props, IState> {

    componentDidMount() {
        const { reviewID } = this.props.match.params;
        getReview(reviewID);
    }

    // processAlbum = (album: Album | undefined) => {
    //     if (album) {
    //         return {
    //             "Tytuł albumu": album.title,
    //             "Rok": album.year
    //         }
    //     }
    //     return undefined;
    // }

    // processLength = (length: number) => {
    //     const minutes = Math.floor(length / 60);
    //     const seconds = length - (minutes * 60);
    //     if (seconds >= 10) {
    //         return `${minutes}:${seconds}`;
    //     } else {
    //         return `${minutes}:0${seconds}`;
    //     }
    // }

    // processSongs = (songs: Array<SongInAlbum> | undefined) => {
    //     const data: any[] = [];

    //     songs?.forEach((item: SongInAlbum) => {
    //         const { id, song } = item;
    //         if (song) {
    //             const track = id.trackNumber;

    //             const title = (<Link component={RouterLink} to={`/songs/${song.songID}`}>{song.title}</Link>);

    //             const artists = song.artists?.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);

    //             const length = (song.length ? this.processLength : '');

    //             data.push({
    //                 "#": track,
    //                 "Tytuł": title,
    //                 "Wykonawcy": artists,
    //                 "Czas": length
    //             });
    //         }
    //     });

    //     data.sort((A, B) => A['#'] - B['#']);
    //     return data;
    // }

    // processReviews = (reviews: Array<Review> | undefined) => {
    //     const { classes } = this.props;
    //     const data: object[] = [];

    //     reviews?.forEach((review: Review) => {
    //         const { reviewID } = review;
    //         const row = (<>
    //             <Link href="#" variant="body1" className={classes.reviewShort} component={RouterLink} to={`/reviews/${reviewID}`}>
    //                 {review.title}
    //             </Link>
    //             <Typography className={classes.reviewShort} variant="body2" component="p">
    //                 {`${String(review.content).substring(0, 380)}...`}
    //             </Typography>
    //             <Link href="#" variant="body2" component={RouterLink} to={`/reviews/${reviewID}`}>
    //                 {` Czytaj więcej`}
    //             </Link>
    //         </>);
    //         data.push({
    //             "Recenzja": row
    //         });
    //     });

    //     return data;
    // }

    render = () => {
        const { fetching, reviews, match, auth, classes } = this.props;
        const { isPending } = fetching;
        const { token } = auth;
        const { reviewID } = match.params;

        const review = reviews.find((review: Review) => (review ? review.reviewID == reviewID : undefined));

        const title = review ? review.title : "Brak tytułu";
        const content = review ? review.content : "Brak zawartości";

        const album = review ? (review.album ? review.album : undefined) : undefined;
        const albumLink = album ? (<Link component={RouterLink} to={`/albums/${album?.albumID}`}>{album?.title}</Link>) : null;

        return (
            <Grid className={classes.root} container spacing={0}>
                <Grid item xs={12} md={8}>
                    <PageHeader
                        title={title}
                        aboveTitle={albumLink ?
                            (<><span className={classes.spanWithMargin}>Recenzja albumu</span> {albumLink}</>) : null}
                    />
                    <ReviewCard review={review} />
                </Grid>
            </Grid>
        );
    }
};

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '100%',
        justifyContent: 'center'
    },
    spanWithMargin: {
        margin: theme.spacing(0, 1, 0, 0)
    }
});

interface LinkStateProps {
    fetching: any,
    reviews: Review[],
    auth: any
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        reviews: state.reviews,
        auth: state.auth
    });

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(ReviewPage));