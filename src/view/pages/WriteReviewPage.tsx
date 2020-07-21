import React from "react";
import { connect } from "react-redux";
import { AppState, history } from "../../store/index";

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PageHeader from "../components/basic/PageHeader";
import Review from "../../model/Review";
import { Theme, withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import { getReview, postReview, updateReview } from "../../store/reviews";
import DividerGradient from "../components/basic/DividerGradient";
import { Paper, TextField, Button } from "@material-ui/core";
import Card from "../components/basic/Card";
import Album from "../../model/Album";
import CircularProgress from "../components/basic/CircularProgress";
import Error from "../components/basic/Error";

import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { RECAPTCHA_SITE_KEY } from "../../keys";


interface IState {
    title: string,
    content: string,
    captcha: string,
    isVerified: boolean
}

interface IProps {
    match: { params: { albumID: number | undefined, reviewID: number | undefined } },
    classes: any
}

type Props = IProps & LinkStateProps;

class WriteReviewPage extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            captcha: "",
            isVerified: false
        }
    }

    componentDidMount = () => {
        const { albumID, reviewID } = this.props?.match?.params;
        if (reviewID && albumID) {
            getReview(reviewID);
        }
    }

    componentDidUpdate = () => {
        const { reviews, match } = this.props;
        const { albumID, reviewID } = match?.params;
        const review = reviews?.find((review: Review) => review?.reviewID == reviewID);

        if (review) {
            const { title, content } = this.state;
            if (!title && !content) {
                const reviewTitle = review?.title;
                const reviewContent = review?.content;
                if (reviewTitle && reviewContent) {
                    this.setState({
                        title: reviewTitle,
                        content: reviewContent
                    });
                }
            }
        }
    }

    handleVerifyCaptcha = (captcha: string) => {
        this.setState({
            captcha,
            isVerified: true
        });
    }

    handleChangeTitle = (event: any) => {
        if (event && event.target) {
            this.setState({ title: event.target.value });
        }
    }

    handleChangeContent = (event: any) => {
        if (event && event.target) {
            this.setState({ content: event.target.value });
        }
    }

    submitForm = async (event: any) => {
        const { title, content, captcha, isVerified } = this.state;
        const { albumID, reviewID } = this.props?.match?.params;
        if (isVerified) {
            if (albumID && !reviewID) {
                postReview(albumID, title, content, captcha, () => history.push(`/albums/${albumID}`));
            } else if (albumID && reviewID) {
                const { reviews } = this.props;
                const review = reviews?.find((review: Review) => review?.reviewID == reviewID);
                if (review) {
                    const updated: Review = {
                        reviewID: review?.reviewID,
                        title,
                        content,
                        album: review?.album,
                        user: review?.user
                    }
                    updateReview(updated, captcha,
                        () => history.push(`/reviews/${reviewID}`));
                }
            }
        } else {
            alert("Test captcha nie został spełniony!");
        }
    }

    render = () => {
        const { classes } = this.props;

        const { fetching, albums, match, auth } = this.props;
        const { hasError, error, isPending } = fetching;
        const { albumID } = match.params;

        const { isVerified } = this.state;

        const { token } = auth;
        const album = albums.find((album: Album) => album?.albumID == albumID);
        const albumLink = album ? (<Link component={RouterLink} to={`/albums/${album?.albumID}`}>{album?.title}</Link>) : null;

        if (!token) {
            return (<Error title="Musisz być zalogowany, aby napisać recenzję." error={error} />)
        } else {
            return (
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <PageHeader
                            title="Twoja recenzja"
                            aboveTitle={albumLink ?
                                (<><span className={classes.spanWithMargin}>Recenzja albumu</span> {albumLink}</>) : null}
                        />
                        <Card title="Pisanie nowej recenzji albumu">
                            <form className={classes.form} noValidate autoComplete="off">
                                {hasError ? (<Error title="Wystąpił błąd" error={error} />) : null}
                                <TextField
                                    fullWidth={true}
                                    label="Tytuł recenzji"
                                    required
                                    onChange={this.handleChangeTitle}
                                    value={this.state.title} />
                                <TextField
                                    fullWidth={true}
                                    label="Treść"
                                    required
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    onChange={this.handleChangeContent}
                                    value={this.state.content} />
                            </form>
                            <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
                                <GoogleReCaptcha onVerify={this.handleVerifyCaptcha} />
                            </GoogleReCaptchaProvider>
                            <script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`} async
                                defer></script>
                            <DividerGradient />
                            <div className={classes.buttonContainer}>
                                <Typography className={classes.signIn}>
                                    <Link component={RouterLink} to={`/albums/${album?.albumID}`}>Wróć do albumu</Link>
                                </Typography>
                                <div className={classes.rightContainer}>
                                    <CircularProgress enabled={isPending} />
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        size="large"
                                        onClick={this.submitForm}
                                        disabled={isPending && isVerified}>
                                        Wyślij
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            );
        }

    }
};

const styles = (theme: Theme) => createStyles({
    spanWithMargin: {
        marginRight: theme.spacing(1)
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    form: {
        boxSizing: 'border-box',
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
        '& .MuiInputBase-root': {
            marginBottom: theme.spacing(3)
        }
    },
    buttonContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    signIn: {
        margin: theme.spacing(2, 2, 2, 2),
    },
    button: {
        margin: theme.spacing(2, 2, 2, 2),
    },
    alertButton: {
        marginRight: theme.spacing(1),
    },
    paragraph: {
        margin: theme.spacing(6, 0, 6, 0)
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    imageWrapper: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%'
    },
    image: {

    }
});

interface LinkStateProps {
    fetching: any,
    albums: Album[],
    reviews: Review[],
    auth: any
}
const mapStateToProps =
    (state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        albums: state.albums,
        reviews: state.reviews,
        auth: state.auth
    });

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(WriteReviewPage));