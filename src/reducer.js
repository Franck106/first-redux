import { combineReducers } from 'redux';
import { counterReducer } from './features/counter/counter-slice';

import { filtersReducer } from "./features/filters/filters-slice"
import { todosReducer } from "./features/todos/todos-slice"

const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filtersReducer,
    counter: counterReducer,
})

export default rootReducer
