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
import { getAlbum } from "../../store/albums";
import PageHeader from "../components/PageHeader";
import Review from "../../model/Review";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";

interface IProps {
    match: { params: { albumID: number } },
    classes: any
}

interface IState {

}

type Props = IProps & LinkStateProps;

class AlbumPage extends React.Component<Props, IState> {

    componentDidMount() {
        const { albumID } = this.props.match.params;
        getAlbum(albumID);
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

    processLength = (length: number) => {
        const minutes = Math.floor(length / 60);
        const seconds = length - (minutes * 60);
        if (seconds >= 10) {
            return `${minutes}:${seconds}`;
        } else {
            return `${minutes}:0${seconds}`;
        }
    }

    processSongs = (songs: Array<SongInAlbum> | undefined) => {
        const data: any[] = [];

        songs?.forEach((item: SongInAlbum) => {
            const { id, song } = item;
            if (song) {
                const track = id.trackNumber;

                const title = (<Link component={RouterLink} to={`/songs/${song.songID}`}>{song.title}</Link>);

                const artists = song.artists?.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);

                const length = (song.length ? this.processLength : '');

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
        const { fetching, albums, match } = this.props;
        const { isPending } = fetching;
        const { albumID } = match.params;

        const album = albums.find((album: Album) => (album ? album.albumID == albumID : undefined));
        const reviews = album?.reviews;

        return (
            <>
                <PageHeader title={album?.title} />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Table title={`Utwory w albumie muzycznym`} objects={this.processSongs(album?.songs)} isPending={isPending} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Table title="Recenzje albumu" objects={this.processReviews(reviews)} isPending={isPending} />
                    </Grid>
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
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        albums: state.albums,
    });

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(AlbumPage));
// export default connect(mapStateToProps, null)(AlbumPage);