import { client } from '../../api/client'

const initialState = [];

export const fetchTodos = async (dispatch, getState) => {
  const response = await client.get('/fakeApi/todos')
  const stateBefore = getState()
  console.log('before: ', stateBefore)
  dispatch({ type: 'todos/todosLoaded', payload: response.todos })
  const stateAfter = getState()
  console.log('after: ', stateAfter)
}

export const saveNewTodo = (text) => {
  const saveNewTodoThunk = async (dispatch, getState) => {
    const initialTodo = { text }
    const response = await client.post('fakeApi/todos', { todo: initialTodo })
    dispatch({ type: 'todos/todoAdded', payload: response.todo })
  }
  return saveNewTodoThunk
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'todos/todosLoaded': {
      return action.payload
    }
    case 'todos/todoAdded': {
      return [
        ...state,
        action.payload
      ]
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) return todo
        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/colorSelected': {
      return state.map((todo) => {
        if (todo.id !== action.payload.todoId) return todo
        return {
          ...todo,
          color: action.payload.color,
        }
      })
    }
    case 'todo/deleted': {
      return state.filter((todo) => {
        return !todo.id === action.payload.todoId
      })
    }
    case 'todo/allCompleted': {
      return state.map((todo) => {
        return {
          ...todo,
          completed: true,
        }
      })
    }
    case 'todo/completedCleared': {
      return state.filter((todo) => {
        return !todo.completed
      })
    }
    default:
      return state
  }
}
