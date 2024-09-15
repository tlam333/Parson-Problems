// import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import {useState} from 'react'
import '../styles/homeNavigation.css'
import {useContext} from 'react'
import {AuthenticationContext} from '../contexts/AuthenticationContext.js'
import {useNavigate} from 'react-router-dom'

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

    const registerSubmit = async () => {
      // When submitted, ensure the user does not spam click the submit button
      setLoading(true)

      const res = await fetch(urlregister, {
        method: 'POST',
        code: 'cors',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({"userName": username, "password": password, "email": email})
      })
      
      // successful responses trigger global context update
      if (res.status == 200){
        dispatch({type: "REGISTER", payload: res.body})
        // update isLoading state
        setLoading(false)
        
        // login success, trigger redirect
        navigate("/CategoriesPage", {replace : true})
      }
    }

    const loginSubmit = async () => {
      setLoading(true)

      const res = await fetch(urllogin, {
        method: 'POST',
        code: 'cors',
        headers: {'content-type': 'application/json',
          body: JSON.stringify({"userName": username, "password": password})
        }
      })

      if (res.status == 200){
        dispatch({type: "REGISTER", payload: res.body})
        setLoading(false)
        navigate("/CategoriesPage", {replace : true})
      }
    }

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

          <div class="popup" id="popup2">
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