import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        // type: 'dark',
        primary: {
            main: green[600],
        },
        secondary: {
            main: green[500],
        },
        background: {
            default: green[50]
        }
    },
});

export default theme;