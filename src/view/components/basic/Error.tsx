import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Paper, Typography } from '@material-ui/core';

interface IProps {
    title: string,
    error: Error
}

const Error: React.FC<IProps> = (props: IProps) => {
    const { title, error } = props;
    let message = error?.message;
    let stack = error?.stack;
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={2}>
            <Alert className={classes.alert} severity="error">
                <AlertTitle>{title}</AlertTitle>
                <Typography>
                    {
                        message ? message : (error ? String(error) : '')
                    }
                </Typography>
                {
                    stack ?
                        (<Typography color="textSecondary">{stack}</Typography>)
                        :
                        null
                }

            </Alert>
        </Paper>
    );
}
export default Error;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            padding: 0,
            marginBottom: theme.spacing(2)
        },
        alert: {
            margin: 0,
        }
    }),
);