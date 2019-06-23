import { SET_USER_INFO, SET_CLASSIFY_COUNT } from './actionType';
const preState = {
    userInfo:'',
    classifyCount: [],
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
    return state;
}
export default reducer;