import { createMuiTheme, Theme, createStyles } from '@material-ui/core/styles';

export const PRIMARY = "#1D60D6";
export const SECONDARY = "#1FD5E7";
export const LIGHT = "#F7FEFF";

const theme = createMuiTheme({
    palette: {
        // type: 'dark',
        primary: {
            main: PRIMARY,
        },
        secondary: {
            main: SECONDARY,
        },
        background: {
            default: LIGHT
        }
    },
});

export const backgroundImage: string = "radial-gradient(circle at bottom right, rgba(46,243,212, 0.1),rgba(0,68,255, 0.1),rgba(63,130,213, 0.2));"

export default theme;