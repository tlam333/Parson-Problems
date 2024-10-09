// import '../styles/savedProblems.css';
import { createElement } from 'react';
import NavMenu from "../components/NavMenu";
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

// In future SavedProblems([categories])
const SavedProblems = ({isAuthenticated}) => {
    // let problems = fetchProblems();
    // for now problems is what is expected as a return from FetchProblems()
    let problems = [{   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Incomplete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Incomplete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Incomplete"},
                    ]
    const navigate = useNavigate()
    console.log(isAuthenticated)
    
    useEffect((isAuthenticated) => {
        if (isAuthenticated == false){
            navigate("/", {replace : true}) 
        }
    }, [])

    return (
        <div>
        {!isAuthenticated ?  null : (
            
            <div className='h-lvh bg-black'>
        
            <NavMenu />
                    
            <h1 className="text-5xl font-bold text-white text-center mt-4">
                Saved <span className="text-orange-500">Problems</span>
            </h1>
            <br />
                <div className='overflow-y-auto border-orange-500 mt-10 border-2 w-5/6 h-4/6 bg-black m-auto flex flex-col'>
                    <table className='table-auto h-auto w-full m-auto'>
                        <thead className='sticky top-0'>
                            <tr className='text-white'>
                                <td className='p-3 bg-orange-500'>Mark As Complete</td>
                                <td className='p-3 bg-orange-500'>Problem</td>
                                <td className='p-3 bg-orange-500'>Category</td>
                                <td className='p-3 bg-orange-500'>Status</td>
                            </tr>
                        </thead>
            
                        <tbody className="bg-black h-auto">
                            {problems.map((item, index) => (
                                <tr key={index} className='hover:bg-slate-900 text-white'>
                                    <td className='p-3 text-sm border-b-orange-500 border-b-2'><input type='checkbox'></input></td>
                                    <td className='p-3 text-sm border-b-orange-500 border-b-2 font-bold hover:text-orange-500'><button className="underline" href="/">{item.problemName}</button></td>
                                    <td className='p-3 text-sm border-b-orange-500 border-b-2'>{item.problemCategory}</td>
                                    <td className='p-3 text-sm border-b-orange-500 border-b-2'>
                                        <span className={`rounded-lg text-white p-2 ${item.solvedStatus === 'Complete' ? 'bg-green-300' : 'bg-red-300'}`}>{item.solvedStatus}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    
    
            </div>


        )}
    </div>
    )
}
//SKibibi
export default SavedProblems;