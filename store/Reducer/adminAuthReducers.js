// src/redux/reducers/adminAuthReducers.js
import { ALOGIN_SUCCESS, ALOGOUT } from '../Action/Atype';

const initialState = {
    adminIsAuthenticated: false,
    adminUser: null
};

const adminAuthReducers = (state = initialState, action) => {
    switch (action.type) {
        case ALOGIN_SUCCESS:
            return {
                ...state,
                adminIsAuthenticated: true,
                adminUser: action.payload
            };
        case ALOGOUT:
            return {
                ...state,
                adminIsAuthenticated: false,
                adminUser: null
            };
        default:
            return state;
    }
};

export default adminAuthReducers;
