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
import { getAlbumsList } from "../../store/albums";
import Album from "../../model/Album";

interface IProps {

}

interface IState {

}

type Props = IProps & LinkStateProps;

class AlbumListPage extends React.Component<Props, IState> {

    componentDidMount() {
        getAlbumsList();
    }

    processSongsArray = (songs: Song[]) => {
        const artists: Artist[] = [];
        songs.forEach((song: Song) => {
            if (song.artists instanceof Array) {
                song.artists.forEach((artist: Artist) => {
                    const ID = artist.artistID;
                    if (!artists.find((item: Artist) => item.artistID == ID)) {
                        artists.push(artist);
                    }
                });
            }
        })

        artists.sort((a: Artist, b: Artist) => {
            if (a.artistName < b.artistName) { return -1; }
            if (a.artistName > b.artistName) { return 1; }
            return 0;
        });

        return artists.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);
    }

    processData = (albums: Array<Album>) => {
        const data: any[] = [];
        albums.forEach((album) => {
            if (album) {
                const title = (<Link component={RouterLink} to={`/albums/${album.albumID}`}>{album.title}</Link>);
                const artists = (<div>{album.songs ? this.processSongsArray(album.songs) : null}</div>);
                const year = album.year;
                data.push({
                    "Tytuł albumu": title,
                    "Wykonawcy": artists,
                    "Rok": year
                });
            }
        });
        return data;
    }

    render = () => {
        const { isPending, hasError, error } = this.props.fetching;
        const { albums } = this.props;

        const data = this.processData(albums);

        return (
            <>
                {
                    hasError ?
                        (<Error title="Błąd pobierania danych" error={error} />)
                        :
                        null
                }
                <Table title="Albumy muzyczne" data={data} isPending={isPending} />
            </>
        );
    }
};

interface LinkStateProps {
    fetching: any,
    albums: Album[]
}
const mapStateToProps = (
    state: AppState,
    ownProps: IProps
): LinkStateProps => ({
    fetching: state.fetching,
    albums: state.albums
});

export default connect(mapStateToProps, null)(AlbumListPage); 