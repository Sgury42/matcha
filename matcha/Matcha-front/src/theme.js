import { createMuiTheme } from '@material-ui/core/styles';
import { red, grey } from '@material-ui/core/colors';

const theme = createMuiTheme();

const matchaTheme = createMuiTheme({
    palette: {
        primary: {
            main: grey[900],
            light: grey[700],
        },
        secondary: {
          main: red[700],
        }
    },
    overrides: {
        MuiAppBar: {
            colorDefault: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }
        },
        MuiCard: {
          root: {
          marginTop: theme.spacing(5),
          padding: 30,
          width: '100%',
          height: 'fit-content',
        },
      },
    },

});

export default matchaTheme;