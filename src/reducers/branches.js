import {
    LOAD_BRANCHES_START,
    LOAD_BRANCHES_END
} from '../types';

let defaultState = {
    branches: []
};

export default (state = defaultState, action) => {

    switch (action.type) {
        case LOAD_BRANCHES_START:
            return {
                ...state,
                branchesParams: action.params
            };

        case LOAD_BRANCHES_END:
            return {
                ...state,
                branches: action.branches
            };

        default:
            return state;
    }
};
