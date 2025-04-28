import { createContext, useContext, useReducer } from "react";

const NameContexts = createContext()

export const types = Object.freeze({
    set_name: 'SET_NAME',
    clear_name: 'CLEAR_NAME'
})

const initialState = {
    name: localStorage.getItem('name') || ''
}

function nameReducer (state, action) {
    switch (action.type) {
        case types.set_name:
            localStorage.setItem('name', action.payload)
            return {
                ...state,
                name: action.payload
            }
         case types.clear_name:
            localStorage.removeItem('name')
            return {
                ...state,
                name: ''
            }
        default:
            return state
    }
}

export const NameProvider = ( {children}) => {
  const [state, dispatch] =  useReducer(nameReducer, initialState)

    return (
        <NameContexts.Provider value = {[state, dispatch]}>
            {children}
        </NameContexts.Provider>
    )
}

export const useName = () => useContext(NameContexts)