// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import userAuthReducers from './userAuthReducers'
import adminAuthReducers from './adminAuthReducers'


const rootReducer = combineReducers({
    auth: userAuthReducers,
    adminAuth: adminAuthReducers
});

export default rootReducer;