import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface IProps {
    label: string,
    value: MaterialUiPickersDate,
    handleChangeDate: (event: any) => any,

    disabled?: boolean,
    children?: any
}

const DatePicker: React.FC<IProps> = (props: IProps) => {
    const { label, value, handleChangeDate, disabled } = props;
    const styles = useStyles();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid className={styles.grid} container justify="flex-start">
                <KeyboardDatePicker
                    id="date-picker-inline"
                    fullWidth={true}
                    label={label}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    value={value}
                    onChange={handleChangeDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    disabled={disabled ? true : false}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
export default DatePicker;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
        },
        grid: {
            width: '100%',
            maxWidth: '100%'
        }
    })
);