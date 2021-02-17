const initialState = {
  counter: 0,
}

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'counter/incremented':
      return {
        ...state,
        counter: state.counter + 1,
      }
    case 'counter/decremented':
      return {
        ...state,
        counter: state.counter - 1,
      }
    default:
      return state
  }
}
