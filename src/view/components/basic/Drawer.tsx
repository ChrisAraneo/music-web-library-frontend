import React from 'react';
import Divider from '@material-ui/core/Divider';
import DrawerMaterial from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { history, AppState } from "../../../store/index";
import { connect } from 'react-redux';
import { ROLE_ADMIN } from '../../../model/Role';
import { signOut } from "../../../store/auth";

export const DRAWER_WIDTH = 255;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: DRAWER_WIDTH,
                flexShrink: 0,
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: DRAWER_WIDTH,
        },
    }),
);


interface IProps {
    window?: () => Window;
    mobileOpen: boolean,
    handleDrawerToggle: () => void
}

type Props = IProps & LinkStateProps;

const Drawer: React.FC<Props> = (props: Props) => {
    const { window, mobileOpen, handleDrawerToggle, auth } = props;
    const { usernameOrEmail, token, roles } = auth;
    const classes = useStyles();
    const theme = useTheme();

    const isLogged = (usernameOrEmail || token ? true : false);
    const isAdmin = ((roles: Array<any>) => {
        for (let i = 0; i < roles.length; ++i) {
            const role = roles[i];
            if (role && role.name) {
                if (role.name === ROLE_ADMIN) {
                    return true;
                }
            }
        }
        return false;
    })(roles);

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <DrawerMaterial
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}>
                    <DrawerContent isLogged={isLogged} isAdmin={isAdmin} />
                </DrawerMaterial>
            </Hidden>
            <Hidden xsDown implementation="css">
                <DrawerMaterial
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open>
                    <DrawerContent isLogged={isLogged} isAdmin={isAdmin} />
                </DrawerMaterial>
            </Hidden>
        </nav>
    );
}



interface IPropsContent {
    isLogged: boolean,
    isAdmin: boolean
}

const DrawerContent: React.FC<IPropsContent> = (props: IPropsContent) => {
    const { isLogged, isAdmin } = props;
    const classes = useStyles();

    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button onClick={() => history.push("/")}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary="Strona główna" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => history.push("/artists")}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary="Wykonawcy" />
                </ListItem>
                <ListItem button onClick={() => history.push("/albums")}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary="Albumy" />
                </ListItem>
                <ListItem button onClick={() => history.push("/songs")}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary="Utwory" />
                </ListItem>

            </List>
            <Divider />
            {
                isAdmin ?
                    <>
                        <List>
                            <ListItem button onClick={() => history.push("/admin")}>
                                <ListItemIcon><InboxIcon /></ListItemIcon>
                                <ListItemText primary="Panel administratora" />
                            </ListItem>
                        </List>
                        <Divider />
                    </>
                    :
                    null
            }
            <List>
                {
                    isLogged ?
                        (
                            <>
                                <ListItem button onClick={() => history.push("/playlists")}>
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText primary="Twoje listy utworów" />
                                </ListItem>
                                <ListItem button onClick={() => { signOut(); history.push("/"); }}>
                                    <ListItemIcon><InboxIcon /></ListItemIcon>
                                    <ListItemText primary="Wyloguj się" />
                                </ListItem>
                            </>
                        )
                        :
                        (<ListItem button onClick={() => history.push("/signin")}>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary="Zaloguj się" />
                        </ListItem>)
                }

            </List>
        </div>
    );
}


interface LinkStateProps {
    auth?: any
}
const mapStateToProps = (
    state: AppState,
    ownProps: IProps
): LinkStateProps => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Drawer);