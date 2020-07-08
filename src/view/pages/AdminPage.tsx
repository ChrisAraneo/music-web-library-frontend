import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";


import Album from "../../model/Album";

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
                <h1>Panel admina</h1>
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