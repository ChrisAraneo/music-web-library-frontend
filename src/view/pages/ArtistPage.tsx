import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { getArtist, deleteArtistURL } from "../../store/artists";

import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Table from "../components/basic/Table";
import TableDetails from "../components/basic/TableDetails";
import Grid from "@material-ui/core/Grid";
import Album from "../../model/Album";
import PageHeader from "../components/basic/PageHeader";
import TableList from "../components/basic/TableList";
import AddArtist from "../components/sections/CreateArtist";

import ArtistURL from "../../model/ArtistURL";
import Role, { ROLE_ADMIN } from "../../model/Role";
import ArtistType from "../../model/ArtistType";
import BackspaceIcon from '@material-ui/icons/Backspace';


interface IProps {
    match: { params: { artistID: number } },
}

interface IState {

}

type Props = IProps & LinkStateProps;

class ArtistPage extends React.Component<Props, IState> {

    componentDidMount() {
        const { artistID } = this.props.match.params;
        getArtist(artistID);
    }

    processArtist = (artist: Artist | undefined): object => {
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
        return ({});
    }

    processAlbums = (artist: Artist | undefined): object[] => {
        if (artist && artist.albums) {
            const { albums } = artist;
            return albums.map((album: Album) => ({
                "Tytuł albumu": (<Link component={RouterLink} to={`/albums/${album.albumID}`}>{album.title}</Link>)
            }));
        }
        return [];
    }

    processURLs = (artistURLs: ArtistURL[] | undefined, isAdmin: boolean) => {
        return artistURLs?.map((url: ArtistURL, index: number, array: Array<any>) => (<><a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary" href={`${url.url}`} target="_blank">{url.url}</a>{isAdmin ? <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary" href="#" onClick={() => deleteArtistURL(url.artistUrlID)}><BackspaceIcon style={{ marginLeft: '1rem' }} fontSize="small" color="primary" /></a> : null}</>));
    }

    render = () => {
        const { fetching, auth, artists, artistTypes, match } = this.props;
        const { isPending } = fetching;
        const { artistID } = match?.params;
        const { roles } = auth;

        const artist = artists.find((artist: Artist) => (artist ? artist.artistID == artistID : undefined));
        const albums = this.processAlbums(artist);
        const isAdmin = (roles?.find((role: Role) => role?.name == ROLE_ADMIN) ? true : false);

        return (
            <>
                <PageHeader
                    title={artist?.artistName}
                    aboveTitle="Wykonawca" />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Table title="Albumy" objects={albums} isPending={isPending} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <TableDetails object={this.processArtist(artist)} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TableList array={this.processURLs(artist?.urls, isAdmin)} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );

    }
};

interface LinkStateProps {
    fetching: any,
    artists: Artist[],
    artistTypes: ArtistType[],
    auth: any
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        artists: state.artists,
        artistTypes: state.artistTypes,
        auth: state.auth
    });

export default connect(mapStateToProps, null)(ArtistPage);