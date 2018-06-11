import Cookies from 'universal-cookie';
import {
    LOAD_AUTHORIZATION_URL_START,
    LOAD_AUTHORIZATION_URL_END
} from '../types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_AUTHORIZATION_URL_END:
            return {
                ...state,
                authorizationUrl: action.url.loginUrl
            };

        case LOAD_AUTHORIZATION_URL_START:
        default:
            return state;
    }
};
