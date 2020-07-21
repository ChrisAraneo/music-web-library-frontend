import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import DividerGradient from './DividerGradient';
import Title from './Title';

interface IProps {
    title: string | JSX.Element,
    children?: any
}

const Card: React.FC<IProps> = (props: IProps) => {
    const { title } = props;
    const styles = useStyles();

    return (
        <Paper className={styles.root} elevation={2}>
            {
                title ?
                    <>
                        <Title title={title} />
                        <DividerGradient />
                    </>
                    :
                    null
            }
            <div>
                {props.children}
            </div>
        </Paper>
    );
}
export default Card;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
        },
        title: {
            padding: theme.spacing(2),
        },
    })
);