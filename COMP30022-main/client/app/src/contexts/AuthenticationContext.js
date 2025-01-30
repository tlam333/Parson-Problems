import {createContext} from 'react'
import { useReducer } from 'react';

export const AuthenticationContext = createContext(null);
export const AuthenticationReducer = (state, action) =>{
    if (action.type == "REGISTER" || action.type == "LOGIN") {
        return {user: "AUTHENTICATED", payload: action.payload}
    } else {
        // if loggged out, the state returned state will be null again
        return {user: null, payload: null}
    }
}

export const AuthenticationProvider  = ({children}) => {
    let [state, dispatch] = useReducer(AuthenticationReducer, {user: null})
    
    // dispatch function is called as dispatch({type: type eg. if login, logout or register payload:response response from fetch})
    return (
    <AuthenticationContext.Provider value={{state, dispatch}}>
        {children}
    </AuthenticationContext.Provider>)
}