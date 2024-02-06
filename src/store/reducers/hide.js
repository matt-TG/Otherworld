import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';


const initialState={
    
    hideInv: false,
    mobile: false,
    signInHide: false
}

const reducer=(state=initialState, action)=>{
    
    switch (action.type){
            
        case actionTypes.SET_HIDE_INV:
            
            return updateObject(state, {hideInv: !state.hideInv})
                
            
        case actionTypes.SET_MOBILE:
            
             return updateObject(state, {mobile: !state.mobile})
                
            
        case actionTypes.SET_HIDE_SIGNIN:
            
             return updateObject(state, {signInHide: !state.signInHide})
       
            
            
        default:
            return state;
    }
}

export default reducer;