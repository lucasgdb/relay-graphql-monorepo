import DateMomentUtils from '@date-io/moment';
import { Notification } from '@example/ui';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { RelayEnvironmentProvider } from 'relay-hooks';
import PropTypes from 'prop-types';

import { environment } from './relay';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#200741',
    },
    secondary: {
      main: '#fe2a59',
    },
  },
});

const Providers = ({ children }) => (
  <RelayEnvironmentProvider environment={environment}>
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateMomentUtils} locale="pt-BR">
        <Notification.SnackbarProvider
          maxSnack={10}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          {children}
        </Notification.SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </RelayEnvironmentProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
