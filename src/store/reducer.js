import { SET_USER_INFO } from './actionType';
const preState = {
    userInfo:''
}
const reducer = (state = preState, action) => {
    if(action.type === SET_USER_INFO){
        let newState = Object.assign({}, preState);
        newState.userInfo = action.value;
        return newState;
    }
    return state;
}
export default reducer;