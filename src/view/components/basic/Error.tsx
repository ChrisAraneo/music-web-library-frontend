import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Paper, Typography } from '@material-ui/core';

interface IProps {
    title: string,
    message?: string,
    onClick?: () => any
}

const Error: React.FunctionComponent<IProps> = (props: IProps) => {
    const { title, message } = props;
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={2}>
            <Alert
                className={classes.alert}
                severity="error"
                onClose={() => { if (typeof props.onClick == "function") { props.onClick(); } }}>
                <AlertTitle>{title}</AlertTitle>
                <Typography>
                    {
                        message ? message : ''
                    }
                </Typography>
            </Alert>
        </Paper>
    );
}
export default Error;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '400px',
            padding: 0,
            marginBottom: theme.spacing(2)
        },
        alert: {
            margin: 0,
        }
    }),
);