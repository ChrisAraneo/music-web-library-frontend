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
import MaterialTable from "material-table";

interface IProps {
    title: string,
    children?: any
}

const Tabelka: React.FC<IProps> = (props: IProps) => {
    const { title } = props;
    const styles = useStyles();

    return (
        <div style={{ maxWidth: "100%" }}>
            <MaterialTable
                columns={[
                    { title: "Adı", field: "name" },
                    { title: "Soyadı", field: "surname" },
                    { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
                    {
                        title: "Doğum Yeri",
                        field: "birthCity",
                        lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
                    },
                ]}
                data={[
                    {
                        name: "Mehmet",
                        surname: "Baran",
                        birthYear: 1987,
                        birthCity: 63,
                    },
                    {
                        name: "Adam",
                        surname: "Kowalski",
                        birthYear: 1987,
                        birthCity: 63,
                    },
                ]}
                title="Demo Title"
            />
        </div>
    );
}
export default Tabelka;

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