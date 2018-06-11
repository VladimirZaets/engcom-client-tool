import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({ isAuthentificated, redirectTo, component: Component, ...rest }) => (
    <Route
        { ...rest }
        render={
            props => isAuthentificated ?
                <Component { ...props } /> :
                <Redirect to={redirectTo || '/'}/>
        }
    />
);

UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthentificated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthentificated: !!state.user.token
    }
}

export default connect(mapStateToProps)(UserRoute);