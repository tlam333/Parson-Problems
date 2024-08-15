import '../styles/navMenu.css';
import React, {useState} from 'react';

const NavMenu = () =>{
    const [isToggled, setIsToggled] = useState(false);
    const [isActive, setMenuClass] = useState(false);

    function handleHamburgerClick() {
        setIsToggled(!isToggled);
        setMenuClass(!isActive);
    }   

    return (
        <div>
            <div className={`off-screen-menu ${isActive ? "active" : null}`} >
                <li>Page Redirect</li>
                <li>Page Redirect</li>
                <li>Page Redirect</li>
            </div>

            <nav>
                <div className="profile">
                
                </div>

                <div className={`hamburger-menu ${isToggled ? "active" : null}`} onClick = {handleHamburgerClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </div>
    )
}

export default NavMenu