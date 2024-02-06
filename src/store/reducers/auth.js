import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState={
    
    token: null, //token is always the same for each user
    userId: null, //userId is always the same for each user
    error: null,
    loading: false,
    authRedirectPath: '/',
    user: null,
    expiration: null
}

const reducer=(state=initialState, action)=>{
    
    switch (action.type){
            
        case actionTypes.AUTH_START:
            
        return updateObject(state, {error: null, loading: true})
            

        case actionTypes.AUTH_SUCCESS:
            
         return updateObject(state, {
             
             token: action.idToken,
             userId: action.userId,
             error: null,
             loading:false
         })

        case actionTypes.AUTH_FAIL:

        return updateObject(state, {
            
            error: action.error,
            loading:false
        })
            
        case actionTypes.AUTH_LOGOUT://the app will give access to views only when the user is logged in (token an id exist) and access will be restricted once the token and id are null... this logic is put into the components/views

        return updateObject(state, {
            
            token: null,
            userId: null,
            user: null
        })
            
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            
        return updateObject(state, {
            
            authRedirectPath: action.path
        })
            
//        case actionTypes.REGISTRATION:
//            
//        return updateObject(state, {
//            
//            user: action.user
//        })
            
        case actionTypes.AUTH_CHECK_TIMEOUT:
            
        return updateObject(state, {
            
            expiration: action.expirationTime
        })
        

        default:
        return state;  
            
    }
    
}
export default reducer;