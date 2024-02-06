import * as actionTypes from './actionTypes';

//import axios from 'axios';


export const setLocation=(x,y)=>{
    
    return {
        
        type: actionTypes.SET_PLAYER_CORD,
        locx: x,
        locy: y
    }
}

export const setLocationX=x=>{
    
    return {
        
        type: actionTypes.SET_PLAYER_CORDX,
        locx: x
    }
}

export const setLocationY=y=>{
    
    return {
        
        type: actionTypes.SET_PLAYER_CORDY,
        locy: y
    }
}

//export const setLevel=(level)=>{
//    
//    return {
//        
//        type: actionTypes.SET_LATEST_LEVEL,
//       level: level
//    }
//}

export const setShopStatus=()=>{
    
    return {
        
        type: actionTypes.SET_SHOP_STATUS
    }
}

export const setLoaded=(level)=>{
    
    return {
        
        type: actionTypes.SET_LOADED,
        level: level
    }
}

export const setLoadDone=()=>{
    
    return {
        
        type: actionTypes.SET_LOAD_DONE
    }
}

export const setGameStart=()=>{
    
    return {
        
        type: actionTypes.SET_GAME_STARTED
    }
}

export const setGameOver=()=>{
    
    return {
        
        type: actionTypes.SET_GAME_OVER
    }
}

export const setMobDirection=(dir)=>{
    
    return {
        
        type: actionTypes.SET_MOBILE_DIRECTION,
        direction:dir
    }
}





//export const authSuccess=(token, userId)=>{
//    
//    return {
//        
//        type: actionTypes.AUTH_SUCCESS,
//        idToken: token,
//        userId: userId
//    }
//}
//
//export const authFail=(error)=>{
//    
//    return {
//        
//        type: actionTypes.AUTH_FAIL,
//        error: error
//    }
//}
//
//export const logout=()=>{
//    
//    localStorage.removeItem('token');
//    localStorage.removeItem('expiration');
//    localStorage.removeItem('id');
//    localStorage.removeItem('user');
//    localStorage.removeItem('fetched');
//    localStorage.removeItem('existing');
//    
//    return{
//        
//        type: actionTypes.AUTH_LOGOUT
//    }
//}
//
//export const checkAuthTimeout=(expirationTime)=>{
//    
//    return{
//        
//        type: actionTypes.AUTH_CHECK_TIMEOUT,
//        expirationTime: expirationTime
//    }
//    
////    return dispatch=>{
////        
////        setTimeout(()=>{
////            
////            dispatch(logout());
////        }, expirationTime*1000) //expirationTime is response.data.expiresIn (see auth function below). expiresIn property has a value of time in seconds. setTimeout function however expects a value in milliseconds so 3600 seconds gets converted into 3,6 seconds here. You need to multiply if you want a longer logout time here (though usually you get logout right after you click logout)
////    }
//}
//
//export const auth=(email, password, isSignup)=>{
//    
//    return dispatch=>{
//        
//        dispatch(authStart());
//        
//        const authData={ // NOTE that this structure and property names are not optional, but they are dictated here: https://firebase.google.com/docs/reference/rest/auth
//            
//            email: email,
//            password: password,
//            returnSecureToken: true
//        }
//        
//        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZey6bg2e4XKRJxrV8UWtir7_Uds3vVSY';
//        
//        if(!isSignup){
//            
//            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZey6bg2e4XKRJxrV8UWtir7_Uds3vVSY';
//        }
//        
//        axios.post(url, authData).then(response=>{
//            
//          
//            const expirationTime=new Date(new Date().getTime() + (response.data.expiresIn*1000));//without wrapping (passing arguments) the calculation with New Date() we would not store a date but a time value
//            localStorage.setItem('token', response.data.idToken);
//            localStorage.setItem('expiration', expirationTime);
//            localStorage.setItem('id', response.data.localId);
//            dispatch(authSuccess(response.data.idToken, response.data.localId));
//            dispatch(checkAuthTimeout(response.data.expiresIn));
//            
//        }).catch(err=>{
//            
//           
//            dispatch(authFail(err.response.data.error));
//        })
//    }
//}
//
//export const setAuthRedirectPath=(path)=>{
//    
//    return{
//        
//        type: actionTypes.SET_AUTH_REDIRECT_PATH,
//        path: path
//    }
//}
//
//export const setRegistration=(user)=>{
//    
//    localStorage.setItem('user', user);
//    
//    return{
//        
//        type: actionTypes.REGISTRATION,
//        user: user
//    }
//}
//
//
//export const authCheckState=()=>{
//    
//    return dispatch=>{
//        
//        const token=localStorage.getItem('token');
//        
//        
//        
//        if(!token){
//      
//            dispatch(logout());
//        } else {
//            
//            const expirationDate=new Date(localStorage.getItem('expiration')); //we are wrapping this with new Date() because the data we receive from localStorage is a string and we want to use Date object.
//            
//            if(expirationDate>new Date()){
//                
//                const userId=localStorage.getItem('id');
//                
//                dispatch(authSuccess(token, userId));
//                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)) // getTime() returns time in milliseconds
//            } else {
//              
//                dispatch(logout());
//            }
//        }
//    }
//}

//export const authCheckState = () => {
//    return dispatch => {
//        const token = localStorage.getItem('token');
//        if (!token) {
//            dispatch(logout());
//        } else {
//            const expirationDate = new Date(localStorage.getItem('expirationDate'));
//            if (expirationDate>new Date()) {
//                dispatch(logout());
//            } else {
//                const userId = localStorage.getItem('userId');
//                dispatch(authSuccess(token, userId));
//                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
//            }   
//        }
//    };
//};

//export const auth = (email, password, isSignup) => {
//    return dispatch => {
//        dispatch(authStart());
//        const authData = {
//            email: email,
//            password: password,
//            returnSecureToken: true
//        };
//        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDjd3qEhVF4DXS7G9CjlRC6NHKiMlfOpmo';
//        if (!isSignup) {
//            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDjd3qEhVF4DXS7G9CjlRC6NHKiMlfOpmo';
//        }
//        axios.post(url, authData)
//            .then(response => {
//                
////                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
////                localStorage.setItem('token', response.data.idToken);
////                localStorage.setItem('expirationDate', expirationDate);
////                localStorage.setItem('userId', response.data.localId);
////                dispatch(authSuccess(response.data.idToken, response.data.localId));
////                dispatch(checkAuthTimeout(response.data.expiresIn));
//                    dispatch(authSuccess(response.data));   
//            })
//            .catch(err => {
//         
//            dispatch(authFail(err));
////                dispatch(authFail(err.response.data.error));
//            });
//    };
//};


//Hi all!

//The auth urls shown on the Firebase page (https://firebase.google.com/docs/reference/rest/auth) have changed some days ago. Now you can use these slightly shorter ones as well:
//
//Sign up
//
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
//
//Sign in
//
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

//access API KEY info in Firebase, top left corner, gear icon, project settings, 
//"WEB API KEY" (in the course video it was in top right corner, under "web setup"). 
//The beginning of this address can be found at https://firebase.google.com/docs/reference/rest/auth,under "endpoint"

//Please note: The former urls like in Max' videos and zips are still valid, and you can still use them, if you want to be in harmony with the videos.
//
//Sign up
//
//https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]
//
//Sign in
//
//https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]