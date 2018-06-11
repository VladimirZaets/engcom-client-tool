import {LOADING_PROCESS_START, LOADING_PROCESS_END} from '../types';

export const loadingProcessStart = (type, global) => dispatch => dispatch({
    type: LOADING_PROCESS_START,
    loading: {
        type,
        global
    }
});

export const loadingProcessEnd = type => dispatch => dispatch({
    type: LOADING_PROCESS_END,
    loading: type
});
