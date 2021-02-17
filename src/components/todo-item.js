import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as TimesSolid } from '../features/todos/times-solid.svg'
import { availableColors, capitalize } from '../features/filters/colors'
import { selectTodoById } from '../features/todos/todos-slice'


const TodoListItem = ({ id }) => {
  
  const todo =  useSelector(state => selectTodoById(state, id))
  const { text, completed, color } = todo

  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    dispatch({ type: 'todos/todoToggled', payload: todo.id })
  }

  const handleColorChanged = (e) => {
    const color = e.target.value
    dispatch({ type: 'todos/colorSelected', payload: {todoId: id, color: color} })
  }

  const handelDelete = () => {
    dispatch({type: 'todo/deleted', payload: { todoId: id }})
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handelDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
