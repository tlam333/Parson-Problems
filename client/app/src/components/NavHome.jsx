// import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import '../styles/homeNavigation.css'

const NavHome = () => {
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
          <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/Profile'>Profile Analytics</Link></li>
          <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/CategoriesPage'>Categories</Link></li>
          <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/WorkPage'>Workspace</Link></li>
          <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/SavedProblems'>Saved Problems</Link></li>
          <li><a className="text-orange-500 hover:bg-orange-500 hover:text-black" href="#popup1">Login</a></li>
          <li><a className="text-orange-500 hover:bg-orange-500 hover:text-black" href="#popup2">Register</a></li>
            </ul>
          </div>



          <div class="popup" id="popup1">
            <div class="popup-inner text-black">
                  
                  <h3 className="inline">Login</h3>
                  <a href="#" class="button">x</a>
                  
                  <form className="mb-1">
                      <label className="block font-bold">Email</label>
                      <input className="block border-neutral-950 border-2 bg-white text-black"/>
                      <label className="block font-bold">Password</label>
                      <input className="block border-neutral-950 border-2 bg-white text-black"/>
                      <button className="block p-1 mt-2 mb-2 rounded-lg font-bold text-white bg-orange-400">Submit</button>
                  </form>
                  
                </div>
          </div>

          <div class="popup" id="popup2">
              <div class="popup-inner text-black">
                

                <h3 className="inline">Register</h3>
                <a href="#" class="button">x</a>

                
                <form className="mb-1">
                    <label className="block font-bold">Email</label>
                    <input className="block border-neutral-950 border-2 bg-white text-black"/>
                    <label className="block font-bold">Password</label>
                    <input className="block border-neutral-950 border-2 bg-white text-black"/>
                    <button className="block p-1 mt-2 mb-2 rounded-lg font-bold text-white bg-orange-400">Submit</button>
                </form>
                
              </div>
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