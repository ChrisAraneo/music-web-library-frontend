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

interface IProps {
    match: { params: { artistID: number } },
}

interface IState {

}

type Props = IProps & LinkStateProps;

class AdminPage extends React.Component<Props, IState> {

    componentDidMount() {
    }

    render = () => {
        return (
            <>
                <PageHeader
                    title="Panel administratora" />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card title="">
                            <Link component={RouterLink} to={`/admin/artists`}>Wykonawcy</Link>
                            <Link component={RouterLink} to={`/admin/songs`}>Utwory muzyczne</Link>
                        </Card>
                    </Grid>
                </Grid>
            </>
        );
    }
};

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

export default connect(mapStateToProps, null)(AdminPage);