import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as serviceWorker from './serviceWorker';

import configureStore from './store/configureStore';
import App from './components/App/App';
import Theme from "./components/utils/theme/theme.scss";
import './index.css';

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: { 500: Theme.primaryColor },
  },
});

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
      </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();