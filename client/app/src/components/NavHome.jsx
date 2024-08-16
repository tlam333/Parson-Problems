import "../styles/homePage.css"
import {useNavigate} from "react-router-dom"

const NavHome = () =>{
    let navigate = useNavigate();
    function clickLogin(){
        let path = `/Login`;
        navigate(path);
    }

    function clickRegister(){
        let path = `/Register`;
        navigate(path);
    }

    return (
        <div className="nav-home">
            <nav className="nav-home-button-container">
                <button className="login" onClick={clickLogin}>Login</button>
                <button className="register" onClick={clickRegister}>Register</button>
            </nav>
        </div>  
    )
    
}

export default NavHome