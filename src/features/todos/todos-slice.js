import { createSelector } from 'reselect'

import { client } from '../../api/client'
import { StatusFilters } from '../filters/filters-slice'

const initialState = {
  status: 'idle',
  entities: {},
}

const selectTodoEntities = state => state.todos.entities

export const selectTodos = createSelector(selectTodoEntities, entities => 
  Object.values(entities)
)
export const selectTodoById = (state, todoId) => {
  return selectTodos(state)[todoId]
}

export const selectFilteredtodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const showAllCompletion = filters.status === StatusFilters.All
    if (showAllCompletion && filters.colors.length === 0) {
      return todos
    }
    const completedStatus = filters.status === StatusFilters.Completed
    return todos.filter(todo => {
      const statusMatches =
        showAllCompletion || todo.completed === completedStatus
      const colorMatches =
        filters.colors.length === 0 || filters.colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredtodos,
  (filteredTodos) => filteredTodos.map(todo => todo.id)
)

export const selectTodoIds = createSelector(
  selectTodos,
  (todos) => todos.map((todo) => todo.id)
)

export const fetchTodos = () => async (dispatch) => {
  dispatch(todosLoading())
  const response = await client.get('/fakeApi/todos')
  dispatch(todosLoaded(response.todos))
}

export const saveNewTodo = (text) => {
  const saveNewTodoThunk = async (dispatch, getState) => {
    const initialTodo = { text }
    const response = await client.post('fakeApi/todos', { todo: initialTodo })
    dispatch(todoAdded(response.todo))
  }
  return saveNewTodoThunk
}

export const todosLoaded = (todos) => ({
  type: 'todos/todosLoaded',
  payload: todos,
})

export const todoAdded = (todo) => ({
  type: 'todos/todoAdded',
  payload: todo,
})

export const todosLoading = () => ({
  type: 'todos/todosLoading',
  payload: 'loading',
})

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'todos/todosLoading': {
      return {
        ...state,
        status: action.payload,
      }
    }
    case 'todos/todosLoaded': {
      const newEntities = {}
      action.payload.forEach((todo) => {
        newEntities[todo.id] = todo
      })
      return {
        ...state,
        status: 'idle',
        entities: newEntities,
      }
    }
    case 'todos/todoAdded': {
      return {
        ...state,
        status: 'idle',
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload,
        },
      }
    }
    case 'todos/todoToggled': {
      const todoId = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            completed: !todo.completed,
          },
        },
      }
    }
    case 'todos/colorSelected': {
      const { todoId, color } = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            color,
          },
        },
      }
    }
    case 'todo/deleted': {
      const newEntities = { ...state.enties }
      delete newEntities[action.payload]
      return {
        ...state,
        entities: newEntities,
      }
    }
    case 'todo/allCompleted': {
      const newEntities = { ...state.entities }
      Object.values(newEntities).forEach(todo => {
        newEntities[todo.id] = {
          ...todo,
          completed: true
        }
      })
      return {
        ...state,
        entities: newEntities,
      }
    }
    case 'todo/completedCleared': {
      const newEntities = { ...state.entities }
      Object.values(newEntities).forEach(todo => {
        if(todo.completed) {
          delete newEntities[todo.id]
        }
      })
      return {
        ...state,
        entities: newEntities,
      }
    }
    default:
      return state
  }
}
