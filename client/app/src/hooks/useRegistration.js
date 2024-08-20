import {useState} from 'react'
import {useAuthContext} from './useAuthContext.js'

export const useRegistration = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()

    const register = async (email, password) => {
        setIsLoading(true)

        const response = await fetch('API LINK HERE', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        // expected response to have a boolean ok status in attributte
        if (!response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {register, isLoading}
}