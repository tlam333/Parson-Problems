import SavedProblems from './pages/SavedProblems.jsx';
import HomePage from './pages/HomePage.jsx';
<<<<<<< Updated upstream
=======
import Login from './pages/Login.jsx';
import Registration from "./pages/Registration.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import Categories from "./pages/Categories.jsx";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
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
        path: "/Categories",
        element: <Categories />
>>>>>>> Stashed changes
    }
])

const App = () => {
    return (<RouterProvider router={router}/>)
}

export default App;