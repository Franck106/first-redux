//import { availableColors } from './colors'

export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: 'all',
  colors: [],
}

export const colorFilterChanged = (color, changeType) => {
  return {
    type: 'filters/colorFilterChanged',
    payload: {color, changeType}
  }
}

export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        status: action.payload,
      }
    }
    case 'filters/colorFilterChanged': {
        if(action.payload.changeType === 'added') {
            return {
                ...state,
                colors: [
                    ...state.colors,
                    action.payload.color,
                ]
            }
        }
        if(action.payload.changeType === 'removed') {
            return {
                ...state,
                colors: state.colors.filter((color) => action.payload.color !== color),
            }
        }
        return state;
    }
    default:
      return state
  }
}
