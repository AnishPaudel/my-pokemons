import {applyMiddleware, createStore} from 'redux';
import reducers from './indexReducer';
import logger from 'redux-logger'


import {composeWithDevTools} from 'redux-devtools-extension'

import promiseMiddleware from "redux-promise"




const configeStore=()=> {
    const store = createStore(reducers,
        composeWithDevTools(applyMiddleware(
            promiseMiddleware,
            logger
        
        ))
    );

    return store;

}

 const store = configeStore();

 export default store