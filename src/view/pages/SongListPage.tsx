import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Page from '../components/Page';
import Table from "../components/Table";
import Error from "../components/Error";
import { getSongsList } from "../../store/songs";
import Song from "../../model/Song";

interface IProps {

}

interface IState {

}

type Props = IProps & LinkStateProps;

class SongListPage extends React.Component<Props, IState> {

    componentDidMount() {
        getSongsList();
    }

    processArtistsArray = (artists: Artist[]) => {
        artists.sort((a: Artist, b: Artist) => {
            if (a.artistName < b.artistName) { return -1; }
            if (a.artistName > b.artistName) { return 1; }
            return 0;
        });
        return artists.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);
    }

    processData = (songs: Array<Song>) => {
        const data: any[] = [];
        songs.forEach((song) => {
            if (song) {
                const title = (<Link component={RouterLink} to={`/songs/${song.songID}`}>{song.title}</Link>);
                const artists = (<div>{song.artists ? this.processArtistsArray(song.artists) : null}</div>);
                data.push({
                    "Nazwa utworu": title,
                    "Wykonawcy": artists
                });
            }
        });
        return data;
    }

    render = () => {
        const { isPending, hasError, error } = this.props.fetching;
        const { songs } = this.props;

        const data = this.processData(songs);

        return (
            <>
                {
                    hasError ?
                        (<Error title="Błąd pobierania danych" error={error} />)
                        :
                        null
                }
                <Table title="Utwory muzyczne" data={data} isPending={isPending} />
            </>
        );
    }
};

interface LinkStateProps {
    fetching: any,
    songs: Song[]
}
const mapStateToProps = (
    state: AppState,
    ownProps: IProps
): LinkStateProps => ({
    fetching: state.fetching,
    songs: state.songs
});

export default connect(mapStateToProps, null)(SongListPage);