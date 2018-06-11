import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {
    Card,
    CardActions,
    CardHeader,
    CardText
} from 'material-ui/Card';

import { loadAuthorizationUrl } from '../../actions/authorization';
import PropTypes from "prop-types";


class SignIn extends React.Component {
    componentDidMount() {
        this.props.loadAuthorizationUrl();
    }

    render() {
        return (
            <Card>
                <CardHeader title="Github Login" subtitle="GitHub login is required to proceed." avatar="git.png"/>
                <CardText>Service is going to request your GitHub data: <br/><br/>
                    1. Email for commit message<br/>
                    2. Read/write permissions to your public repositories to create porting branches
                </CardText>
                <CardActions>
                    <RaisedButton
                        href={this.props.authorizationUrl}
                        label="Login with Github"
                        primary
                        disabled={!this.props.authorizationUrl}
                    />
                </CardActions>
            </Card>
        )
    }
}

SignIn.propTypes = {
    loadAuthorizationUrl: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    authorizationUrl: state.authorization.authorizationUrl
});

export default connect(mapStateToProps, {loadAuthorizationUrl})(SignIn);
