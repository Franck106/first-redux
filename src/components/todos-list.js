import React from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './todo-item'
import { selectFilteredTodoIds } from '../features/todos/todos-slice'


const TodosList = () => {
  const todoIds = useSelector(selectFilteredTodoIds)
  console.log('todolist', todoIds)
  const loadingStatus = useSelector(state => state.todos.status)

  if(loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader"/>
      </div>
    )
  }

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodosList
