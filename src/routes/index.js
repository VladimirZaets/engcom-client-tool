import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../pages/home/index';
import PortingTool from '../pages/porting/index';
import DeploymentTool from '../pages/deployment/index';
import SignIn from '../pages/signin/index';
import Layout from '../layout/index';
import UserRoute from './user-route';
import GuestRoute from './guest-route';

export default (
    <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/layout' component={Layout}/>
        <UserRoute exact path='/porting-tool' component={PortingTool} redirectTo={'/signin'}/>
        <UserRoute exact path='/deployment-tool' component={DeploymentTool} redirectTo={'/signin'}/>
        <GuestRoute exact path="/signin"  component={SignIn}/>
    </Switch>
)