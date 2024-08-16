import SavedProblems from './pages/SavedProblems.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Registration from "./pages/Registration.jsx";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/Home",
        element: <HomePage />
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
    }
])

const App = () => {
    return (<RouterProvider router={router}/>)
}

export default App;