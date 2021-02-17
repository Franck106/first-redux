import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { saveNewTodo } from '../features/todos/todos-slice'

const Header = () => {

  const dispatch = useDispatch()

  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')

  const handleKeyDown = async e => {
    const trimmedText = e.target.value.trim()
    // If the user pressed the Enter key:
    if (e.which === 13 && trimmedText) {
      // Dispatch the "todo added" action with this text
      //dispatch({ type: 'todos/todoAdded', payload: trimmedText })
      setStatus('loading')
      await dispatch(saveNewTodo(trimmedText))
      // And clear out the text input
      setText('')
      setStatus('idle')
    }
  }

  let isLoading = status === 'loading'
  let placeholder = isLoading ? '' : 'What needs to be done?'
  let loader = isLoading ? <div className="loader"/> : null

  const handleChange = (e) => setText(e.target.value)

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder={placeholder}
        autoFocus={true}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  )
}

export default Header
