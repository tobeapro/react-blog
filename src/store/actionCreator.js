import { SET_USER_INFO } from './actionType';
export const setUserInfo = (value) => {
    return {
        type:SET_USER_INFO,
        value
    }
}