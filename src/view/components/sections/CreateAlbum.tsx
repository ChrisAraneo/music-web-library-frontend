import React from "react";
import { connect } from "react-redux";

import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import CardAdmin from "../basic/CardAdmin";
import DividerGradient from "../basic/DividerGradient";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { AppState } from "../../../store";
import { postAlbum } from "../../../store/albums";
import { validateAlbumTitle, validateAlbumYear } from "../../../model/Album";

interface IProps {
    classes: any
}

interface IState {
    title: string,
    year: number | undefined,
    validTitle: boolean,
    validYear: boolean
}

const initialState = {
    title: "",
    year: undefined,
    validTitle: true,
    validYear: true
}

type Props = IProps & LinkStateProps;

class CreateAlbum extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleChangeTitle = (event: any) => {
        this.setState({ title: event?.target?.value });
    }

    handleChangeYear = (event: any) => {
        const { value } = event?.target;

        if (value !== "") {
            const conv = Number(value);
            if (isNaN(conv) === false) {
                this.setState({ year: conv });
            } else {
                if (this.state.year === undefined) {
                    this.setState({ year: 0 });
                } else {
                    if (isNaN(Number(this.state.year))) {
                        this.setState({ year: 0 });
                    } else {
                        this.setState({ year: this.state.year });
                    }
                }
            }
        } else {
            this.setState({ year: undefined });
        }

    }

    submitForm = () => {
        const { title, year } = this.state;

        const validTitle = validateAlbumTitle(title,
            () => this.setState({ validTitle: true }),
            () => this.setState({ validTitle: false })
        );

        const validYear = validateAlbumYear(year,
            () => this.setState({ validYear: true }),
            () => this.setState({ validYear: false })
        );

        if (validTitle && validYear) {
            postAlbum(title, Number(year), () => {
                this.setState({ ...initialState });
            });
        }
    }

    render = () => {
        const { classes, fetching } = this.props;
        const { isPending } = fetching;
        const disabled = isPending;

        return (
            <div className={classes.marginBottom}>
                <CardAdmin title="Dodaj nowy album">
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            className={classes.textInput}
                            fullWidth={true}
                            label="Nazwa albumu"
                            required
                            onChange={this.handleChangeTitle}
                            value={this.state.title}
                            disabled={disabled}
                            error={!this.state.validTitle}
                        />
                        <TextField
                            className={classes.textInput}
                            fullWidth={true}
                            label="Rok wydania"
                            required
                            onChange={this.handleChangeYear}
                            value={this.state.year}
                            disabled={disabled}
                            error={!this.state.validYear}
                        />
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
                        Dodaj album
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
    }
});

interface LinkStateProps {
    fetching?: any
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
    fetching: state.fetching
});

const Styled = withStyles(classes, { withTheme: true })(CreateAlbum);
export default connect(mapStateToProps, null)(Styled);