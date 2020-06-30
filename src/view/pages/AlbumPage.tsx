import React from "react";
import { Provider, connect } from "react-redux";
import { store, AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { getArtistsList, getArtist } from "../../store/artists";

import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Page from '../components/Page';
import Card from "../components/Card";
import Error from "../components/Error";
import Title from "../components/Title";
import Paper from "@material-ui/core/Paper";
import Table from "../components/Table";
import TableDetails from "../components/TableDetails";
import Grid from "@material-ui/core/Grid";
import Album from "../../model/Album";
import Song, { SongInAlbum } from "../../model/Song";
import { getAlbumsList, getAlbum } from "../../store/albums";

interface IProps {
    match: { params: { albumID: number } },
}

interface IState {

}

type Props = IProps & LinkStateProps;

class AlbumPage extends React.Component<Props, IState> {

    componentDidMount() {
        const { albumID } = this.props.match.params;
        getAlbum(albumID);
    }

    processAlbum = (album: Album | undefined) => {
        if (album) {
            return {
                "Tytuł albumu": album.title,
                "Rok": album.year
            }
        }
        return undefined;
    }

    processLength = (length: number) => {
        const minutes = Math.floor(length / 60);
        const seconds = length - (minutes * 60);
        if (seconds >= 10) {
            return `${minutes}:${seconds}`;
        } else {
            return `${minutes}:0${seconds}`;
        }
    }

    processSongs = (songs: Array<SongInAlbum> | undefined,) => {
        const data: any[] = [];

        songs?.forEach((item: SongInAlbum) => {
            const { id, song } = item;
            if (song) {
                const track = id.trackNumber;

                const title = (<Link component={RouterLink} to={`/songs/${song.songID}`}>{song.title}</Link>);

                const artists = song.artists?.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);

                const length = (song.length ? this.processLength : '');

                data.push({
                    "#": track,
                    "Tytuł": title,
                    "Wykonawcy": artists,
                    "Czas": length
                });
            }
        });

        data.sort((A, B) => A['#'] - B['#']);
        console.log("PROCESSED", data);
        return data;
    }

    render = () => {
        const { fetching, albums, match } = this.props;
        const { isPending, hasError, error } = fetching;
        const { albumID } = match.params;

        const album = albums.find((album: Album) => (album ? album.albumID == albumID : undefined));
        // let songs = [];
        // if (album && album.songs) {
        //     songs = album.songs;
        // }
        // const albums = this.processAlbums(artist, this.props.albums);

        return (
            <>
                {/* <Title title={album?.title} /> */}
                <div>
                    <Table title={`${album?.title}`} data={this.processSongs(album?.songs)} isPending={isPending} />
                    {/* <TableDetails object={this.processAlbum(album)} /> */}
                </div>

            </>
        );

        // return {
        //     "Nazwa wykonawcy": artist.artistName,
        //     "Data urodzenia": artist.birthDate,
        //     "Kraj": artist.country,
        //     "Imię": artist.firstName,
        //     "Nazwisko": artist.lastName,
        //     "Rodzaj działalności muzycznej": artist.artistType,
        // };
    }
};

interface LinkStateProps {
    fetching: any,
    albums: Album[],
}
const mapStateToProps = (
    state: AppState,
    ownProps: IProps
): LinkStateProps => ({
    fetching: state.fetching,
    albums: state.albums,
});

export default connect(mapStateToProps, null)(AlbumPage);