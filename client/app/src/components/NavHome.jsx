import {useNavigate} from "react-router-dom"

const NavHome = () => {
    function clickLogin(){
        let path = `/Login`;
        navigate(path);
    }

    function clickRegister(){
        let path = `/Register`;
        navigate(path);
    }

    let navigate = useNavigate();
    
    return (
        <nav className="flex justify-between items-center bg-black p-4">
          {/* Left Button - Orange Button */}
          <div className="flex items-center">
            <button className="btn bg-orange-500 text-white p-6 rounded-xl"></button>
          </div>
          
          {/* Right Menu - Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="text-orange-500 text-4xl">
              &#9776;
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-black border border-orange-500 rounded-box w-52 p-2 shadow"
            >
              <li><a className="text-orange-500 hover:bg-orange-500 hover:text-black" onClick={clickLogin}>Login</a></li>
              <li><a className="text-orange-500 hover:bg-orange-500 hover:text-black" onClick={clickRegister}>Register</a></li>
            </ul>
          </div>
        </nav>
      )
}

export default NavHome

// import "../styles/homePage.css"
// import {useNavigate} from "react-router-dom"
// const NavHome = () =>{
//     let navigate = useNavigate();
//     function clickLogin(){
//         let path = `/Login`;
//         navigate(path);
//     }

//     function clickRegister(){
//         let path = `/Register`;
//         navigate(path);
//     }

//     return (
//         <div className="nav-home">
//             <nav className="nav-home-button-container">
//                 <button className="login" onClick={clickLogin}>Login</button>
//                 <button className="register" onClick={clickRegister}>Register</button>
//             </nav>
//         </div>  
//     )
    
// }