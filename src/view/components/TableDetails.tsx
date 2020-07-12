import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


interface IProps {
    object: any
}

const TableDetails = (props: IProps) => {
    const classes = useStyles();
    const { object } = props;

    if (object) {
        const properties = Object.getOwnPropertyNames(object);

        return (
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableBody>
                        {
                            properties.map((p: string) => {
                                if (object[p]) {
                                    const v = object[p];
                                    return (
                                        <TableRow key={p}>
                                            <TableCell component="th" scope="row">
                                                <strong>{p}</strong>
                                            </TableCell>
                                            <TableCell>
                                                {v}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
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

export default TableDetails;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: 0
        },
        table: {
        }
    })
);