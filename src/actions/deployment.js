import API from '../api';
import {
    PULL_REQUEST_DEPLOY_START,
    PULL_REQUEST_DEPLOY_END,
} from '../types';
import {addFlashMessage} from "./messages";

export const pullRequestDeployStart = params => dispatch => dispatch({
    type: PULL_REQUEST_DEPLOY_START,
    params
});

export const pullRequestDeployEnd = params => dispatch => dispatch({
    type: PULL_REQUEST_DEPLOY_END,
    params
});

export const pullRequestDeploy = data => dispatch => {
    pullRequestDeployStart(data);

    API.deployment.deployPullRequest(data)
        .then(response => {
            dispatch(!response.error ?
                pullRequestDeployEnd(response) :
                addFlashMessage({
                    type: 'error',
                    content: response.error
                }));

            return response;
        })
        .catch(response => dispatch(addFlashMessage({
            type: 'error',
            content:`Something went wrong when PR deploing. Response: ${response}`
        })));
};
