// import "../styles/login.css"
const Login = () => {
    return (
        <div id="login-background">
            <div id="header">
                <h1 id="heading">Login</h1>
            </div>
            
            <div className="login-form-container">
                <form action="/api/login" method="POST">
                    <label htmlFor="user-email-input">Username or Email</label>
                    <input id="user-email-input" type="text" name="user"></input>
                    <label htmlFor="password-input">Password</label>
                    <input id="password-input" type="text" name="password"></input>
                    <button id="login-submit-button">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default Login