import SavedProblems from './pages/SavedProblems.jsx';
import ProfilePage from "./pages/profilePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import Home from "./pages/Home.jsx"
import WorkPage from "./pages/WorkPage.jsx"

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
        path: "/Profile",
        element: <ProfilePage />
    },
    {   
        path: "/CategoriesPage",
        element: <CategoriesPage />
    },
    {
        path: "/WorkPage",
        element: <WorkPage />
    }
])
// comment
const App = () => {
    return (<RouterProvider router={router}/>)
}

export default App;