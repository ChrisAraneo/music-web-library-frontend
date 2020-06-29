import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MaterialCard from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Paper } from '@material-ui/core';
import DividerGradient from './DividerGradient';
import Title from './Title';

interface IProps {
    title: string,
    children?: any
}

const Card: React.FC<IProps> = (props: IProps) => {
    const { title } = props;
    const styles = useStyles();

    return (
        <Paper className={styles.root} elevation={2}>
            <Title title={title} />
            {/* <Typography className={styles.title} variant="h5" component="h5">
                {title}
            </Typography> */}
            <DividerGradient />
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