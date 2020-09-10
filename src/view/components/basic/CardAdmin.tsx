import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from "./Card";
import { SECONDARY } from '../../theme/theme';

interface IProps {
    title: string,
    children?: any
}

const CardAdmin: React.FunctionComponent<IProps> = (props: IProps) => {
    const { title } = props;
    const styles = useStyles();

    return (
        <Card title={<><span className={styles.admin}>[Admin]</span>{title}</>}>
            {props.children}
        </Card>
    );
}
export default CardAdmin;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
        },
        title: {
            padding: theme.spacing(2),
        },
        admin: {
            color: SECONDARY,
            marginRight: theme.spacing(1)
        }
    })
);