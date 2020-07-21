import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface IProps {
    title: string | JSX.Element | undefined,
    children?: any
}

const Title: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();

    return (
        <Typography className={classes.root} variant="h6" component="h2">
            {props.title}
            {props.children}
        </Typography>
    );
}
export default Title;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '64px',
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: theme.spacing(0, 2, 0, 2)
        }
    }),
);