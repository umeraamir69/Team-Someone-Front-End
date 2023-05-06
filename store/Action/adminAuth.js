// src/redux/actions/authActions.js
import { ALOGIN_SUCCESS, ALOGOUT } from './Atype';

export const admimloginSuccess = (user) => ({
    type: ALOGIN_SUCCESS,
    payload: user,
});


export const adminlogout = () => ({
    type: ALOGOUT,
});
