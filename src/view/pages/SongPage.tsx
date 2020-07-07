import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";
import { getSong } from "../../store/songs";

import TableDetails from "../components/TableDetails";
import Grid from "@material-ui/core/Grid";
import Song from "../../model/Song";
import Artist from "../../model/Artist";

import { Link as RouterLink } from 'react-router-dom';
import Link from "@material-ui/core/Link";
import PageHeader from "../components/PageHeader";
import SongURL from "../../model/SongURL";
import TableList from "../components/TableList";

interface IProps {
    match: { params: { songID: number } },
}

interface IState {

}

type Props = IProps & LinkStateProps;

class SongPage extends React.Component<Props, IState> {

    componentDidMount() {
        const { songID } = this.props.match.params;
        getSong(songID);
    }

    processSong = (song: Song | undefined): object => {
        if (song) {

            const artists = song.artists?.map((artist: Artist, index: number, array: Array<any>) => <><Link component={RouterLink} to={`/artists/${artist.artistID}`}>{artist.artistName}</Link>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);

            return {
                "Tytuł": song.title,
                "Tempo (BPM)": song.bpm,
                "Komentarz": song.comment,
                "Gatunek": song.genre,
                "Język": song.language,
                "Długość": song.length,
                "Tonacja": song.mainKey,
                "Wydawca": song.publisher,
                "Licencja": song.terms,
                "Strona internetowa": song.website,
                "Rok": song.year,
                "Albumy": song.albums,
                "Wykonawcy": artists
            }
        }
        return ({});
    }

    processURLs = (songURLs: undefined | SongURL[]) => {
        return songURLs?.map((url: SongURL, index: number, array: Array<any>) => <><a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary" href={`${url.url}`} target="_blank">{url.url}</a>{index < array.length - 1 ? (<span>{`, `}</span>) : null}</>);
    }

    render = () => {
        const { songs } = this.props;
        const { songID } = this.props.match.params;

        const song = songs.find((song: Song) => (song ? song.songID == songID : undefined));
        const urls = (song ? this.processURLs(song.songURLs) : []);

        return (
            <>
                <PageHeader title={song?.title} />
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <TableDetails object={this.processSong(song)} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TableList array={urls} />
                        </Grid>
                    </Grid>
                </div>

            </>
        );

    }
};

interface LinkStateProps {
    fetching: any,
    songs: Song[]
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        songs: state.songs
    });

export default connect(mapStateToProps, null)(SongPage);