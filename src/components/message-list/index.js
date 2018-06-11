import React from 'react';
import {connect} from 'react-redux';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteFlashMessage } from '../../actions/messages';


class MessageList extends React.Component {
    constructor(props) {
        super(props);

        this.renderedMessagesList = {};
    }

    componentDidUpdate() {
        this.props.messages.forEach(item => {
            console.log(this.renderedMessagesList, item.id);
            if (!this.renderedMessagesList[item.id]) {
                this.renderedMessagesList[item.id] = item;
                toast(item.content, {
                    type: item.type,
                    autoClose: 500000,
                    onClose: this.deleteMessage(item.id)
                })
            }
        });
    }

    deleteMessage = id => e => {
        delete this.renderedMessagesList[id];
        this.props.deleteFlashMessage(id);
    };

    render() {
        return (
            <ToastContainer
                position={'bottom-right'}
            />
        );
    }

}

const mapStateToProps = state => ({
    messages: state.messages
});

export default connect(mapStateToProps, { deleteFlashMessage })(MessageList);