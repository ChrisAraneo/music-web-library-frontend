import React from "react";
import { connect } from "react-redux";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import Button from "@material-ui/core/Button/Button";
import { AppState } from "../../../store";
import Select from "@material-ui/core/Select/Select";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Cover from "../../../model/Cover";
import { getCover, deleteCover } from "../../../store/covers";

interface IProps {
    classes: any,
    covers: Cover[]
}

interface IState {
    coverID: number
}

const initialState = {
    coverID: Number.MIN_VALUE
}

type Props = IProps & LinkStateProps;

class RemoveCover extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = { ...initialState };
    }

    handleChangeCover = (event: any) => {
        const value = event?.target?.value;
        if (value) {
            getCover(value, (cover: Cover) => {
                this.setState({ coverID: cover?.coverID });
            });
        }
    }

    submitForm = () => {
        const { coverID } = this.state;
        if (coverID != initialState.coverID) {
            deleteCover(this.state.coverID,
                () => {
                    this.setState({ ...initialState });
                });
        }
    }

    render = () => {
        const { classes, fetching, covers } = this.props;
        const { isPending } = fetching;
        const disabled = isPending || this.state.coverID == initialState.coverID;

        return (
            <CardAdmin title="Usuń okładkę">
                <div className={classes.form}>
                    <FormControl className={classes.selectWrapper}>
                        <Select
                            id="type-select"
                            value={undefined}
                            onChange={this.handleChangeCover}
                            required
                            autoWidth>
                            {
                                covers?.map((cover: Cover) => {
                                    if (cover && cover?.coverID) {
                                        return (<MenuItem key={cover?.coverID} value={cover?.coverID}>{cover?.data}</MenuItem>);
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </Select>
                        <FormHelperText>Wybierz okładkę do usunięcia</FormHelperText>
                    </FormControl>
                </div>
                <DividerGradient />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    size="large"
                    onClick={this.submitForm}
                    disabled={disabled}>
                    Usuń
                    </Button>
            </CardAdmin>
        );
    }
};

const classes = (theme: Theme) => createStyles({
    form: {
        padding: theme.spacing(3)
    },
    selectWrapper: {
        width: '100%',
        minHeight: '64px',
        marginTop: theme.spacing(2)
    },
    textInput: {
        marginBottom: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(3)
    }
});

interface LinkStateProps {
    fetching?: any,
    covers?: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching,
    covers: state.covers
});

const Styled = withStyles(classes, { withTheme: true })(RemoveCover);
export default connect(mapStateToProps, null)(Styled); 