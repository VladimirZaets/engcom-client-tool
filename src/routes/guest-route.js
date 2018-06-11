import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({ isAuthentificated, component: Component, ...rest }) => (
    <Route { ...rest } render={props => !isAuthentificated ? <Component { ...props } /> : <Redirect to="/dashboard" />}/>
);

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthentificated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthentificated: !!state.user.token
    }
}

export default connect(mapStateToProps)(GuestRoute);