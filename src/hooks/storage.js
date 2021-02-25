import { useReducer, useEffect, useCallback } from 'react'

const initialState = {
  fetching: true,
  items: {}
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataLoaded':
      return { fetching: false, items: action.payload }
    case 'updateItems':
      return { items: action.payload }
    default:
      throw new Error()
  }
}

export const useStorage = (dataName) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const itemsFromStorage = window.localStorage.getItem(dataName)

    // Setting items
    dispatch({ type: 'dataLoaded', payload: JSON.parse(itemsFromStorage) })
  }, [])

  const updateItems = (items) => {
    // Saving changes in storage
    window.localStorage.setItem(dataName, JSON.stringify(items))

    // Saving changes in state
    dispatch({ type: 'updateItems', payload: items })
  }

  return [state.fetching, state.items, updateItems]
}
