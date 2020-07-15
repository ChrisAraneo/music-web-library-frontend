import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Table from "../components/Table";
import Error from "../components/Error";
import { getAlbumsList } from "../../store/albums";
import Album from "../../model/Album";
import PageHeader from "../components/PageHeader";

interface IProps {

}

interface IState {

}

type Props = IProps & LinkStateProps;

class AlbumListPage extends React.Component<Props, IState> {

    componentDidMount() {
        getAlbumsList();
    }

    processData = (albums: Array<Album>) => {
        const data: any[] = [];
        albums.forEach((album: Album) => {
            if (album) {
                const title = (<Link component={RouterLink} to={`/albums/${album.albumID}`}>{album.title}</Link>);

                const artists = album.artists?.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);

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
                <PageHeader title="Albumy muzyczne" />
                <Table title="Lista albumów muzycznych" objects={data} isPending={isPending} />
            </>
        );
    }
};

interface LinkStateProps {
    fetching: any,
    albums: Album[]
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        albums: state.albums
    });

export default connect(mapStateToProps, null)(AlbumListPage); 