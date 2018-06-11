import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orange800, green100 } from 'material-ui/styles/colors';

export default getMuiTheme(
    {
        appBar: {
            color: orange800
        },
        radioButton: {
            borderColor: orange800,
            checkedColor: orange800,
        },
        linearProgress: {
            primaryColor: orange800
        },
        checkbox: {
            boxColor: orange800,
            checkedColor: orange800,
        },
        raisedButton: {
            primaryColor: orange800,
        },
        stepper: {
            iconColor: orange800,
            connectorLineColor: orange800,
        },
        textField: {
            focusColor: orange800,
        },
        flatButton: {
            primaryTextColor: orange800,
        },
        palette: {
            primary1Color: orange800,
            primary3Color: green100,
        },
    }
);