import React from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {loadAuthorizationUrl} from "../../actions/authorization";

class AuthorizationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authorizationUrl: '',
            showModal: false
        }
    }

    componentDidMount() {
        if (!this.props.authorized) {
            this.props.loadAuthorizationUrl()
                .then(response => {
                    console.log(response);
                    this.setState({authorizationUrl: response.loginUrl})
                });
        }
    }

    handleSignInClick = e => {
        this.setState({showModal: true});
    };

    getSignInTemplate = () => (
        <div>
            <FlatButton
                label={'Sing In'}
                onClick={this.handleSignInClick}
                disabled={!this.state.authorizationUrl}
            />
            {this.state.showModal && this.generateModal()}
        </div>
    );

    generateModal = () => (<iframe src={this.state.authorizationUrl}/>);

    render() {
        return (
            <div>
                { this.props.authorized ?
                    null :
                    this.getSignInTemplate()
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authorized: state.user.authorized
});

export default connect(mapStateToProps, {loadAuthorizationUrl})(AuthorizationBar);