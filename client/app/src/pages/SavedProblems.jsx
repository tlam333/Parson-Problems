import '../styles/savedProblems.css';
import { createElement } from 'react';

function FetchProblems(){
    let problems = [];
    /*
        Call backend API route that fetches 
        all problem names, category tags, and
        their solved status.  
    */
   return problems
};


// In future SavedProblems([categories])
const SavedProblems = () => {
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
                        solvedStatus: "Complete"}]

    return (
        <div>
                <div className='categories-container'>
                </div>

                <div className='problem-table-container'>
                    <table>
                        <thead>
                            <tr>
                                <td>Problem</td>
                                <td>Category</td>
                                <td>Status</td>
                            </tr>
                        </thead>

                        <tbody>
                            {problems.map((item) => (
                                <tr>
                                    <td>{item.problemName}</td>
                                    <td>{item.problemCategory}</td>
                                    <td>{item.solvedStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
        

    )
}

export default SavedProblems;