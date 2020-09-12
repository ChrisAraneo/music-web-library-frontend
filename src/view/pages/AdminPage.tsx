import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Album from "../../model/Album";
import PageHeader from "../components/basic/PageHeader";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "../components/basic/Card";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { history } from "../../store/index";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";

interface IProps {
    match: { params: { artistID: number } },
    classes: any
}

interface IState {

}

type Props = IProps & LinkStateProps;

class AdminPage extends React.Component<Props, IState> {

    componentDidMount() {
    }

    render = () => {
        const { classes } = this.props;
        return (
            <>
                <PageHeader
                    title="Panel administratora" />
                <Grid container spacing={0}>
                    <Grid item xs={12} md={8}>
                        <Card title="">
                            <div className={classes.card}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <Button className={classes.button} variant="contained" color="primary" disableElevation fullWidth onClick={() => history.push("/admin/artists")}>Wykonawcy</Button>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Button className={classes.button} variant="contained" color="primary" disableElevation fullWidth onClick={() => history.push("/admin/songs")}>Utwory muzyczne</Button>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Button className={classes.button} variant="contained" color="primary" disableElevation fullWidth onClick={() => history.push("/admin/albums")}>Albumy muzyczne</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </>
        );
    }
};

const styles = (theme: Theme) => createStyles({
    button: {
        margin: theme.spacing(0, 2, 0, 0)
    },
    card: {
        padding: theme.spacing(2)
    }
});

interface LinkStateProps {
    fetching: any,
    artists: Artist[],
    albums: Album[],
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        artists: state.artists,
        albums: state.albums,
    });

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(AdminPage));