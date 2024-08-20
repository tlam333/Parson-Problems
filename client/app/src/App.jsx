import SavedProblems from './pages/SavedProblems.jsx';
import Login from './pages/Login.jsx';
import Registration from "./pages/Registration.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import Home from "./pages/Home.jsx"

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";

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
        element: <SavedProblems />
    },
    {
        path: "/Login",
        element: <Login />
    },
    {
        path: "/Register",
        element: <Registration/>
    },
    {
        path: "/Profile",
        element: <ProfilePage />
    },
    {   
        path: "/CategoriesPage",
        element: <CategoriesPage />
    }
])

const App = () => {
    return (<RouterProvider router={router}/>)
}

export default App;