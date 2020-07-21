import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";

import Button from "@material-ui/core/Button";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { history } from "../../store/index";
import Card from "../components/basic/Card";
import DividerGradient from "../components/basic/DividerGradient";
import TextField from "@material-ui/core/TextField";
import Error from "../components/basic/Error";
import CircularProgress from "../components/basic/CircularProgress";

import { signIn } from "../../store/auth";
import Link from "@material-ui/core/Link";
import PageHeader from "../components/basic/PageHeader";
import Grid from "@material-ui/core/Grid/Grid";

import signInImage from "../../images/sign-in.png";



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

    submitForm = () => {
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
            <Grid container justify="center">
                <Grid item xs={12} md={5}>
                    <PageHeader title="Zaloguj się" />
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
                                <Link href="/signup" onClick={() => history.push("/signup")}>Nie masz konta?</Link>
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
                <Grid item xs={undefined} md={4}>
                    <div className={classes.imageWrapper}>
                        <img className={classes.image} src={signInImage} alt="Logowanie" />
                    </div>
                </Grid>
            </Grid>
        );
    }
};

const styles = (theme: Theme) => createStyles({
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
    },
    imageWrapper: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%'
    },
    image: {
        width: '100%',
        height: 'auto'
    },
});

interface LinkStateProps {
    fetching: any,
    auth: any,
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        auth: state.auth
    });

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(SignInPage));