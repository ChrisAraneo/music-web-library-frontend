import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const DividerGradient: React.FunctionComponent = () => {
    const styles = useStyles();

    return (
        <Divider className={styles.divider} />
    );
}
export default DividerGradient;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            height: 2,
            backgroundImage: `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.primary.light})`,
            opacity: 0.5
        },
    }
    )
);