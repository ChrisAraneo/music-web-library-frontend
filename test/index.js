const process = require("process");
const requests = require("./util/requests");
const requestGet = requests.requestGet;
const requestPost = requests.requestPost;
const requestPut = requests.requestPut;
const requestDelete = requests.requestDelete;

const words = require("./util/words");
const adjectives = words.adjectives;
const firstNames = words.firstNames;
const lastNames = words.lastNames;
const countries = words.countries;
const lorems = words.lorems;
const nouns = words.nouns;
const urls = words.urls;
const photos = words.photos;

const prefix = "http://localhost:8080/api"

const N_ARTISTS = 100;
const N_ARTIST_URLS = N_ARTISTS * 3;
const N_SONGS = 2000;
const N_SONG_URLS = N_SONGS * 3;
const N_COVERS = 10;
const N_ALBUMS = 500;
const N_PLAYLISTS = Math.floor(N_ALBUMS / 10);

async function main() {
    let lastAlbumID;
    let lastArtistID;
    let lastCoverID;
    let lastPlaylistID;
    let lastSongID;
    let lastTrack;
    let result;

    const usernameOrEmail = "admin";
    const password = "Secret";
    let token;
    try {
        token = await getToken(usernameOrEmail, password);
    } catch (error) {
        printError("Token", "Token cannot be obtained!");
    }

    if (token) {
        printSuccess("Token", "Logged using admin credentials. Token successfully obtained");

        // ARTIST TYPES
        await postArtistTypes(token);
        let artistTypes = await getArtistTypesList();
        await getSingleArtistType(artistTypes)
        await putSingleArtistType(artistTypes, token);
        const delT = await deleteSingleArtistType(artistTypes, token);
        artistTypes = artistTypes.filter(item => item.artistTypeID != delT);

        // ARTISTS
        await postArtists(artistTypes, token, N_ARTISTS);
        let artists = await getArtistsList();
        await getSingleArtist(artists);
        await putSingleArtist(artists, token);
        const delAr = await deleteSingleArtist(artistTypes, token);
        artists = artists.filter((item) => item.artistID != delAr);

        // ARTIST URLS
        await postArtistURLs(artists, token, N_ARTIST_URLS);
        let artistURLs = await getArtistURLsList();
        await getSingleArtistURL(artistURLs);
        const delAU = await deleteSingleArtistURL(artistURLs, token);
        artistURLs = artistURLs.filter(item => item.artistURLID != delAU);

        // SONGS
        await postSongs(token, N_SONGS);
        let songs = await getSongsList();
        await getSingleSong(songs);
        await putSingleSong(songs, token);
        const delS = await deleteSingleSong(songs, token);
        songs = songs.filter((item) => item.songID != delS);

        // SONG URLS
        await postSongURLs(songs, token, N_SONG_URLS);
        let songURLs = await getSongURLsList();
        await getSingleSongURL(songURLs);
        const delSU = await deleteSingleSongURL(songURLs, token);
        songURLs = songURLs.filter(item => item.songURLID != delSU);

        // COVERS
        await postCovers(token, N_COVERS);
        let covers = await getCoversList();
        await getSingleCover(covers);
        const delC = await deleteSingleCover(songs, token);
        covers = covers.filter((item) => item.coverID != delC);

        // ALBUMS
        await postAlbums(token, N_ALBUMS);
        let albums = await getAlbumsList();
        await getSingleAlbum(albums);
        await putSingleAlbum(albums, token);
        const delA = await deleteSingleAlbum(albums, token);
        albums = albums.filter((item) => item.albumID != delA);

        // COVER + ALBUM
        result = await attachCoversToAlbums(covers, albums, token);
        lastCoverID = result.lastCoverID;
        lastAlbumID = result.lastAlbumID;
        await detachCoverFromAlbum(lastCoverID, lastAlbumID, token);

        // SONG + ARTIST
        result = await attachSongsToArtists(songs, artists, token);
        lastSongID = result.lastSongID;
        lastArtistID = result.lastArtistID;
        await detachSongFromArtist(lastSongID, lastArtistID, token);

        // SONG + ALBUM
        result = await attachSongsToAlbums(songs, albums, token);
        lastSongID = result.lastSongID;
        lastAlbumID = result.lastAlbumID;
        await detachSongFromAlbum(lastSongID, lastAlbumID, token);

        // PLAYLISTS
        await postPlaylists(token, N_PLAYLISTS);
        let playlists = await getPlaylistsList(token);
        await getSinglePlaylist(playlists, token);
        await putSinglePlaylist(playlists, token);
        const delP = await deleteSinglePlaylist(playlists, token);
        playlists = playlists.filter(item => item.playlistID != delP);

        // SONG + PLAYLIST
        result = await attachSongsToPlaylists(songs, playlists, token);
        lastSongID = result.lastSongID;
        lastPlaylistID = result.lastPlaylistID;
        lastTrack = result.lastTrack
        await detachSongFromPlaylist(lastPlaylistID, lastTrack, token);

        // REVIEWS -- have to be tested manually, because they require Captcha

        console.log("Done!");
    }

}

async function postArtistTypes(token) {
    const names = ["Główny wykonawca", "Wokalista", "Gitarzysta", "Perkusista", "Multiinstrumentalista", "Pianista", "Saksofonista", "Inżynier dźwięku", "Kompozytor", "Basista"];

    let hasError = false;
    for (const name of names) {
        try {
            await requestPost(`${prefix}/artisttypes`, token, {
                body: JSON.stringify({ name })
            });
        }
        catch (error) {
            printError("Artist Types", `Error while creating Artist Types`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess("Artist Types", `Artist Types successfully created`);
    }
}

async function getArtistTypesList() {
    let types;
    let hasError = false;
    try {
        types = await requestGet(`${prefix}/artisttypes`);
    } catch (error) {
        printError("Artist Types", `Error while getting Artist Types`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artist Types", `Fetched Artist Types List`);
    }
    return types;
}

async function getSingleArtistType(artisttypes) {
    const artistTypeID = getRandomElement(artisttypes).artistTypeID;
    let hasError = false;
    try {
        await requestGet(`${prefix}/artisttypes/${artistTypeID}`);
    } catch (error) {
        printError("Artist Types", `Error while getting single Artist Type`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artist Types", `Fetched single Artist Type`);
    }
}

async function putSingleArtistType(artisttypes, token) {
    const artistTypeID = getRandomElement(artisttypes).artistTypeID;
    const body = {
        artistTypeID: artistTypeID,
        name: "MODIFIED"
    };
    let hasError = false;
    try {
        await requestPut(`${prefix}/artisttypes/${artistTypeID}`, token, {
            body: JSON.stringify(body)
        });
    } catch (error) {
        printError("Artist Types", `Error while modifying single Artist Type`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artist Types", `Modified single Artist Type`);
    }
}

async function deleteSingleArtistType(artisttypes, token) {
    const artistType = getRandomElement(artisttypes);
    let hasError = false;
    let deletedArtistTypeID;
    try {
        await requestDelete(`${prefix}/artisttypes/${artistType.artistTypeID}`, token);
        deletedArtistTypeID = artistType.artistTypeID;
    } catch (error) {
        printError("Artist Types", `Error while removing single Artist Type`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artist Types", `Removed single Artist Type`);
    }
    return deletedArtistTypeID;
}

async function postArtists(artistTypes, token, number) {
    let hasError = false;
    for (let i = 0; i < number; ++i) {
        const firstName = getRandomElementOptionally(firstNames);
        const lastName = getRandomElementOptionally(lastNames);
        const name = (firstName ? `${firstName} ${lastName ? lastName : ""}` : (lastName ? lastName : ""));
        let artistName = `${getRandomElement(adjectives)} ${name}`;
        if (artistName.slice(-1) == " ") {
            artistName = artistName.slice(0, -1);
        }
        const artistType = getRandomElementOptionally(artistTypes);
        const body = {
            artistName,
            birthDate: getRandomElementOptionally([new Date()]),
            country: getRandomElementOptionally(countries),
            firstName,
            lastName
        };
        if (artistType) {
            body.artistType = artistType;
        }
        try {
            await requestPost(`${prefix}/artists`, token, {
                body: JSON.stringify(body)
            });
        }
        catch (error) {
            printError("Artists", `Error while creating Artist`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess("Artists", `Artists successfully created`);
    }
}

async function getArtistsList() {
    let artists;
    let hasError = false;
    try {
        artists = await requestGet(`${prefix}/artists`);
    } catch (error) {
        printError("Artists", `Error while getting Artists`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artists", `Fetched Artist List`);
    }
    return artists;
}

async function getSingleArtist(artists) {
    let hasError = false;
    const artistID = getRandomElement(artists).artistID;
    try {
        await requestGet(`${prefix}/artists/${artistID}`);
    } catch (error) {
        printError("Artists", `Error while getting single Artist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artists", `Fetched single Artist`);
    }
}

async function putSingleArtist(artists, token) {
    const artist = getRandomElement(artists);
    artist.artistName = "MODIFIED";
    let hasError = false;
    try {
        await requestPut(`${prefix}/artists/${artist.artistID}`, token, {
            body: JSON.stringify(artist)
        });
    } catch (error) {
        printError("Artists", `Error while modifying single Artist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artists", `Modified single Artist`);
    }
}

async function deleteSingleArtist(artists, token) {
    const artist = getRandomElement(artists);
    let hasError = false;
    let deletedArtistID;
    try {
        await requestDelete(`${prefix}/artists/${artist.artistID}`, token);
        deletedArtistID = artist.artistID;
    } catch (error) {
        printError("Artists", `Error while removing single Artist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artists", `Removed single Artist`);
    }
    return deletedArtistID;
}

async function postArtistURLs(artists, token, number) {
    let hasError = false;
    for (let i = 0; i < number; ++i) {
        const artistUrl = {
            artist: {
                artistID: getRandomElement(artists).artistID
            },
            url: getRandomElement(urls)
        };
        try {
            await requestPost(`${prefix}/artisturls`, token, {
                body: JSON.stringify(artistUrl)
            });
        }
        catch (error) {
            printError("Artist URLs", `Error while creating Artist URLs`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess("Artist URLs", `Artist URLs successfully created`);
    }
}

async function getArtistURLsList() {
    let urls;
    let hasError = false;
    try {
        urls = await requestGet(`${prefix}/artisturls`);
    } catch (error) {
        printError("Artist URLs", `Error while getting Artist URL`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artist URLs", `Fetched Artist URL List`);
    }
    return urls;
}

async function getSingleArtistURL(artistURLs) {
    let hasError = false;
    const id = getRandomElement(artistURLs).artistURLID;
    try {
        await requestGet(`${prefix}/artisturls/${id}`);
    } catch (error) {
        printError("Artist URLs", `Error while getting single Artist URL`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artist URLs", `Fetched single Artist URL`);
    }
}

async function deleteSingleArtistURL(urls, token) {
    const url = getRandomElement(urls);
    let hasError = false;
    let deletedArtistURLID;
    try {
        await requestDelete(`${prefix}/artisturls/${url.artistUrlID}`, token);
        deletedArtistURLID = url.artistUrlID;
    } catch (error) {
        printError("Artist URLs", `Error while removing single Artist URL`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artist URLs", `Removed single Artist URL`);
    }
    return deletedArtistURLID;
}

async function postSongs(token, number) {
    const bpms = [100, 120, 122, 140, 150, 200];
    const genres = ["Rock", "Pop", "Rap", "Jazz", "Muzyka klasyczna", "Muzyka filmowa", "Techno", "Disco", "Folk", "Country"];
    const languages = ["Polski", "Angielski", "Niemiecki", "Hiszpański", "Włoski", "Francuski"];
    const lengths = [143, 160, 178, 190, 230, 333];
    const keys = ["C min", "C maj", "D min", "D maj", "G min", "G maj"];
    const years = [1982, 1999, 2003, 2012, 2015, 2018, 2020];

    let hasError = false;
    for (let i = 0; i < number; ++i) {
        const title = `${getRandomElement(adjectives)} ${getRandomElement(lorems)} ${getRandomElement(nouns)}`;
        const song = {
            title,
            bpm: getRandomElementOptionally(bpms),
            comment: getRandomElementOptionally([`${title} is a nice song.`]),
            genre: getRandomElementOptionally(genres),
            language: getRandomElementOptionally(languages),
            length: getRandomElementOptionally(lengths),
            mainKey: getRandomElementOptionally(keys),
            publisher: getRandomElementOptionally([`${getRandomElement(lorems)} ${getRandomElement(nouns)}`]),
            terms: getRandomElementOptionally(["Lorem ipsum dolor es"]),
            website: getRandomElementOptionally(["https://www.wikipedia.org/"]),
            year: getRandomElementOptionally(years)
        }
        try {
            await requestPost(`${prefix}/songs`, token, {
                body: JSON.stringify(song)
            });
        }
        catch (error) {
            printError("Songs", `Error while creating Song`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess("Songs", `Songs successfully created`);
    }
}

async function getSongsList() {
    let songs;
    let hasError = false;
    try {
        songs = await requestGet(`${prefix}/songs`);
    } catch (error) {
        printError("Songs", `Error while getting Songs`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Songs", `Fetched Songs List`);
    }
    return songs;
}

async function getSingleSong(songs) {
    const songID = getRandomElement(songs).songID;
    let hasError = false;
    try {
        await requestGet(`${prefix}/songs/${songID}`);
    } catch (error) {
        printError("Songs", `Error while getting single Song`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Songs", `Fetched single Song`);
    }
}

async function putSingleSong(songs, token) {
    const song = getRandomElement(songs);
    song.title = "MODIFIED";
    let hasError = false;
    try {
        await requestPut(`${prefix}/songs/${song.songID}`, token, {
            body: JSON.stringify(song)
        });
    } catch (error) {
        printError("Songs", `Error while modifying single Song`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Songs", `Modified single Song`);
    }
}

async function deleteSingleSong(songs, token) {
    const song = getRandomElement(songs);
    let hasError = false;
    let deletedSongID;
    try {
        await requestDelete(`${prefix}/songs/${song.songID}`, token);
        deletedSongID = song.songID;
    } catch (error) {
        printError("Songs", `Error while removing single Song`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Songs", `Removed single Song`);
    }
    return deletedSongID;
}

async function postSongURLs(songs, token, number) {
    let hasError = false;
    for (let i = 0; i < number; ++i) {
        const songUrl = {
            song: {
                songID: getRandomElement(songs).songID
            },
            url: getRandomElement(urls)
        };
        try {
            await requestPost(`${prefix}/songurls`, token, {
                body: JSON.stringify(songUrl)
            });
        }
        catch (error) {
            printError("Song URLs", `Error while creating Song URLs`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess("Song URLs", `Song URLs successfully created`);
    }
}

async function getSongURLsList() {
    let urls;
    let hasError = false;
    try {
        urls = await requestGet(`${prefix}/songurls`);
    } catch (error) {
        printError("Song URLs", `Error while getting Song URL`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Song URLs", `Fetched Song URL List`);
    }
    return urls;
}

async function getSingleSongURL(songURLs) {
    let hasError = false;
    const songURLID = getRandomElement(songURLs).songURLID;
    try {
        await requestGet(`${prefix}/songurls/${songURLID}`);
    } catch (error) {
        printError("Song URLs", `Error while getting single Song URL`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Song URLs", `Fetched single Song URL`);
    }
}

async function deleteSingleSongURL(urls, token) {
    const url = getRandomElement(urls);
    let hasError = false;
    let deletedSongURLID;
    try {
        await requestDelete(`${prefix}/songurls/${url.songURLID}`, token);
        deletedSongURLID = url.songURLID;
    } catch (error) {
        printError("Song URLs", `Error while removing single Song URL`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Song URLs", `Removed single Song URL`);
    }
    return deletedSongURLID;
}

async function postCovers(token, number) {
    let hasError = false;
    for (let i = 0; i < number; ++i) {
        const cover = {
            data: getRandomElement(photos),
        }
        try {
            await requestPost(`${prefix}/covers`, token, {
                body: JSON.stringify(cover)
            });
        }
        catch (error) {
            printError("Covers", `Error while creating Cover`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess("Covers", `Covers successfully created`);
    }
}

async function getCoversList() {
    let covers;
    let hasError = false;
    try {
        covers = await requestGet(`${prefix}/covers`);
    } catch (error) {
        printError("Covers", `Error while getting Covers`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Covers", `Fetched Covers List`);
    }
    return covers;
}

async function getSingleCover(covers) {
    const coverID = getRandomElement(covers).coverID;
    let hasError = false;
    try {
        await requestGet(`${prefix}/covers/${coverID}`);
    } catch (error) {
        printError("Covers", `Error while getting single Cover`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Covers", `Fetched single Cover`);
    }
}

async function deleteSingleCover(covers, token) {
    const cover = getRandomElement(covers);
    let hasError = false;
    let deletedCoverID;
    try {
        await requestDelete(`${prefix}/covers/${cover.coverID}`, token);
        deletedCoverID = cover.coverID;
    } catch (error) {
        printError("Covers", `Error while removing single Cover`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Covers", `Removed single Cover`);
    }
    return deletedCoverID;
}

async function postAlbums(token, number) {
    const years = Array(70).fill(0).map((value, index) => 1950 + index);
    let hasError = false;
    for (let i = 0; i < number; ++i) {
        const title = `${getRandomElement(adjectives)} ${getRandomElement(nouns)}`;
        const album = {
            title,
            year: getRandomElement(years)
        }
        try {
            await requestPost(`${prefix}/albums`, token, {
                body: JSON.stringify(album)
            });
        }
        catch (error) {
            printError("Albums", `Error while creating Album`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess("Albums", `Album successfully created`);
    }
}

async function getAlbumsList() {
    let albums;
    let hasError = false;
    try {
        albums = await requestGet(`${prefix}/albums`);
    } catch (error) {
        printError("Albums", `Error while getting Albums`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Albums", `Fetched Albums List`);
    }
    return albums;
}

async function getSingleAlbum(albums) {
    const albumID = getRandomElement(albums).albumID;
    let hasError = false;
    try {
        await requestGet(`${prefix}/albums/${albumID}`);
    } catch (error) {
        printError("Albums", `Error while getting single Album`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Albums", `Fetched single Album`);
    }
}

async function putSingleAlbum(albums, token) {
    const album = getRandomElement(albums);
    album.title = "MODIFIED";
    let hasError = false;
    try {
        await requestPut(`${prefix}/albums/${album.albumID}`, token, {
            body: JSON.stringify(album)
        });
    } catch (error) {
        printError("Albums", `Error while modifying single Album`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Albums", `Modified single Album`);
    }
}

async function deleteSingleAlbum(albums, token) {
    const album = getRandomElement(albums);
    let hasError = false;
    let deletedAlbumID;
    try {
        await requestDelete(`${prefix}/albums/${album.albumID}`, token);
        deletedAlbumID = album.albumID;
    } catch (error) {
        printError("Albums", `Error while removing single Album`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Albums", `Removed single Album`);
    }
    return deletedAlbumID;
}

async function attachCoversToAlbums(covers, _albums, token) {
    const albums = shuffleArray(_albums);
    let hasError = false;
    let lastCoverID;
    let lastAlbumID;
    for (let i = 0; i < albums.length / 2; ++i) {
        const album = albums[i];
        const cover = covers[Math.floor(i % covers.length)];
        try {
            await requestPost(`${prefix}/covers/${cover.coverID}/${album.albumID}`, token, {});
            lastCoverID = cover.coverID;
            lastAlbumID = album.albumID;
        }
        catch (error) {
            printError("Covers", `Error while attaching Cover to Album`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess("Covers", `Covers successfully attached to Albums`);
    }
    return { lastCoverID, lastAlbumID };
}

async function detachCoverFromAlbum(coverID, albumID, token) {
    let hasError = false;
    try {
        await requestDelete(`${prefix}/covers/${coverID}/${albumID}`, token);
    } catch (error) {
        printError("Covers", `Error while detaching Cover from single Album`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Covers", `Successfuly detached Cover from Album`);
    }
}

async function attachSongsToArtists(_songs, _artists, token) {
    const artists = shuffleArray(_artists);
    let hasError = false;
    let lastSongID;
    let lastArtistID;
    for (let i = 0; i < artists.length; ++i) {
        const artist = artists[i];
        const songs = shuffleArray(_songs);
        for (let j = 0; j < songs.length / 15; ++j) {
            const song = songs[j];
            try {
                await requestPost(`${prefix}/artists/${artist.artistID}/${song.songID}`, token, {});
                lastArtistID = artist.artistID;
                lastSongID = song.songID;
            }
            catch (error) {
                printError("Artists", `Error while attaching Song to Artist`);
                hasError = true;
                break;
            }
        }
        if (hasError) {
            break;
        }
    }
    if (!hasError) {
        printSuccess("Artists", `Songs successfully attached to Artists`);
    }
    return { lastSongID, lastArtistID };
}

async function detachSongFromArtist(songID, artistID, token) {
    let hasError = false;
    try {
        await requestDelete(`${prefix}/artists/${artistID}/${songID}`, token);
    } catch (error) {
        printError("Artists", `Error while detaching Song from single Artist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Artists", `Successfuly detached Song from Artist`);
    }
}

async function postPlaylists(token, number) {
    let hasError = false;
    for (let i = 0; i < number; ++i) {
        const title = `${getRandomElement(adjectives)} ${getRandomElement(nouns)}`;
        const playlist = { title };
        try {
            await requestPost(`${prefix}/playlists`, token, {
                body: JSON.stringify(playlist)
            });
        }
        catch (error) {
            printError("Playlists", `Error while creating Playlist`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess("Playlists", `Playlists successfully created`);
    }
}

async function getPlaylistsList(token) {
    let playlists;
    let hasError = false;
    try {
        playlists = await requestGet(`${prefix}/playlists`, token);
    } catch (error) {
        printError("Playlists", `Error while getting Playlists`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Playlists", `Fetched Playlists List`);
    }
    return playlists;
}

async function getSinglePlaylist(playlists, token) {
    const playlistID = getRandomElement(playlists).playlistID;
    let hasError = false;
    try {
        await requestGet(`${prefix}/playlists/${playlistID}`, token);
    } catch (error) {
        printError("Playlists", `Error while getting single Playlist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Playlists", `Fetched single Playlist`);
    }
}

async function putSinglePlaylist(playlists, token) {
    const playlist = getRandomElement(playlists);
    playlist.title = "MODIFIED";
    let hasError = false;
    try {
        await requestPut(`${prefix}/playlists/${playlist.playlistID}`, token, {
            body: JSON.stringify(playlist)
        });
    } catch (error) {
        printError("Playlists", `Error while modifying single Playlist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Playlists", `Modified single Playlist`);
    }
}

async function deleteSinglePlaylist(playlists, token) {
    const playlist = getRandomElement(playlists);
    let hasError = false;
    let deletedPlaylistID;
    try {
        await requestDelete(`${prefix}/playlists/${playlist.playlistID}`, token);
        deletedPlaylistID = playlist.playlistID;
    } catch (error) {
        printError("Playlists", `Error while removing single Playlist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Playlists", `Removed single Playlist`);
    }
    return deletedPlaylistID;
}

async function attachSongsToAlbums(_songs, albums, token) {
    let hasError = false;
    let lastSongID;
    let lastAlbumID;
    let lastTrack;
    for (let i = 0; i < albums.length; ++i) {
        const album = albums[i];
        const songs = shuffleArray(_songs);
        for (let j = 0; j < Math.min(songs.length, 10); ++j) {
            const song = songs[j];
            const track = j + 1;
            try {
                await requestPost(`${prefix}/albums/${album.albumID}/${song.songID}/${track}`, token, {});
                lastAlbumID = album.albumID;
                lastSongID = song.songID;
                lastTrack = track;
            }
            catch (error) {
                printError("Albums", `Error while attaching Song to Album`);
                hasError = true;
                break;
            }
        }
        if (hasError) {
            break;
        }
    }
    if (!hasError) {
        printSuccess("Albums", `Songs successfully attached to Albums`);
    }
    return { lastSongID, lastAlbumID, lastTrack };
}

async function detachSongFromAlbum(songID, albumID, track, token) {
    let hasError = false;
    try {
        await requestDelete(`${prefix}/albums/${albumID}/${songID}/${track}`, token);
    } catch (error) {
        printError("Albums", `Error while detaching Song from single Album`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Albums", `Successfuly detached Song from Album`);
    }
}

async function attachSongsToPlaylists(_songs, playlists, token) {
    let hasError = false;
    let lastSongID;
    let lastPlaylistID;
    let lastTrack;
    for (let i = 0; i < playlists.length; ++i) {
        const playlist = playlists[i];
        const songs = shuffleArray(_songs);
        for (let j = 0; j < Math.min(songs.length / 5, 10); ++j) {
            const song = songs[j];
            try {
                await requestPost(`${prefix}/playlists/${playlist.playlistID}/${song.songID}`, token, {});
                lastPlaylistID = playlist.playlistID;
                lastSongID = song.songID;
                lastTrack = j + 1;
            }
            catch (error) {
                printError("Playlists", `Error while attaching Song to Playlist`);
                hasError = true;
                break;
            }
        }
        if (hasError) {
            break;
        }
    }
    if (!hasError) {
        printSuccess("Playlists", `Songs successfully attached to Playlists`);
    }
    return { lastSongID, lastPlaylistID, lastTrack };
}

async function detachSongFromPlaylist(playlistID, lastTrack, token) {
    let hasError = false;
    try {
        await requestDelete(`${prefix}/playlists/${playlistID}/${lastTrack}`, token);
    } catch (error) {
        printError("Playlists", `Error while detaching Song from single Playlist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess("Playlists", `Successfuly detached Song from Playlist`);
    }
}

async function getToken(usernameOrEmail, password) {
    const body = { usernameOrEmail, password };
    let result;
    try {
        result = await requestPost(
            `${prefix}/signin`,
            null,
            { body: JSON.stringify(body) },
        );
    } catch (error) {
        throw error;
    }
    if (result && result.accessToken) {
        return result.accessToken;
    } else {
        throw "No access token in response";
    }
}

function getRandomElement(array) {
    return array[Math.floor(random() * array.length)];
}

function getRandomElementOptionally(array) {
    if (random() > 0.8) {
        return getRandomElement(array);
    }
    return undefined;
}

function random() {
    const n = 1000000;
    const hrtime = process.hrtime();
    const time = (hrtime[1] * Math.floor(Math.random() * n) % n) * (1 / n);
    return time;
}

function shuffleArray(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

function printSuccess(title, message) {
    console.log(`[\u2714] [${title}] ${message}`);
}

function printError(title, message) {
    console.log(`[\u274c] [${title}] ${message}`);
}

main();