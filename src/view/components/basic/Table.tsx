import React from 'react';
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DividerGradient from './DividerGradient';
import IconButton from '@material-ui/core/IconButton/IconButton';

const Toolbar: React.FunctionComponent = (props) => {
    const styles = useStyles();

    return (
        <div>
            <div className={styles.toolbar}>
                <MTableToolbar {...props} />
            </div>
            <DividerGradient />
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            padding: theme.spacing(0, 2, 0, 0),
        },
    })
);

interface ITableCoreProps {
    title: string,
    isLoading: boolean,
    data: object[],
    columns: object[],

    actions?: Array<{
        icon: string,
        element: JSX.Element,
        onClick: (event: any, data: any) => void
    }>
}

const TableCore: React.FunctionComponent<ITableCoreProps> = (props: ITableCoreProps) => {
    const { title, isLoading, columns, data, actions } = props;
    const styles = useStyles();

    return (
        <MaterialTable
            columns={columns}
            data={data}
            title={title}
            options={{
                sorting: true
            }}
            isLoading={isLoading}
            components={{
                Toolbar: (props: object) => (<Toolbar {...props} />),
                Action: (props: any) => {
                    const { action, data } = props;
                    const { icon, element, onClick } = action;

                    return (
                        <IconButton
                            onClick={(event: any) => onClick(event, data)}
                            disabled={isLoading}
                            aria-label={icon}>
                            {element}
                        </IconButton>
                    );
                },

            }}
            localization={localization}
            actions={actions}
        />
    );
}

interface IState {

}

interface IProps {
    title?: string,
    objects: object[],
    children?: any,
    isPending: boolean,

    actions?: Array<{
        icon: string,
        element: JSX.Element,
        onClick: (event: any, data: any) => void
    }>
}

class Table extends React.Component<IProps, IState> {

    getColumns = (array: object[]) => {
        const strings: string[] = [];
        array.forEach((item?: Object) => {
            if (item instanceof Object) {
                const names = Object.getOwnPropertyNames(item);
                names.forEach((name: string) => {
                    if (!strings.includes(name)) {
                        strings.push(name);
                    }
                });
            }
        });
        return strings.map((s: string) => ({
            title: s,
            field: this.toString(s),
            filtering: false,
            customSort: (a: any, b: any) => this.customSort(a, b, s),
            customFilterAndSearch: (term: string, rowData: any) => this.customFilterAndSearch(term, rowData)
        }));
    }

    getData = (columns: object[], objects: object[]) => {
        return objects.map((a: any) => {
            const o: any = {};
            columns.forEach((item: any) => {
                const title = item?.title;
                o[title] = a[title];
            });
            return o;
        });
    }

    toString = (a: any): string | number => {
        const f = (a: any): string | number => {
            if (a instanceof Array) {
                return a.map((item: any) => f(item)).join(" ");
            } else if (typeof a == "string" || typeof a == "number") {
                return a;
            } else if (a?.props && a?.props?.children) {
                return f(a.props.children);
            }
            return "";
        }
        return f(a);
    }

    customSort = (a: any, b: any, orderBy: string): 0 | 1 | -1 => {
        if (!a || !b) {
            return 0;
        }

        const A = this.toString(a[orderBy]);
        const B = this.toString(b[orderBy]);

        if (B < A) {
            return -1;
        }
        if (B > A) {
            return 1;
        }
        return 0;
    }

    customFilterAndSearch = (term: string, rowData: any) => {
        const properties = Object.getOwnPropertyNames(rowData);
        let stringified = "";
        properties.forEach((p: string) => {
            const val = rowData[p];
            if (typeof val === "string" || typeof val === "number") {
                stringified += ` ${val}`;
            } else if (val) {
                stringified += ` ${this.toString(val)}`;
            }

        });
        return stringified.includes(term);
    }

    render = () => {
        const { title, objects, isPending, actions } = this.props;

        const columns = this.getColumns(objects);
        const data = this.getData(columns, objects);

        const empty = objects ? (objects?.length > 0 ? false : true) : true;
        const isLoading = isPending && empty;

        return (
            <TableCore
                title={title ? title : ""}
                columns={columns}
                data={data}
                isLoading={isLoading}
                actions={actions}
            />
        );
    }
}
export default Table;

const localization = {
    pagination: {
        labelDisplayedRows: '{from}-{to} z {count}',
        labelRowsSelect: 'wierszy'
    },
    toolbar: {
        nRowsSelected: '{0} zaznaczonych wierszy'
    },
    header: {
        actions: 'Akcje'
    },
    body: {
        addTooltip: 'Dodaj',
        deleteTooltip: 'Usuń',
        editTooltip: 'Edytuj',
        emptyDataSourceMessage: 'Brak danych do wyświetlenia',
        filterRow: {
            filterTooltip: 'Filtruj'
        }
    }
};