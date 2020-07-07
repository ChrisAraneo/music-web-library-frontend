import React from "react";
import { Provider, connect } from "react-redux";
import { store, AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { getArtistsList, getArtist } from "../../store/artists";

import Page from '../components/Page';
import Button from "@material-ui/core/Button";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Title from "../components/Title";
import Typography from "@material-ui/core/Typography";

import { history } from "../../store/index";
import Card from "../components/Card";
import DividerGradient from "../components/DividerGradient";
import TextField from "@material-ui/core/TextField";
import Error from "../components/Error";
import CircularProgress from "../components/CircularProgress";

import { signUpInit, signUp } from "../../store/auth";
import Success from "../components/Success";
import Link from "@material-ui/core/Link";


interface IProps {
    classes: any
}

interface IState {
    name: string,
    username: string,
    email: string,
    password1: string,
    password2: string
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
            password2: ""
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

    submitForm = (event: any) => {
        const { name, username, email, password1 } = this.state;
        signUp(name, username, email, password1);
        this.setState({ name: "", username: "", email: "", password1: "", password2: "" });
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
                                    disabled={isPending}>
                                    Utwórz konto
                                </Button>
                            </div>

                        </div>
                    </Card>
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
        maxWidth: theme.breakpoints.width("sm"),
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