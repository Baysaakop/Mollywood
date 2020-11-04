import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import index from './redux/reducers/index';

const loggerMiddlaware = store => {
    return next => {
        return action => {
            console.log("MyLoggerMiddleware: Dispatching ==> ", action);
            console.log("MyLoggerMiddleware: State BEFORE : ", store.getState());
            const result = next(action);
            console.log("MyLoggerMiddleware: State AFTER : ", store.getState());
            return result;
        };
    };
};
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    index,
})
  
const middlewares = [loggerMiddlaware, thunk];
  
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>    
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
