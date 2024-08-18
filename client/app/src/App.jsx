import SavedProblems from './pages/SavedProblems.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import ProfilePage from './pages/profilePage.jsx';
//import './styles/tailwind.css';

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