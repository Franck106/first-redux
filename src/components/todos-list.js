import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './todo-item'

const selectTodoIds = state => state.todos.map(todo => todo.id)

const TodosList = () => {
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodosList