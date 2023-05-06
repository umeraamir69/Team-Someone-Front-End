// src/redux/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGOUT } from '../Action/type';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};

export default authReducer;
