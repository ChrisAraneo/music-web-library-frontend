import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface IProps {
    title: string | JSX.Element | undefined | null,

    aboveTitle?: string | JSX.Element | undefined | null,
    children?: any
}

const PageHeader: React.FunctionComponent<IProps> = (props: IProps) => {
    const { title, aboveTitle, children } = props;
    const classes = useStyles();

    return (
        <header className="pageHeader">
            {
                aboveTitle ?
                    (<Typography className={classes.aboveTitle} variant="overline" gutterBottom>
                        {aboveTitle}
                    </Typography>)
                    :
                    null
            }
            <Typography
                className={classes.pageHeader}
                variant="h3"
                component="h2"
                style={{ fontFamily: '"DM Serif Display", serif' }}>
                {title}
            </Typography>
            {children}
        </header >
    );
}
export default PageHeader;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageHeader: {
            width: '100%',
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: theme.spacing(0, 2, 4, 2),
        },
        aboveTitle: {
            width: '100%',
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: theme.spacing(0, 2, 0, 2),
        }
    }),
);