import API from '../api';
import {
    LOAD_PULL_REQUEST_LIST_START,
    LOAD_PULL_REQUEST_LIST_END,
} from '../types';
import {addFlashMessage} from "./messages";
import Cookies from 'universal-cookie';

export const loadPullRequestListStart = () => dispatch => dispatch({
    type: LOAD_PULL_REQUEST_LIST_START,
});

export const loadPullRequestListEnd = pullRequestList => dispatch => dispatch({
    type: LOAD_PULL_REQUEST_LIST_END,
    pullRequestList
});

export const loadPullRequestList = () => dispatch => {
    dispatch(loadPullRequestListStart());
    return API.pullRequests.loadPullRequestList()
        .then(response => {
            dispatch(!response.error ?
                loadPullRequestListEnd(response) :
                addFlashMessage({
                    type: 'error',
                    content: response.error
                }));

            return response;
        })
        .catch(response => dispatch(addFlashMessage({
            type: 'error',
            content:`Something went wrong when Pull Request list loading. Response: ${response}`
        })));
};


export const openPullRequest = data => dispatch => {
    const cookies = new Cookies();

    cookies.set(
        'deployment_access_token',
        data.deployment['access_token'],
        {domain: '.' + document.location.hostname}
    );
    document.location.href = 'http://' + data.deployment['base_url'];
};
