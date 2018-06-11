import {
    LOAD_USER_ORGANIZATIONS_INFO_START,
    LOAD_USER_ORGANIZATIONS_INFO_END,
    SET_USER_TOKEN
} from '../types';

let defaultState = {
    userOrganizationsInformation: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case LOAD_USER_ORGANIZATIONS_INFO_END:
            return {
                ...state,
                userOrganizationsInformation: action.userOrganizationsInformation
            };
        case LOAD_USER_ORGANIZATIONS_INFO_START:
        default:
            return state;
    }
};
