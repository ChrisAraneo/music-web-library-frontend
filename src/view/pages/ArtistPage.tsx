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
import Song from "../../model/Song";
import { getAlbumsList } from "../../store/albums";

interface IProps {
    match: { params: { artistID: number } },
}

interface IState {

}

type Props = IProps & LinkStateProps;

class ArtistListPage extends React.Component<Props, IState> {

    componentDidMount() {
        getAlbumsList();

        const { artistID } = this.props.match.params;
        getArtist(artistID);
    }

    processArtist = (artist: Artist | undefined) => {
        if (artist) {
            return {
                "Nazwa/pseudonim": artist.artistName,
                "Imię": artist.firstName,
                "Nazwisko": artist.lastName,
                "Kraj": artist.country,
                "Dzień urodzin/założenia": artist.birthDate,
                "Rodzaj działalności muzycznej": artist.artistType?.name
            }
        }
        return undefined;
    }

    processAlbums = (artist: Artist | undefined, albums: Array<Album>) => {
        const ID = artist?.artistID;
        if (ID) {
            const selected: any[] = [];
            albums.forEach((album: Album) => {
                let added = false;
                if (!added && album && album.songs) {
                    const { songs } = album;
                    songs.forEach(song => {
                        if (!added && song && song.artists) {
                            const { artists } = song;
                            if (artists) {
                                selected.push({
                                    "Tytuł albumu": (<Link component={RouterLink} to={`/albums/${album.albumID}`}>{album.title}</Link>)
                                });
                                added = true;
                            }
                        }
                    });
                }
            });
            return selected;
        }
        return [];
    }

    render = () => {
        const { isPending, hasError, error } = this.props.fetching;
        const { artists } = this.props;
        const { artistID } = this.props.match.params;

        const artist = artists.find((artist: Artist) => (artist ? artist.artistID == artistID : undefined));

        const albums = this.processAlbums(artist, this.props.albums);

        return (
            <>
                <Title title={artist?.artistName} />
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Table title="Albumy" data={albums} isPending={isPending} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TableDetails object={this.processArtist(artist)} />
                        </Grid>
                    </Grid>
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
    artists: Artist[],
    albums: Album[],
}
const mapStateToProps = (
    state: AppState,
    ownProps: IProps
): LinkStateProps => ({
    fetching: state.fetching,
    artists: state.artists,
    albums: state.albums,
});

export default connect(mapStateToProps, null)(ArtistListPage);