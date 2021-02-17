import React from 'react'
import { Provider } from 'react-redux'
import Footer from './components/footer'
import Header from './components/header'
import TodosList from './components/todos-list'

import store from './store'

function App() {
  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>
      <div>
        <p>
          Clicked: <span id="value">0</span> times
          <button id="increment">+</button>
          <button id="decrement">-</button>
          <button id="incrementIfOdd">Increment if odd</button>
          <button id="incrementAsync">Increment async</button>
        </p>
        <main>
          <section className="medium-container">
            <h2>Todos</h2>
            <div className="todoapp">
              <Provider store={store}>
                <Header />
                <TodosList />
                <Footer />
              </Provider>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
