import {
    INITIALIZATION_TOOLS,
} from '../types';

export default function topContributors(state = {}, action = {}) {
    switch (action.type) {
        case INITIALIZATION_TOOLS:
            return {
                ...state,
                tools: action.tools
            };
        default:
            return state;
    }
}