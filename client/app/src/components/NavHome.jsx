// import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import {useState} from 'react'
import '../styles/homeNavigation.css'
import {useContext} from 'react'
import {AuthenticationContext} from '../contexts/AuthenticationContext.js'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const NavHome = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isLoading, setLoading] = useState(false)
    const authenticationContext = useContext(AuthenticationContext)
    const {state, dispatch} = authenticationContext
    const navigate = useNavigate()
    
    let urlregister = "http://localhost:3001/api/auth/register"
    let urllogin = "http://localhost:3001/api/auth/login"

    const isAuthenticated = () => {
      if (state.user != null){
        return true
      } else return false
    }
    
    const registerSubmit = async () => {
      setLoading(true);
    
      try {
          const response = await axios.post(urlregister, {
              userName: username,
              password: password,
              email: email
          }, {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true // This is equivalent to credentials: 'include' in fetch
          });
    
          // No need to check response.ok with Axios; it will throw an error if the response status is not 2xx
          const data = response.data; // Axios automatically parses the JSON response
    
          // Check the specific success message in the response
          if (data.message === `Account ${username} was created`) {
              dispatch({ type: "REGISTER", payload: data.id });
              setLoading(false);
              navigate("/CategoriesPage", { replace: true });
          }
      } catch (error) {
          console.error('Axios error:', error);
          setLoading(false);
          // Handle error (e.g., show an error message to the user)
          // You can also access error.response.data for server response
      }
    };
  
    

    const loginSubmit = async () => {
      setLoading(true);
  
      try {
          const response = await axios.post(urllogin, {
              userName: username,
              password: password
          }, {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true // This is equivalent to credentials: 'include' in fetch
          });
  
          // No need to check response.ok with Axios; it will throw an error if the status is not 2xx
          const data = response.data; // Axios automatically parses the JSON response
  
          // Check if the ID is valid
          if (data.id && (data.id).toString().length > 0) {
              dispatch({ type: "LOGIN", payload: data.id });
              // Update isLoading state
              setLoading(false);
              // Trigger redirect
              navigate("/CategoriesPage", { replace: true });
          } else {
              // Handle case where the ID is not valid
              console.error('Login failed:', data);
              setLoading(false);
          }
      } catch (error) {
          console.error('Axios error:', error);
          setLoading(false);
          // Optionally show an error message to the user
      }
    };
  
    

    const handleLogout = () => {
      dispatch({type: "LOGOUT", payload: null})
      navigate("/", {replace : true})
    }

    return (
        <nav className="z-50 flex justify-between items-center bg-black p-4 ">
        {/* Left Button - Redirect to Home */}
        <div className="flex items-center">
          <Link to='/'>
            <button className="bg-orange-500 hover:bg-black-600 text-black p-4 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
            </button>
          </Link>
        </div>
          
          {/* Right Menu - Dropdown */}
          <div className="dropdown dropdown-end z-40">
            <div tabIndex={0} role="button" className="text-orange-500 text-4xl">
              &#9776;
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-black border border-orange-500 rounded-box w-52 p-2 shadow"
            >
          <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/CategoriesPage'>Categories</Link></li>
          {isAuthenticated() === true ?  <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/Profile'>Profile Analytics</Link></li>: <div></div>}
          {isAuthenticated() === true ? <li><Link className="text-orange-500 hover:bg-orange-500 hover:text-black" to='/SavedProblems'>Saved Problems</Link></li> : <div></div>}
          {isAuthenticated() === true? <li><button className="text-orange-500 hover:bg-orange-500 hover:text-black" onClick={handleLogout}>Logout</button></li> : <div></div>}
          {isAuthenticated() === false ? <li><a className="text-orange-500 hover:bg-orange-500 hover:text-black" href="#popup1">Login</a></li> : <div></div>}
          {isAuthenticated() === false ? <li><a className="text-orange-500 hover:bg-orange-500 hover:text-black" href="#popup2">Register</a></li> : <div></div>}

            </ul>
          </div>


          <div className="popup" id="popup1">
            <div className="popup-inner text-black">
                  
                  <h3 className="inline">Login</h3>
                  <a href="#" className="button">x</a>
                  <form className="mb-1" onSubmit={loginSubmit}>
                    <label className="block font-bold">Username</label>
                    <input className="block border-neutral-950 border-2 bg-white text-black"
                            type="text"
                            onChange={(e)=>setUsername(e.target.value)}
                            value={username}
                    />
                    <label className="block font-bold">Password</label>
                    <input className="block border-neutral-950 border-2 bg-white text-black"
                            type="password"
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                    />
                    <button disabled={isLoading} className="block p-1 mt-2 mb-2 rounded-lg font-bold text-white bg-orange-400" type="submit">Submit</button>
                  </form>
                  
                </div>
          </div>

          <div className="popup" id="popup2">
              <div className="popup-inner text-black">
                

                <h3 className="inline">Register</h3>
                <a href="#" className="button">x</a>

                
                <form className="mb-1" onSubmit={registerSubmit}>
                      <label className="block font-bold">Username</label>
                      <input className="block border-neutral-950 border-2 bg-white text-black"
                              type = "text"
                              onChange={(e)=>setUsername(e.target.value)}
                              value={username}
                      />
                      <label className="block font-bold">Email</label>
                      <input className="block border-neutral-950 border-2 bg-white text-black"
                              type = "email"
                              onChange={(e)=>setEmail(e.target.value)}
                              value={email}
                      />
                      <label className="block font-bold">Password</label>
                      <input className="block border-neutral-950 border-2 bg-white text-black"
                              type = "password"
                              onChange={(e)=>setPassword(e.target.value)}
                              value={password}
                      />
                      <button disabled={isLoading} className="block p-1 mt-2 mb-2 rounded-lg font-bold text-white bg-orange-400" type="submit">
                        Submit
                      </button>
                  </form>
                
              </div>
          </div>
        </nav>
      )
}

export default NavHome