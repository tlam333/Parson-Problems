import {AuthContext} from "../contexts/AuthContext"
import {useContext} from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    return context;
}