import { combineReducers } from 'redux';
import { counterReducer } from './features/counter/counter-slice';

import { filtersReducer } from "./features/filters/filters-slice"
import { todoReducer } from "./features/todos/todos-slice"

const rootReducer = combineReducers({
    todos: todoReducer,
    filters: filtersReducer,
    counter: counterReducer,
})

export default rootReducer
