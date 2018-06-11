import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../types';

export const addFlashMessage = message => dispatch => dispatch({
    type: ADD_FLASH_MESSAGE,
    message
});

export const deleteFlashMessage = id => dispatch => dispatch({
    type: DELETE_FLASH_MESSAGE,
    id
});
