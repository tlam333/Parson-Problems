import "../styles/login.css"
const Registration = () => {
    return (
        <div id="login-background">
            <div id="header">
                <h1 id="heading">Register</h1>
            </div>

            <div className="login-form-container">
                <form action="/api/register" method="POST">
                    <label htmlFor="user-email-input">Email</label>
                    <input id="user-email-input" type="text" name="user"></input>
                    <label htmlFor="password-input">Password</label>
                    <input id="password-input" type="text" name="password"></input>
                    <button id="login-submit-button">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default Registration