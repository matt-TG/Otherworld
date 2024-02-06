import * as actionTypes from "./actionTypes";

import axios from "axios";

import { REACT_APP_ROOTAPI } from "@env";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("id");
  localStorage.removeItem("user");
  localStorage.removeItem("fetched");
  localStorage.removeItem("existing");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };

  //    return dispatch=>{
  //
  //        setTimeout(()=>{
  //
  //            dispatch(logout());
  //        }, expirationTime*1000) //expirationTime is response.data.expiresIn (see auth function below). expiresIn property has a value of time in seconds. setTimeout function however expects a value in milliseconds so 3600 seconds gets converted into 3,6 seconds here. You need to multiply if you want a longer logout time here (though usually you get logout right after you click logout)
  //    }
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      // NOTE that this structure and property names are not optional, but they are dictated here: https://firebase.google.com/docs/reference/rest/auth

      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_APP_ROOTAPI}`;

    if (!isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_APP_ROOTAPI}`;
    }

    axios
      .post(url, authData)
      .then((response) => {
        const expirationTime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        ); //without wrapping (passing arguments) the calculation with New Date() we would not store a date but a time value
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expiration", expirationTime);
        localStorage.setItem("id", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

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

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expiration")); //we are wrapping this with new Date() because the data we receive from localStorage is a string and we want to use Date object.

      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("id");

        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        ); // getTime() returns time in milliseconds
      } else {
        dispatch(logout());
      }
    }
  };
};
