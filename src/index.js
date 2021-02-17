import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'
import store from './store'
import './api/server'
import { fetchTodos } from './features/todos/todos-slice'

console.log('initial state: ', store.getState())
store.dispatch(fetchTodos)

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
)
