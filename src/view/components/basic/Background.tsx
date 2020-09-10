import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { backgroundImage } from '../../theme/theme';

interface IProps {
    children?: any
}

const Background: React.FunctionComponent<IProps> = (props: IProps) => {
    const styles = useStyles();
    return (
        <div className={styles.root}>
            {props.children}
        </div>
    );
}
export default Background;

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            backgroundImage: backgroundImage,
            minHeight: '100vh',
            maxWidth: '100%',
            width: '100%',
        }
    })
);