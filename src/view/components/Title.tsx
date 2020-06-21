import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface IProps {
    children?: any
}

const Title: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();

    return (
        <Typography className={classes.root} variant="h2" component="h2">
            {props.children}
        </Typography>
    );
}
export default Title;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            padding: 0,
            marginBottom: theme.spacing(2)
        }
    }),
);