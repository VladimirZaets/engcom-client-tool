import API from '../api';
import { addFlashMessage } from "./messages";
import {
    LOAD_USER_ORGANIZATIONS_INFO_START,
    LOAD_USER_ORGANIZATIONS_INFO_END, SET_USER_TOKEN
} from '../types';

export const loadUserOrganizationsInfoStart = () => dispatch => dispatch({
    type: LOAD_USER_ORGANIZATIONS_INFO_START

});

export const loadUserOrganizationsInfoEnd = userOrganizationsInformation => dispatch => dispatch({
    type: LOAD_USER_ORGANIZATIONS_INFO_END,
    userOrganizationsInformation
});

export const setUserToken = token => dispatch => dispatch({
    type: SET_USER_TOKEN,
    token
});

export const loadUserOrganizationsInfo = () => dispatch => {
    dispatch(loadUserOrganizationsInfoStart());

    return API.user.loadUserOrganizations()
        .then(response => {
            dispatch(!response.error ?
                loadUserOrganizationsInfoEnd(response) :
                addFlashMessage({
                    type: 'error',
                    content: response.error
                }));

            return response;
        })
        .catch(response => dispatch(addFlashMessage({
            type: 'error',
            content:`Something went wrong while load user organizations loading. Response: ${response}`
        })));
};