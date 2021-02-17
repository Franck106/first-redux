import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { saveNewTodo } from '../features/todos/todos-slice'

const Header = () => {

  const dispatch = useDispatch()

  const [text, setText] = useState('')

  const handleKeyDown = e => {
    const trimmedText = e.target.value.trim()
    // If the user pressed the Enter key:
    if (e.which === 13 && trimmedText) {
      // Dispatch the "todo added" action with this text
      //dispatch({ type: 'todos/todoAdded', payload: trimmedText })
      dispatch(saveNewTodo(trimmedText))
      // And clear out the text input
      setText('')
    }
  }

  const handleChange = (e) => setText(e.target.value)

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default Header
