import React from "react";
import { connect } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { AppState } from "../../../store/index";
import Button from '@material-ui/core/Button';
import { DRAWER_WIDTH } from './Drawer';
import Drawer from './Drawer';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Error from "./Error";
import { removeError } from "../../../store/fetching";

interface IProps {
    title: string,
    window?: () => Window,
    children?: any,
    classes: any
}

interface IState {
    mobileOpen: boolean
}

const initialState = {
    mobileOpen: false
}

type Props = IProps & LinkStateProps;

class Page extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    render = () => {
        const { title, window, children, classes, fetching, auth } = this.props;
        const { mobileOpen } = this.state;
        const { errors } = fetching;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title} noWrap>
                            {
                                !mobileOpen ?
                                    title
                                    :
                                    ''
                            }
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    window={window}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={this.handleDrawerToggle} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <div className={classes.content}>
                        {children}
                        <div className={classes.notifications}>
                            {
                                errors?.map((item: any, index: number) => {
                                    return <Error
                                        key={`${item.error}-${item.message}-${index}`}
                                        title={item.error}
                                        message={item.message}
                                        onClick={() => removeError(index)} />
                                })
                            }
                        </div>
                    </div>
                </main>
            </div>
        );
    }
};

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        },
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    backButton: {
        marginRight: theme.spacing(0)
    },
    forwardButton: {
        marginRight: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    content: {
        width: "100%",
        margin: "auto auto",
        flexGrow: 1,
        padding: theme.spacing(3, 1, 3, 1),
        maxWidth: theme.breakpoints.width("lg"),
    },
    notifications: {
        boxSizing: 'border-box',
        position: 'fixed',
        width: '400px',
        maxWidth: '100%',
        maxHeight: '100vh',
        overflow: 'hidden',
        right: 0,
        bottom: 0,
        zIndex: 100,
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
});

interface LinkStateProps {
    fetching?: any,
    auth?: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching,
    auth: state.auth
});

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(Page));