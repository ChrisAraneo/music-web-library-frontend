import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface IProps {
    title: string | undefined,
    children?: any
}

const PageHeader: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();

    return (
        <header className="pageHeader">
            <Typography
                className={classes.pageHeader}
                variant="h3"
                component="h2"
                style={{ fontFamily: '"DM Serif Display", serif' }}>
                {props.title}
                {props.children}
            </Typography>
        </header >
    );
}
export default PageHeader;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageHeader: {
            width: '100%',
            minHeight: '56px',
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: theme.spacing(0, 2, 4, 2)
        }
    }),
);