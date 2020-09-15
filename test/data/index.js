const requests = require("./requests.es5");
const requestGet = requests.requestGet;
const requestPost = requests.requestPost;
const requestPut = requests.requestPut;
const requestDelete = requests.requestDelete;

const words = require("./words");
const adjectives = words.adjectives;
const firstNames = words.firstNames;
const lastNames = words.lastNames;
const countries = words.countries;
const lorems = words.lorems;
const nouns = words.nouns;
const urls = words.urls;

const prefix = "http://localhost:8080/api"


async function main() {
    const usernameOrEmail = "admin";
    const password = "Secret";
    let token;
    try {
        token = await getToken(usernameOrEmail, password);
    } catch (error) {
        printError("Token cannot be obtained!");
    }

    if (token) {
        printSuccess("Token successfully obtained");

        // ARTIST TYPES
        await postArtistTypes(token);
        const artistTypes = await getArtistTypesList();
        await getSingleArtistType(artistTypes)
        await putSingleArtistType(artistTypes, token);
        await deleteSingleArtistType(artistTypes, token);

        // ARTISTS
        await postArtists(artistTypes, token, 100);
        const artists = await getArtistsList();
        await getSingleArtist(artists);
        await putSingleArtist(artists, token);
        await deleteSingleArtist(artistTypes, token);

        // ARTIST URLS
        await postArtistURLs(artists, token, 200);
        const artistURLs = await getArtistURLsList();
        await deleteSingleArtistURL(artistURLs, token);

        // TODO SONGS
        await postSongs(token, 100);

        // TODO SONG URLS

        // TODO @PostMapping("/artists/{artistID}/{songID}")
        // TODO @DeleteMapping("/artists/{artistID}/{songID}")

        // await postCovers(token, 30);
    }

}

async function postArtistTypes(token) {
    const names = ["Główny wykonawca", "Wokalista", "Gitarzysta", "Perkusista", "Multiinstrumentalista"];

    let hasError = false;
    for (const name of names) {
        try {
            await requestPost(`${prefix}/artisttypes`, token, {
                body: JSON.stringify({ name })
            });
        }
        catch (error) {
            printError(`Error while creating Artist Types`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess(`Artist Types successfully created`);
    }
}

async function getArtistTypesList() {
    let types;
    let hasError = false;
    try {
        types = await requestGet(`${prefix}/artisttypes`);
    } catch (error) {
        printError(`Error while getting Artist Types`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess(`Fetched Artist Types List`);
    }
    return types;
}

async function getSingleArtistType(artisttypes) {
    const artistTypeID = getRandomElement(artisttypes).artistTypeID;
    let hasError = false;
    try {
        await requestGet(`${prefix}/artisttypes/${artistTypeID}`);
    } catch (error) {
        printError(`Error while getting single Artist Type`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess(`Fetched single Artist Type`);
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
        printError(`Error while modifying single Artist Type`);
        console.log(error);
        hasError = true;
    }
    if (!hasError) {
        printSuccess(`Modified single Artist Type`);
    }
}

async function deleteSingleArtistType(artisttypes, token) {
    const artistType = getRandomElement(artisttypes);
    let hasError = false;
    try {
        await requestDelete(`${prefix}/artisttypes/${artistType.artistTypeID}`, token);
    } catch (error) {
        printError(`Error while removing single Artist Type`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess(`Removed single Artist Type`);
    }
}

async function postArtists(artisttypes, token, number) {
    let hasError = false;
    for (let i = 0; i < number; ++i) {
        const firstName = getRandomElementOptionally(firstNames);
        const lastName = getRandomElementOptionally(lastNames);
        const name = (firstName ? `${firstName} ${lastName ? lastName : ""}` : (lastName ? lastName : ""));
        const artistName = `${getRandomElement(adjectives)} ${name}`;
        const artistType = getRandomElementOptionally(artisttypes);
        const body = {
            artistName,
            birthDate: getRandomElementOptionally([new Date()]),
            country: getRandomElementOptionally(countries),
            firstName,
            lastName,
            artistType: artistType ? artistType.artistTypeID : undefined
        };
        try {
            await requestPost(`${prefix}/artists`, token, {
                body: JSON.stringify(body)
            });
        }
        catch (error) {
            printError(`Error while creating Artist`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess(`Artists successfully created`);
    }
}

async function getArtistsList() {
    let artists;
    let hasError = false;
    try {
        artists = await requestGet(`${prefix}/artists`);
    } catch (error) {
        printError(`Error while getting Artists`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess(`Fetched Artist List`);
    }
    return artists;
}

async function getSingleArtist(artists) {
    let hasError = false;
    const artistID = getRandomElement(artists).artistID;
    try {
        await requestGet(`${prefix}/artists/${artistID}`);
    } catch (error) {
        printError(`Error while getting single Artist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess(`Fetched single Artist`);
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
        printError(`Error while modifying single Artist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess(`Modified single Artist`);
    }
}

async function deleteSingleArtist(artists, token) {
    const artist = getRandomElement(artists);
    let hasError = false;
    try {
        await requestDelete(`${prefix}/artists/${artist.artistID}`, token);
    } catch (error) {
        printError(`Error while removing single Artist`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess(`Removed single Artist`);
    }
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
            printError(`Error while creating Artist URLs`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess(`Artist URLs successfully created`);
    }
}

async function getArtistURLsList() {
    let urls;
    let hasError = false;
    try {
        urls = await requestGet(`${prefix}/artisturls`);
    } catch (error) {
        printError(`Error while getting Artist URL`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess(`Fetched Artist URL List`);
    }
    return urls;
}

async function deleteSingleArtistURL(urls, token) {
    const url = getRandomElement(urls);
    let hasError = false;
    try {
        await requestDelete(`${prefix}/artisturls/${url.artistUrlID}`, token);
    } catch (error) {
        printError(`Error while removing single Artist URL`);
        hasError = true;
    }
    if (!hasError) {
        printSuccess(`Removed single Artist URL`);
    }
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
            printError(`Error while creating Song`);
            hasError = true;
            break;
        }
    }
    if (!hasError) {
        printSuccess(`Songs successfully created`);
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
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomElementOptionally(array) {
    if (Math.random() > 0.8) {
        return getRandomElement(array);
    }
    return undefined;
}

function printSuccess(message) {
    console.log("SUCCESS " + message);
}

function printError(message) {
    console.log("ERROR " + message);
}

main();