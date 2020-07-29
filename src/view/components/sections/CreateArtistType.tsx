import React from "react";
import { connect } from "react-redux";

import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { AppState } from "../../../store";
import { postArtistType } from "../../../store/artistTypes";

interface IProps {
    classes: any
}

interface IState {
    name: string
}

const initialState = {
    name: "",
}

type Props = IProps & LinkStateProps;

class CreateArtistType extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleChangeName = (event: any) => {
        this.setState({ name: event?.target?.value });
    }

    submitForm = () => {
        const { name } = this.state;
        postArtistType(name, () => {
            this.setState({ ...initialState });
            alert("Wysłano, todo walidacja");
        });
    }

    render = () => {
        const { classes, fetching } = this.props;
        const { isPending } = fetching;
        const disabled = isPending;

        return (
            <div className={classes.marginBottom}>
                <CardAdmin title="Dodaj rodzaj działalności muzycznej">
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            className={classes.textInput}
                            fullWidth={true}
                            label="Rodzaj działalności muzycznej"
                            required
                            onChange={this.handleChangeName}
                            value={this.state.name}
                            disabled={disabled} />
                    </form>
                    <DividerGradient />
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        disableElevation
                        size="large"
                        onClick={this.submitForm}
                        disabled={disabled}>
                        Dodaj
                    </Button>
                </CardAdmin>
            </div>
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
    },
    marginBottom: {
        marginBottom: theme.spacing(3)
    }
});

interface LinkStateProps {
    fetching?: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching
});

const Styled = withStyles(classes, { withTheme: true })(CreateArtistType);
export default connect(mapStateToProps, null)(Styled);