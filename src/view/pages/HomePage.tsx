import React from "react";
import { Provider, connect } from "react-redux";
import { store, AppState } from "../../store/index";
import Artist from "../../model/Artist";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { getArtistsList, getArtist } from "../../store/artists";

import Page from '../components/Page';
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Title from "../components/Title";
import Typography from "@material-ui/core/Typography";

import { history } from "../../store/index";
import Link from "@material-ui/core/Link";

import { signOut } from "../../store/auth";

interface IProps {

}

type Props = IProps & LinkStateProps;

const HomePage: React.FC<Props> = (props: Props) => {

    // render = () => {

    const styles = useStyles();

    const { usernameOrEmail, token } = props.auth;

    return (
        <>
            <Typography variant="subtitle1" component="p">Internetowy Katalog Muzyczny</Typography>
            <Title title="Tysiące utworów w jednym miejscu" />

            {
                token && usernameOrEmail ?
                    (
                        <Typography className={styles.paragraph} variant="h6" component="p">
                            {`${usernameOrEmail} | ${token}`}
                        </Typography>
                    )
                    :
                    (<>
                        <Typography className={styles.paragraph} variant="h6" component="p">
                            <Link href="#" onClick={() => history.push("/signup")}>Utwórz konto</Link> aby tworzyć własne listy utworów oraz pisać recenzje albumów muzycznych
                </Typography>
                        <Button className={styles.button} variant="contained" color="primary" disableElevation size="large" onClick={() => history.push("/signup")}>Utwórz konto</Button>
                        <Button variant="outlined" color="primary" size="large" onClick={() => history.push("/signin")}> Zaloguj się</Button>
                    </>)
            }


        </>
    );
    // }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(0, 2, 0, 0)
        },
        paragraph: {
            margin: theme.spacing(6, 0, 6, 0)
        }
    })
);

interface LinkStateProps {
    auth: any
}
const mapStateToProps = (
    state: AppState,
    ownProps: IProps
): LinkStateProps => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(HomePage);