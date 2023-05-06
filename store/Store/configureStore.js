// src/redux/store/configureStore.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducer/rootReducer';

const isClient = typeof window !== 'undefined';
const composeEnhancers = isClient ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const configureStore = () => {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
};

export default configureStore;






