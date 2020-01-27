import { SET_USER_INFO, SET_CLASSIFY_COUNT, SET_COMMENT_ACCOUNT } from './actionType';
export const setUserInfo = (value) => {
    return {
        type:SET_USER_INFO,
        value
    }
}
export const setClassifyCount = (value) => {
    return {
        type:SET_CLASSIFY_COUNT,
        value
    }
}
export const setCommentAccout = value => ({
    type: SET_COMMENT_ACCOUNT,
    value
})