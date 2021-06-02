import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import * as locales from '@material-ui/core/locale';

// Create a theme instance.
export const createTheme = (locale: string) => {
    return createMuiTheme({
        palette: {
            primary: {
                main: '#5c6bc0',
            },
            secondary: {
                main: '#009688',
            },
            error: {
                main: red.A400,
            },
            background: {
                default: '#fff',
            },
        },
    }, (locales as any)[locale]);
}
