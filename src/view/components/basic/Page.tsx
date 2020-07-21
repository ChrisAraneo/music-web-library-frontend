import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { history, AppState } from "../../../store/index";
import Button from '@material-ui/core/Button';

import { DRAWER_WIDTH } from './Drawer';
import Drawer from './Drawer';

interface IProps {
    title: string,
    window?: () => Window,
    children?: any
}

export const Page: React.FC<IProps> = (props: IProps) => {
    const { title, window, children } = props;
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
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
                handleDrawerToggle={handleDrawerToggle} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}

export default Page;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }),
);