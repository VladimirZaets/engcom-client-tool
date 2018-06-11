import {
    LOAD_PULL_REQUEST_LIST_START,
    LOAD_PULL_REQUEST_LIST_END,
} from '../types';

let defaultState = {
    pullRequestList: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_PULL_REQUEST_LIST_END:
            return {
                ...state,
                pullRequestList: action.pullRequestList
            };
        case LOAD_PULL_REQUEST_LIST_START:
        default:
            return state;
    }
};
