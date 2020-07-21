import React from "react";
import { Provider, connect } from "react-redux";
import { store, AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { getArtistsList, getArtist } from "../../store/artists";

import Page from '../components/basic/Page';
import Button from "@material-ui/core/Button";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { history } from "../../store/index";
import Card from "../components/basic/Card";
import DividerGradient from "../components/basic/DividerGradient";
import TextField from "@material-ui/core/TextField";
import Error from "../components/basic/Error";
import CircularProgress from "../components/basic/CircularProgress";

import { signUpInit, signUp } from "../../store/auth";
import Success from "../components/basic/Success";
import Link from "@material-ui/core/Link";
import PageHeader from "../components/basic/PageHeader";
import Grid from "@material-ui/core/Grid/Grid";

import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { RECAPTCHA_SITE_KEY } from "../../keys";

import signUpImage from '../../images/sign-up.png';

interface IProps {
    classes: any
}

interface IState {
    name: string,
    username: string,
    email: string,
    password1: string,
    password2: string,
    captcha: string,
    isVerified: boolean
}

type Props = IProps & LinkStateProps;

class SignUpPage extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);

        this.state = {
            name: "",
            username: "",
            email: "",
            password1: "",
            password2: "",
            captcha: "",
            isVerified: false
        }
    }

    componentDidMount = () => {
        signUpInit();
    }

    handleChangeUsername = (event: any) => {
        if (event && event.target) {
            this.setState({ username: event.target.value });
        }
    }

    handleChangeName = (event: any) => {
        if (event && event.target) {
            this.setState({ name: event.target.value });
        }
    }

    handleChangeEmail = (event: any) => {
        if (event && event.target) {
            this.setState({ email: event.target.value });
        }
    }

    handleChangePassword1 = (event: any) => {
        if (event && event.target) {
            this.setState({ password1: event.target.value });
        }
    }

    handleChangePassword2 = (event: any) => {
        if (event && event.target) {
            this.setState({ password2: event.target.value });
        }
    }

    handleVerifyCaptcha = (captcha: string) => {
        this.setState({
            captcha,
            isVerified: true
        });
    }

    submitForm = (event: any) => {
        const { name, username, email, password1, captcha, isVerified } = this.state;
        if (isVerified) {
            signUp(name, username, email, password1, captcha);
            this.setState({ name: "", username: "", email: "", password1: "", password2: "" });
        } else {
            alert("Test captcha nie został spełniony!");
        }
    }

    render = () => {
        const { fetching, auth } = this.props;
        const { isPending, hasError, error } = fetching;
        const { signUp } = auth;
        const { classes } = this.props;

        if (signUp.success) {
            return (
                <div className={classes.wrapper}>
                    <div className={classes.form}>
                        <Success title="Pomyślnie utworzono konto" message="">
                            <Button
                                className={classes.alertButton}
                                variant="contained"
                                color="primary"
                                disableElevation
                                size="medium"
                                onClick={() => history.push("/signin")}
                                disabled={isPending}>
                                Zaloguj się
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                disableElevation
                                size="medium"
                                onClick={() => history.push("/")}
                                disabled={isPending}>
                                Wróć na stronę główną
                            </Button>
                        </Success>
                    </div>
                </div >
            );
        } else {
            return (
                <div className={classes.wrapper}>
                    <Grid container justify="center">
                        <Grid item xs={12} md={5}>
                            <PageHeader title="Zakładanie konta" />
                            <Card title="Tworzenie nowego konta">
                                <form className={classes.form} noValidate autoComplete="off">
                                    {
                                        hasError ?
                                            (<Error title="Wystąpił błąd" error={error} />)
                                            :
                                            null
                                    }
                                    <TextField
                                        fullWidth={true}
                                        label="Login"
                                        required
                                        onChange={this.handleChangeUsername}
                                        value={this.state.username} />
                                    <TextField
                                        fullWidth={true}
                                        label="Wyświetlana nazwa"
                                        required
                                        onChange={this.handleChangeName}
                                        value={this.state.name} />
                                    <TextField
                                        fullWidth={true}
                                        label="E-mail"
                                        required
                                        onChange={this.handleChangeEmail}
                                        value={this.state.email} />
                                    <TextField
                                        fullWidth={true}
                                        label="Hasło"
                                        required
                                        onChange={this.handleChangePassword1}
                                        value={this.state.password1} />
                                    <TextField
                                        fullWidth={true}
                                        label="Powtórz hasło"
                                        required
                                        onChange={this.handleChangePassword2}
                                        value={this.state.password2} />
                                </form>
                                <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
                                    <GoogleReCaptcha onVerify={this.handleVerifyCaptcha} />
                                </GoogleReCaptchaProvider>
                                <script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`} async
                                    defer></script>
                                <DividerGradient />
                                <div className={classes.buttonContainer}>
                                    <Typography className={classes.signIn}>
                                        Masz już konto?{` `}
                                        <Link href="/signin" onClick={() => history.push("/signin")}>Zaloguj się</Link>
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
                                            disabled={isPending && this.state.isVerified}>
                                            Utwórz konto
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={undefined} md={4}>
                            <div className={classes.imageWrapper}>
                                <img className={classes.image} src={signUpImage} alt="Zakładanie konta" />
                            </div>
                        </Grid>
                    </Grid>
                </div>
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
    auth: any,
}
const mapStateToProps = (
    state: AppState,
    ownProps: IProps
): LinkStateProps => ({
    fetching: state.fetching,
    auth: state.auth
});

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(SignUpPage));