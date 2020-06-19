import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

import Progress from "./Progress";



interface IProps {
    title: string,
    data: Array<any>,
    pending: boolean
}

interface IState {

}

class Table extends React.Component<IProps, IState> {

    getHeaders = (data: any[]) => {
        const headers: string[] = [];
        data.forEach(item => {
            if (item !== null && item !== undefined) {
                const names = Object.getOwnPropertyNames(item);
                names.forEach(name => {
                    if (!headers.includes(name)) {
                        headers.push(name);
                    }
                });
            }
        });
        return headers;
    }

    render = () => {
        const { data, title, pending } = this.props;
        const headers = this.getHeaders(data);

        return (
            <TableContainer component={Paper}>
                <Toolbar style={{ width: "100%", display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant="h6">{title}</Typography>
                    {
                        pending ?
                            (<CircularProgress color="secondary" size={24} />)
                            :
                            null
                    }
                </Toolbar>
                <MaterialTable aria-label="simple table">
                    <TableHead>
                        {
                            headers ?
                                <TableRow>
                                    {
                                        headers.map((name: string) => (
                                            <TableCell key={name}>{name}</TableCell>
                                        ))
                                    }
                                </TableRow>
                                :
                                null
                        }
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow>
                                {
                                    headers.map((name: string) => {
                                        if (item) {
                                            if (item[name] !== null) {
                                                return (
                                                    <TableCell key={name}>
                                                        {item[name]}
                                                    </TableCell>
                                                );
                                            } else {
                                                return (
                                                    <TableCell>- - -</TableCell>
                                                );
                                            }
                                        }
                                    })
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </MaterialTable>
                {
                    pending && data.length < 1 ?
                        (<Progress />)
                        :
                        null
                }
            </TableContainer >
        );
    }
}

export default Table;