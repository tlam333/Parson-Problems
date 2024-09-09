// import '../styles/savedProblems.css';
import { createElement } from 'react';

function FetchProblems(){
    let problems;
    /*
        Call backend API route that fetches 
        all problem names, category tags, and
        their solved status.  

        data format returned by backend should be 
                [   {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"},
                    {   problemName: "Linear Regression", 
                        problemCategory: "Regression", 
                        solvedStatus: "Complete"}
                ]
    */
   return problems
};

function CategoryItem({name}){
    return (
        <div className="category-item">
            <p>{name}</p>
        </div>
    )
}

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

    return (
        <div className='h-lvh bg-black'>
                <div className="w-4/6 m-auto h-1/6 p-10 bg-black">
                    <p className="text-lg text-white font-bold block">Saved Problems</p>
                    
                </div>


                
                <div className='flex flex-row h-1/6 w-5/6 m-auto bg-orange-300 rounded-md'>
                    <button className='pl-2 pr-2 bg-orange-500 text-xl w-auto h-1/3 rounded-md font-bold text-white'>Filter By</button>
                    <div className='flex flex-row'>
                        
                        <span className=''></span>

                    </div>
                </div>
                <div className='overflow-y-auto  border-orange-500 mt-10 border-2 w-5/6 h-4/6 bg-black m-auto flex flex-col'>
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
                                <tr className='hover:bg-slate-900 text-white'>
                                    <td className='p-3 text-sm border-b-orange-500 border-b-2'><input type='checkbox'></input></td>
                                    <td className='p-3 text-sm border-b-orange-500 border-b-2 font-bold hover:text-orange-500'><button className="underline" href="/">{item.problemName}</button></td>
                                    <td className='p-3 text-sm border-b-orange-500 border-b-2'>{item.problemCategory}</td>
                                    <td className='p-3 text-sm border-b-orange-500 border-b-2'>
                                        <span className={`rounded-lg text-white p-2 ${item.solvedStatus == 'Complete' ? 'bg-green-300' : 'bg-red-300'}`}>{item.solvedStatus}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
        </div>
        

    )
}
//SKibibi
export default SavedProblems;