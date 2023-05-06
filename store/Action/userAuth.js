// src/redux/actions/authActions.js
import { LOGIN_SUCCESS, LOGOUT } from './type';

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});


export const logout = () => ({
    type: LOGOUT,
});
