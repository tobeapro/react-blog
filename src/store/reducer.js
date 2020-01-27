import { SET_USER_INFO, SET_CLASSIFY_COUNT, SET_COMMENT_ACCOUNT } from './actionType';
const preState = {
    userInfo:'',
    classifyCount: [],
    commentAccount:{
        name:'',
        email:''
    },
    total:0
}
const reducer = (state = preState, action) => {
    if(action.type === SET_USER_INFO){
        let newState = Object.assign({}, state);
        newState.userInfo = action.value;
        return newState;
    }
    if(action.type === SET_CLASSIFY_COUNT){
        let newState = Object.assign({}, state);
        newState.classifyCount = action.value?action.value.groups:[];
        newState.total = action.value?action.value.total:0;
        return newState;
    }
    if(action.type === SET_COMMENT_ACCOUNT){
        let newState = Object.assign({}, state);
        newState.commentAccount.name = action.value?action.value.name:'';
        newState.commentAccount.email = action.value?action.value.email:'';
        return newState;
    }
    return state;
}
export default reducer;