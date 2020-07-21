import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


interface IProps {
    array: any[] | undefined
}

const TableList = (props: IProps) => {
    const classes = useStyles();
    const { array } = props;

    if (array && array.length > 0) {
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableBody>
                        {
                            array.map((item: any, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell scope="row">
                                            {item}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return null;
    }
}

export default TableList;

const useStyles = makeStyles({
    table: {
        //
    },
});