import React from "react";
import { connect } from "react-redux";
import { AppState, history } from "../../store/index";

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PageHeader from "../components/PageHeader";
import Review from "../../model/Review";
import { Theme, withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import { getReview } from "../../store/reviews";
import DividerGradient from "../components/DividerGradient";
import { Paper, TextField, Button } from "@material-ui/core";
import Card from "../components/Card";
import Album from "../../model/Album";
import CircularProgress from "../components/CircularProgress";
import Error from "../components/Error";

import Recaptcha from 'react-grecaptcha';


interface IState {
    title: string,
    content: string,
    captcha: string
}

interface IProps {
    match: { params: { albumID: number } },
    classes: any
}

type Props = IProps & LinkStateProps;

class WriteReviewPage extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            captcha: ""
        }
    }

    componentDidMount = () => {

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

    handleChangeCaptcha = (event: any) => {
        if (event && event.target) {
            this.setState({ captcha: event.target.value });
        }
    }

    submitForm = (event: any) => {
        const { title, content } = this.state;
        const { albumID } = this.props?.match?.params;
        const obj = {
            title,
            content,
            albumID
        };

        alert("TODO SUBMIT REVIEW");
        console.log("SUBMIT OBJ", obj);
    }

    render = () => {
        const { classes } = this.props;

        const { fetching, albums, match, auth } = this.props;
        const { hasError, error, isPending } = fetching;
        const { albumID } = match.params;

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
                            title="Recenzja albumu"
                            aboveTitle={album ? `Napisz recenzję albumu ${albumLink}` : undefined}
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
                                    label="Hasło"
                                    required
                                    onChange={this.handleChangeContent}
                                    value={this.state.content} />
                            </form>
                            <DividerGradient />
                            <Recaptcha
                                sitekey={"6Le7RLIZAAAAAP9lMTRLru4L-IZpJhNoOtpyTIBO"}
                                callback={() => alert("CALLBACK")}
                                expiredCallback={() => alert("EXPIRED_CALLBACK")}
                                locale="pl-PL"
                                className="customClassName"

                                // Other props will be passed into the component.
                                data-theme="dark"
                            />
                            <DividerGradient />
                            <div className={classes.buttonContainer}>
                                <Typography className={classes.signIn}>
                                    <Link href={`albums/${albumID}`} onClick={() => history.push(`albums/${albumID}`)}>Powrót do albumu</Link>
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
                                        disabled={isPending}>
                                        Zaloguj się
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
    auth: any
}
const mapStateToProps =
    (state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        albums: state.albums,
        auth: state.auth
    });

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(WriteReviewPage));