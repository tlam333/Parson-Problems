import NavMenu from "../components/NavMenu"

const WorkPage = () => {
    return (
        <div className="overflow-scroll bg-black h-lvh">
            <NavMenu />
            <div className="w-5/6 mx-auto">
                <button className="display-block mb-2.5 text-black bg-orange-500 w-1/9 h-1/3 rounded-md font-bold p-2">Prompt</button>
                <div className="w-full h-10 bg-slate-800"></div>
            </div>

            <div className="h-full w-full mt-10 p-10 flex  bg-black
            flex-col items-center space-between md:flex-row justify-between">
                
                <div className="flex-wrap bg-black w-full h-full rounded-md md:w-2/5">
                    <button className="display-block mb-1.5 text-black bg-orange-500 w-1/9 rounded-md font-bold p-2">Question</button>
                    <div className="border-orange-500 border-2 w-full h-5/6 bg-black rounded-md mb-1"></div>
                    <button className="display-block mb-2.5 text-black bg-orange-500 w-1/9 rounded-md font-bold p-2">Regenerate</button>
                </div>


                <div className="flex-wrap bg-black w-full h-full rounded-md md:w-2/5">
                    <button className="display-block mb-1.5 text-black bg-orange-500 w-1/9 rounded-md font-bold p-2">Answer</button>
                    <div className=" border-orange-500 border-2 w-full h-5/6 bg-orange-500 rounded-md mb-1"></div>
                    <button className="display-block mb-2.5 text-black bg-orange-500 w-1/9 rounded-md font-bold p-2">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default WorkPage