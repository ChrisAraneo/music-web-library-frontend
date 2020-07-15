import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PageHeader from "../components/PageHeader";
import Review from "../../model/Review";
import { Theme, withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import { getReview } from "../../store/reviews";
import DividerGradient from "../components/DividerGradient";
import { CircularProgress, Paper } from "@material-ui/core";


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

    render = () => {
        const { classes } = this.props;

        const { fetching, reviews, match, auth } = this.props;
        const { reviewID } = match.params;

        const review = reviews.find((review: Review) => (review ? review.reviewID == reviewID : undefined));

        const title = review ? review.title : "Brak tytułu";

        const album = review ? (review.album ? review.album : undefined) : undefined;
        const albumLink = album ? (<Link component={RouterLink} to={`/albums/${album?.albumID}`}>{album?.title}</Link>) : null;

        const content = review ? review.content : undefined;
        const user = review ? review.user : undefined;


        return (
            <>
                <Grid container spacing={0} justify="center">
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
                </Grid>
            </>
        );

    }
};

const styles = (theme: Theme) => createStyles({
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