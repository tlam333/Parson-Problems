import SavedProblems from './pages/SavedProblems.jsx';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/Home",
        element: (
            <div>
                <h1>HOME PAGE</h1>
            </div>
        )
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