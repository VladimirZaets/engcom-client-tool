import _reject from 'lodash/reject';
import {
    PORTING_PULL_REQUEST_START,
    PORTING_PULL_REQUEST_END,
    SET_PORTING_SETTINGS,
    LOAD_PORTING_JOBS_START,
    LOAD_PORTING_JOBS_END,
    ADD_PORTING_JOB
} from '../types';

let defaultState = {
    jobs: [],
    requestData: {},
    portStatus: '',
    settings: {
        useFork: true,
        strategy: 'am',
    }
};

export default (state = defaultState, action) => {

    switch (action.type) {
        case SET_PORTING_SETTINGS:
            return {
                ...state,
                settings: action.params
            };
        case PORTING_PULL_REQUEST_START:
            return {
                ...state,
                requestData: action.params
            };
        case PORTING_PULL_REQUEST_END:
            return {
                ...state,
                portStatus: action.portStatus
            };
        case LOAD_PORTING_JOBS_END:
            return {
                ...state,
                jobs: action.jobs,
            };
        case ADD_PORTING_JOB:
            return {
                ...state,
                jobs: [..._reject(state.jobs, {
                    pr_link: action.job.pr_link,
                    target_repo: action.job.target_repo,
                    target_branch: action.job.target_branch
                }), action.job]
            };
        case LOAD_PORTING_JOBS_START:
        default:
            return state;
    }
};
