// import '../styles/savedProblems.css';
import { createElement } from 'react';
import NavHome from "../components/NavHome";
import {useNavigate} from 'react-router-dom';
import {useEffect, useContext, useState} from 'react';
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import {Link} from 'react-router-dom';
import axios from 'axios';

// In future SavedProblems([categories])
const SavedProblems = ({isAuthenticated}) => {

    // let problems = [{   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Incomplete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Incomplete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Complete"},
    //                 {   problemName: "Linear Regression", 
    //                     problemCategory: "Regression", 
    //                     solvedStatus: "Incomplete"},
    //                 ]
    let [problems, setProblems] = useState([])
    const navigate = useNavigate()
    const authenticationContext = useContext(AuthenticationContext)
    const {state, dispatch} = authenticationContext
    const pastProblemsUrl = `http://localhost:3001/api/parsonProblem/past/${state.payload}`
    

    useEffect(() => {
        const fetchPastProblems = async () => {
            if (isAuthenticated === false || isAuthenticated === null) {
                navigate("/", { replace: true });
            } else {
                try {
                    const response = await axios.get(pastProblemsUrl, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true // Include this if you need to send cookies with the request
                    });

                    const data = response.data;

                    if (data) {
                        setProblems(data);
                    }
                } catch (error) {
                    console.error('Error fetching past problems:', error);
                }
            }
        };

        fetchPastProblems();
    }, []);

    


    

    return (
        <div>
        {isAuthenticated === false ?  null : (
            
                <div className='flex flex-col items-center w-full h-svh bg-black gap-10'>

                    <NavHome />

                    <h1 className="text-5xl font-bold text-white">
                        Saved <span className="text-orange-500">Problems</span>
                    </h1>
                    <div className="h-full w-3/4 overflow-x-auto overflow-y-scroll">
                        <table className="table overflow-y-scroll">
                            {/* head */}
                            <thead className="sticky">
                                <tr>
                                    <th>Topic</th>
                                    <th>Theme</th>
                                    <th>Attempts</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {problems.map((problem, index) => (
                                        <tr key={index}>
                                            <th><Link className="underline" to="/WorkPage2" state={{topic : problem.topic, theme: problem.theme, problem_id: problem._id}}>{problem.topic}</Link></th>
                                            <td>{problem.theme}</td>
                                            <td>{problem.numAttempts}</td>
                                            <td>{problem.totalTime}</td>
                                            <td>{problem.correct ? "Correct" : "Incorrect"}</td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            )}
        </div>
    );
}
//SKibibi
export default SavedProblems;