import SavedProblems from './pages/SavedProblems.jsx';
import ProfilePage from "./pages/profilePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import WorkPageNew from './pages/WorkPageNew.jsx';
import Home from "./pages/Home.jsx"
import WorkPage from "./pages/WorkPage.jsx"
import {useContext} from 'react'
import {AuthenticationContext} from "./contexts/AuthenticationContext.js"
//import {AuthenticationContxt} from '../contexts/AuthenticationContext'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
import AdminPage from './pages/AdminPage.jsx';


const App = () => {
    const authContext = useContext(AuthenticationContext)
    const {state, dispatch} = authContext
    
    
    const isAuthenticated = () =>{

    
        if (state.user != null){
            if (state.user == "AUTHENTICATED"){
                return true
            }
        } else {
            return false
        }
    }
    
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/Home",
            element: <Home />
        },
        {
            path: "/SavedProblems",
            element: <SavedProblems isAuthenticated={isAuthenticated()}/>
        },
        {
            path: "/Profile",
            element: <ProfilePage/>
        },
        {   
            path: "/CategoriesPage",
            element: <CategoriesPage />
        },
        {
            path: "/WorkPage",
            element: <WorkPage />
        },
        {
            path: '/Admin',
            element: <AdminPage/>
        },
        {
            path: '/WorkPage2',
            element: <WorkPageNew/>
        }
    ])

    return (<RouterProvider router={router}/>)
}

export default App;