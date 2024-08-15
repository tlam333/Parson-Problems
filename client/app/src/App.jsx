import SavedProblems from './pages/SavedProblems.jsx';
import HomePage from './pages/HomePage.jsx';

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
    }
])

const App = () => {
    return (<RouterProvider router={router}/>)
}

export default App;