import React from 'react';
import {connect} from 'react-redux';
import {deleteFlashMessage} from '../../actions/messages';
import Close from 'material-ui/svg-icons/navigation/close';

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.timeout = 1000;
        this.state = {
            autoHideTime: 500000,
            timer: null
        };
    }

    componentDidMount() {
        if (this.props.autoHide) {
            const autoHide = this.props.autoHideTime || this.state.autoHideTime;

            this.timer = window.setTimeout(() => this.close(this.props.id), autoHide);
        }

        window.setTimeout(() => this.setState({opacity: 'message-opacity'}), this.timeout);
    }

    close = id => {
        clearTimeout(this.timer);
        this.setState({opacity: ''});
        window.setTimeout(() => this.props.deleteFlashMessage(id), this.timeout);
    };

    handleClose = id => event => this.close(id);

    getMessageStyleByType = type => {
        if (type === 'success') {
            return {backgroundColor: 'green'};
        } else if (type === 'error') {
            return {backgroundColor: 'red'};
        }

        return null;
    };

    render() {
        return (
            <div style={this.getMessageStyleByType(this.props.type)} className={`message ${this.state.opacity}`}>
                <span>{this.props.content}</span>
                <Close className={'close-icon'} onClick={this.handleClose(this.props.id)}>Close</Close>
                {this.props.children && <div>{this.props.children}</div>}
            </div>
        )
    }

}

export default connect(null, {deleteFlashMessage})(Message);