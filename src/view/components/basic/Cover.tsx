import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Image from 'material-ui-image';

interface IProps {
    data: string
}

const Cover: React.FunctionComponent<IProps> = (props: IProps) => {
    const { data } = props;
    const styles = useStyles();

    if (data) {
        return (
            <Paper className={styles.root} elevation={2}>
                <Image
                    src={data}
                    aspectRatio={1}
                />
            </Paper>
        )
    } else {
        return null;
    }
}
export default Cover;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
            padding: theme.spacing(2)
        }
    })
);