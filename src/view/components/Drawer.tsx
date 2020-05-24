import React from 'react';
import Divider from '@material-ui/core/Divider';
import DrawerMaterial from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

export const DRAWER_WIDTH = 240;

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

export const Drawer: React.FC<IProps> = (props: IProps) => {
    const { window, mobileOpen, handleDrawerToggle } = props;
    const classes = useStyles();
    const theme = useTheme();

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
                    <DrawerContent />
                </DrawerMaterial>
            </Hidden>
            <Hidden xsDown implementation="css">
                <DrawerMaterial
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open>
                    <DrawerContent />
                </DrawerMaterial>
            </Hidden>
        </nav>
    );
}

const DrawerContent: React.FC = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}