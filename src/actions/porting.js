import API from '../api';
import { addFlashMessage } from "./messages";
import {
    PORTING_PULL_REQUEST_START,
    PORTING_PULL_REQUEST_END,
    SET_PORTING_SETTINGS,
    LOAD_PORTING_JOBS_START,
    LOAD_PORTING_JOBS_END,
    LOAD_PORTING_JOBS_ARTIFACTS_START,
    LOAD_PORTING_JOBS_ARTIFACTS_END,
    ADD_PORTING_JOB
} from '../types';

export const portingStart = params => dispatch => dispatch({
    type: PORTING_PULL_REQUEST_START,
    params
});

export const portingEnd = portStatus => dispatch => dispatch({
    type: PORTING_PULL_REQUEST_END,
    portStatus
});

export const setPortingSettings = params => dispatch => dispatch({
    type: SET_PORTING_SETTINGS,
    params
});

export const loadPortingJobsStart = () => dispatch => dispatch({
    type: LOAD_PORTING_JOBS_START,
});

export const loadPortingJobsEnd = jobs => dispatch => dispatch({
    type: LOAD_PORTING_JOBS_END,
    jobs
});

export const loadPortingJobArtifactsStart = path => dispatch => dispatch({
    type: LOAD_PORTING_JOBS_ARTIFACTS_START,
    path
});

export const loadPortingJobArtifactsEnd = path => dispatch => dispatch({
    type: LOAD_PORTING_JOBS_ARTIFACTS_END,
    path
});

export const loadPortingJobArtifacts = path => dispatch => {
    dispatch(loadPortingJobArtifactsStart(path));

    return API.porting.loadPortingJobArtifacts(path)
        .then(response => {
            dispatch(!response.error ?
                loadPortingJobArtifactsEnd(response.data) :
                addFlashMessage({
                    type: 'error',
                    content: response.error
                }));

            return response.data;
        })
        .catch(response => dispatch(addFlashMessage({
            type: 'error',
            content:`Something went wrong when artifacts loading. Response: ${response}`
        })));
};

export const loadPortingJobs = () => dispatch => {
    dispatch(loadPortingJobsStart());

    return API.porting.loadJobs()
        .then(response => {
            dispatch(!response.error ?
                loadPortingJobsEnd(response.data) :
                addFlashMessage({
                    type: 'error',
                    content: response.error
                }));

            return response.data;
        })
        .catch(response => dispatch(addFlashMessage({
            type: 'error',
            content:`Something went wrong when jobs loading. Response: ${response}`
        })));
};

export const updatePortingJobs = job => dispatch => dispatch({
    type: ADD_PORTING_JOB,
    job
});

export const portPullRequest = params => dispatch => {
    dispatch(portingStart(params));

    return API.porting.port(params)
        .then(response => {
            dispatch(!response.error ?
                portingEnd(response.result) :
                addFlashMessage({
                    type: 'error',
                    content: response.error
                }));

            return response.result;
        })
        .catch(response => dispatch(addFlashMessage({
            type: 'error',
            content:`Something went wrong when porting start. Response: ${response}`
        })));
};