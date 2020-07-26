import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/index";

import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { history } from "../../store/index";
import Link from "@material-ui/core/Link";

import PageHeader from "../components/basic/PageHeader";


interface IProps {

}

type Props = IProps & LinkStateProps;

const HomePage: React.FC<Props> = (props: Props) => {

    const styles = useStyles();

    const { usernameOrEmail, token } = props.auth;

    return (
        <>
            <Typography variant="subtitle1" component="p">Internetowy Katalog Muzyczny</Typography>
            <PageHeader title="Tysiące utworów w jednym miejscu" />
            <Typography className={styles.paragraph} variant="h6" component="p">
                {`Props: ${JSON.stringify(props)}`}
            </Typography>

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
                        <Button variant="outlined" color="primary" size="large" onClick={() => history.push("/signin")}>Zaloguj się</Button>
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
    fetching: any,
    auth: any,
    router: any,
}
const mapStateToProps = (
    state: AppState): LinkStateProps => ({
        fetching: state.fetching,
        auth: state.auth,
        router: state.router
    });

export default connect(mapStateToProps, null)(HomePage);