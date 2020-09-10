import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MUCircularProgress from '@material-ui/core/CircularProgress';

interface IProps {
    enabled: boolean
}

const CircularProgress: React.FunctionComponent<IProps> = (props: IProps) => {
    const { enabled } = props;
    const classes = useStyles();

    return (
        <>
            {
                enabled ?
                    (
                        <div className={classes.container}>
                            <MUCircularProgress
                                className={classes.progress}
                                color="secondary"
                                size={SIZE} />
                        </div>)
                    :
                    null
            }
        </>
    );
}
export default CircularProgress;

const SIZE = 20;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        progress: {
            margin: theme.spacing(0, 2, 0, 2)
        }
    })
);