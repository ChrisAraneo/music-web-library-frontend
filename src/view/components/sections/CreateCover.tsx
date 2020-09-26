import React from "react";
import { connect } from "react-redux";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { AppState } from "../../../store";
import { postCover } from "../../../store/covers";
import { validateCoverData } from "../../../model/Cover";

interface IProps {
    classes: any
}

interface IState {
    data: string,
    validData: boolean
}

const initialState = {
    data: "",
    validData: true
}

type Props = IProps & LinkStateProps;

class CreateCover extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleChangeData = (event: any) => {
        this.setState({ data: event?.target?.value });
    }

    submitForm = () => {
        const { data } = this.state;

        const validData = validateCoverData(data,
            () => this.setState({ validData: true }),
            () => this.setState({ validData: false })
        );

        if (validData) {
            postCover(data, () => {
                this.setState({ ...initialState });
            });
        }

    }

    render = () => {
        const { classes, fetching } = this.props;
        const { isPending } = fetching;

        return (
            <CardAdmin title="Utwórz okładkę albumu">
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        className={classes.textInput}
                        fullWidth={true}
                        label="URL"
                        required
                        onChange={this.handleChangeData}
                        value={this.state.data}
                        disabled={isPending}
                        error={!this.state.validData} />
                </form>
                <DividerGradient />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    size="large"
                    onClick={this.submitForm}
                    disabled={isPending}>
                    Dodaj
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
    fetching?: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching
});

const Styled = withStyles(classes, { withTheme: true })(CreateCover);
export default connect(mapStateToProps, null)(Styled);