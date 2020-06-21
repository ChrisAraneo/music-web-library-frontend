import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
    }),
);

interface IProps {
    isPending: boolean
}

const Progress: React.FC<IProps> = (props: IProps) => {
    const { isPending } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LinearProgress
                color="secondary"
                variant={isPending ? 'indeterminate' : 'determinate'}
                value={isPending ? 0 : 100} />
        </div>
    );
}
export default Progress;