import React from "react";
import { connect } from "react-redux";

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PageHeader from "../components/basic/PageHeader";
import Review from "../../model/Review";
import { Theme, withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import { getReview, deleteReview } from "../../store/reviews";
import DividerGradient from "../components/basic/DividerGradient";
import { CircularProgress, Paper, Button } from "@material-ui/core";
import { history, AppState } from "../../store/index";

import ReviewIcon from '@material-ui/icons/RateReview';

import Card from "../components/basic/Card";
import Album from "../../model/Album";


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

    handleDeleteReview = (reviewID: number, album: Album | undefined) => {
        if (album) {
            deleteReview(reviewID, () => history.push(`/albums/${album?.albumID}`));
        } else {
            deleteReview(reviewID, () => history.push(`/`));
        }
    }

    render = () => {
        const { classes } = this.props;

        const { fetching, reviews, match, auth } = this.props;
        const { reviewID } = match.params;

        const review = reviews.find((review: Review) => (review ? review.reviewID == reviewID : undefined));

        const title = review ? review.title : "Brak tytułu";

        const album = review ? (review.album ? review.album : undefined) : undefined;
        const albumLink = album ? (<Link component={RouterLink} to={`/albums/${album?.albumID}`}>{album?.title}</Link>) : null;
        const albumID = album?.albumID;

        const content = review ? review.content : undefined;
        const user = review ? review.user : undefined;

        const isItYours = user ? (user?.userID == auth?.user?.userID) : false;

        return (
            <>
                <Grid container spacing={isItYours ? 3 : 0} justify="center">
                    <Grid item xs={12} md={8}>
                        <PageHeader
                            title={title}
                            aboveTitle={albumLink ?
                                (<><span className={classes.spanWithMargin}>Recenzja albumu</span> {albumLink}</>) : null}
                        />
                        <Paper elevation={2}>
                            <div className={classes.contentWrapper}>
                                {
                                    user ?
                                        (<Typography variant="body2" gutterBottom className={classes.written}>
                                            {user?.name} napisał/a:
                                        </Typography>)
                                        :
                                        null
                                }
                                {
                                    content ?
                                        (<Typography variant="body1" gutterBottom>
                                            {content}
                                        </Typography>)
                                        :
                                        (<CircularProgress />)
                                }
                            </div>
                            <DividerGradient />
                            <div className={classes.footer}>
                                {
                                    album ?
                                        (<Link component={RouterLink} to={`/albums/${album?.albumID}`}>Wróć do albumu</Link>)
                                        :
                                        null
                                }
                            </div>
                        </Paper>
                    </Grid>
                    {
                        isItYours ?
                            (<Grid item xs={12} md={8}>
                                <Card title="Edytuj swoją recenzję">
                                    <div className={classes.contentWrapper}>
                                        <Typography variant="body2" gutterBottom className={classes.written}>
                                            Powyższa recenzja jest napisana przez ciebie.
                                        </Typography>
                                        <Button
                                            className={classes.buttonMR}
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ReviewIcon />}
                                            onClick={() => history.push(`/writereview/${albumID}/${reviewID}`)}>
                                            Edytuj recenzję
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ReviewIcon />}
                                            onClick={() => this.handleDeleteReview(reviewID, album)}>
                                            Usuń recenzję
                                        </Button>
                                    </div>
                                </Card>
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
    buttonMR: {
        margin: theme.spacing(0, 2, 0, 0)
    },
    spanWithMargin: {
        margin: theme.spacing(0, 1, 0, 0)
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
});

interface LinkStateProps {
    fetching: any,
    reviews: Review[],
    auth: any
}
const mapStateToProps =
    (state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        reviews: state.reviews,
        auth: state.auth
    });

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(ReviewPage));