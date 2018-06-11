import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import history from './history';
import store from './store';
import routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { initializationTools } from './actions/tools';
import { setUserToken } from './actions/user';
import tools from './engcom-tools-config.json';
import Theme from './theme';
import Cookies from "universal-cookie";
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


store.dispatch(initializationTools(tools));
const cookies = new Cookies();

if (cookies.get('user_api_key')) {
    store.dispatch(setUserToken(cookies.get('user_api_key')));
   // axios.defaults.headers['x-api-key'] = cookies.get('user_api_key');
}

const options = {
    position: 'bottom right',
    timeout: 500000,
    offset: '30px',
    transition: 'scale'
};

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={Theme}>
            <Router history={history}>
                {routes}
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);