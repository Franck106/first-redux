import { createStore, /*compose,*/ applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducer';
import { sayHiOnDispatch, includeMeaningOfLife } from './exampleAddons/enhancers';
import { print1, print2, print3, loggerMiddleware } from './exampleAddons/middleware';

let preloadedState;
const persistedTodosString = localStorage.getItem('todos');

if(persistedTodosString) preloadedState = {todos: JSON.parse(persistedTodosString)};

const composedEnhanser = composeWithDevTools(
    sayHiOnDispatch, 
    includeMeaningOfLife, 
    applyMiddleware(print1, print2, print3, loggerMiddleware, thunkMiddleware)
);

const store = createStore(rootReducer, preloadedState, composedEnhanser);

export default store