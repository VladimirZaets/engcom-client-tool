import { combineReducers } from 'redux';
import deployment from './reducers/deployment';
import pullRequests from './reducers/pull-requests';
import tools from './reducers/tools';
import branches from './reducers/branches';
import user from './reducers/user';
import porting from './reducers/porting';
import authorization from './reducers/authorization';
import loading from './reducers/loading';
import messages from './reducers/messages';

export default combineReducers({
    deployment,
    pullRequests,
    tools,
    branches,
    user,
    porting,
    authorization,
    loading,
    messages
})