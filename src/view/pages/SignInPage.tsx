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

import { signIn } from "../../store/auth";
import Success from "../components/Success";
import Link from "@material-ui/core/Link";


interface IProps {
    classes: any
}

interface IState {
    usernameOrEmail: string,
    password: string
}

type Props = IProps & LinkStateProps;

class SignInPage extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);

        this.state = {
            usernameOrEmail: "",
            password: ""
        }
    }

    componentDidMount = () => {

    }

    handleChangeUsernameOrEmail = (event: any) => {
        if (event && event.target) {
            this.setState({ usernameOrEmail: event.target.value });
        }
    }

    handleChangePassword = (event: any) => {
        if (event && event.target) {
            this.setState({ password: event.target.value });
        }
    }

    submitForm = (event: any) => {
        const { usernameOrEmail, password } = this.state;
        signIn(usernameOrEmail, password,
            () => history.push("/")
        );
    }

    render = () => {
        const { fetching } = this.props;
        const { isPending, hasError, error } = fetching;
        const { classes } = this.props;

        return (
            <div className={classes.wrapper}>
                <Card title="Logowanie">
                    <form className={classes.form} noValidate autoComplete="off">
                        {
                            hasError ?
                                (<Error title="Wystąpił błąd" error={error} />)
                                :
                                null
                        }
                        <TextField
                            fullWidth={true}
                            label="Login lub e-mail"
                            required
                            onChange={this.handleChangeUsernameOrEmail}
                            value={this.state.usernameOrEmail} />
                        <TextField
                            fullWidth={true}
                            label="Hasło"
                            required
                            onChange={this.handleChangePassword}
                            value={this.state.password} />
                    </form>
                    <DividerGradient />
                    <div className={classes.buttonContainer}>
                        <Typography className={classes.signIn}>
                            <Link href="/signin" onClick={() => history.push("/signin")}>Nie masz konta?</Link>
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
            </div>
        );
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

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(SignInPage));