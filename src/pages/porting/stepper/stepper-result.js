import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default ({onClick}) => (
    <div className="stepper-result-content stepper-result-container">
        <p>
            Your job sent to server, thank you for your contribution!
        </p>
        <RaisedButton
            label="Create another one"
            disableTouchRipple
            disableFocusRipple
            onClick={onClick}
        />
    </div>
);