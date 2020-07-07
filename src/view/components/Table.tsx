import React from 'react';
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DividerGradient from './DividerGradient';



// TODO ,,,,,,,,,,,,, CUSTOM FILTERING AND SEARCH
// >> customFilterAndSearch: (term, rowData) => term == rowData.name.length


const Toolbar: React.FC = (props) => {
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


interface IState {
    stringifiedRows: string[]
}

interface IProps {
    title?: string,
    objects: object[],
    children?: any,
    isPending: boolean
}

class Table extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            stringifiedRows: []
        }
    }

    componentDidMount = () => {
    }

    componentDidUpdate = () => {
    }

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
            field: toString(s),
            filtering: false,
            customSort: (a: any, b: any) => customSort(a, b, s),
            customFilterAndSearch: (term: string, rowData: any) => customFilterAndSearch(term, rowData)
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

    render = () => {
        const { title, objects, isPending } = this.props;
        const empty = objects ? (objects?.length > 0 ? false : true) : true;

        const columns = this.getColumns(objects);
        const data = this.getData(columns, objects);

        return (
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    columns={columns}
                    data={data}
                    title={title ? title : ""}
                    options={{ sorting: true }}
                    isLoading={isPending && empty}
                    components={{
                        Toolbar: (props: object) => (<Toolbar {...props} />)
                    }}
                    localization={localization}
                />
            </div>
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
            filterTooltip: 'Filtr'
        }
    }
};

const toString = (a: any): string | number => {
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

const customSort = (a: any, b: any, orderBy: string): 0 | 1 | -1 => {
    if (!a || !b) {
        return 0;
    }

    const A = toString(a[orderBy]);
    const B = toString(b[orderBy]);

    if (B < A) {
        return -1;
    }
    if (B > A) {
        return 1;
    }
    return 0;
}

const customFilterAndSearch = (term: string, rowData: any) => {
    const properties = Object.getOwnPropertyNames(rowData);
    let stringified = "";
    properties.forEach((p: string) => {
        const val = rowData[p];
        if (typeof val === "string" || typeof val === "number") {
            stringified += ` ${val}`;
        } else if (val) {
            stringified += ` ${toString(val)}`;
        }

    });
    return stringified.includes(term);
}