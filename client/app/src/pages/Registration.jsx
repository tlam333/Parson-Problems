import "../styles/login.css"
import {useRegistration} from "../hooks/useRegistration.js"
import {useState} from 'react'

const Registration = () => {
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const {register, isLoading} = useRegistration()

    const handleRegistration = async (e) => {
        e.preventDefault()

        await register(email, password)
    }

    return (
        <div id="login-background">
            <div id="header">
                <h1 id="heading">Register</h1>
            </div>

            <div className="login-form-container">
                <form onSubmit={handleRegistration}>
                    <label>Email</label>
                    <input id="user-email-input" 
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                    />
                    <label>Password</label>
                    <input id="password-input" 
                        type="password" 
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                    />

                    <button id="login-submit-button" disabled={isLoading}>Submit</button>
                </form>
            </div>
        </div>

    )
}

export default Registration