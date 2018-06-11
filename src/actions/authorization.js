import API from '../api';
import { LOAD_AUTHORIZATION_URL_START, LOAD_AUTHORIZATION_URL_END} from '../types';
import { addFlashMessage } from "./messages";
import { setUserToken } from "./user";

export const loadAuthorizationUrlStart = () => dispatch => dispatch({
    type: LOAD_AUTHORIZATION_URL_START
});

export const loadAuthorizationUrlEnd = data => dispatch => {
    dispatch({
        type: LOAD_AUTHORIZATION_URL_END,
        //url: data.loginUrl
        url: data
    });

    setUserToken(data.apiKey)
};

export const loadAuthorizationUrl = () => dispatch => {
    dispatch(loadAuthorizationUrlStart());

    return API.authorization.loadAuthorizationUrl()
        .then(response => {
            dispatch(!response.error ?
                loadAuthorizationUrlEnd(response.data) :
                addFlashMessage({
                    type: 'error',
                    content: response.error
                }));

            return response.data;
        })
        .catch(response => dispatch(addFlashMessage({
            type: 'error',
            content:`Something went wrong while load user authorization url. Response: ${response}`
        })));
};
