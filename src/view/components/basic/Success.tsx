import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Paper, Typography } from '@material-ui/core';

interface IProps {
    title: string,
    message?: string,
    children?: any
}

const Success: React.FC<IProps> = (props: IProps) => {
    const { title, message, children } = props;
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={2}>
            <Alert className={classes.alert} severity="success">
                <AlertTitle>{title}</AlertTitle>
                {
                    message ?
                        (<Typography>{message}</Typography>)
                        :
                        null
                }
                {children}
            </Alert>
        </Paper>
    );
}
export default Success;

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