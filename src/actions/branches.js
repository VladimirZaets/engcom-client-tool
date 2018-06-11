import API from '../api';
import { addFlashMessage } from "./messages";
import {
    LOAD_BRANCHES_START,
    LOAD_BRANCHES_END
} from '../types';

export const loadBranchesStart = params => dispatch => dispatch({
    type: LOAD_BRANCHES_START,
    params

});

export const loadBranchesEnd = branches => dispatch => dispatch({
    type: LOAD_BRANCHES_END,
    branches
});

export const loadBranches = data => dispatch => {
    dispatch(loadBranchesStart(data));

    return API.branches.loadBranches(data)
        .then(response => {
            dispatch(!response.data.error ?
                loadBranchesEnd(response.data.result) :
                addFlashMessage({
                    type: 'error',
                    content: response.data.error
                }));

            return response.data;
        })
        .catch(response => dispatch(addFlashMessage({
            type: 'error',
            content:`Something went wrong while target branches retrieving. Response: ${response}`
        })));
};