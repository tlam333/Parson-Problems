import NavHome from "../components/NavHome"
import "../styles/homeNavigation.css"

const Home = () => {
    return (
        <>
            <NavHome/>
            <div className = "flex flex-col h-lvh  align-bottom justify-bottom ">
                    
                    <div className="h-1/4"></div>

                    <div className="flex flex-col gap-0.5 items-start ml-10 ">
                        <div className="text-white text-4xl lg:text-8xl sm:text-5xl">Parsons</div>
        
                        <div className="inline-block bg-orange-500 py-1 px-2 mt-2 rounded-md 
                        text-black text-bold text-4xl lg:text-8xl sm:text-5xl">Problems</div>

                        <div className="my-6 text-orange-500 text-lg lg:text-2xl sm:text-xl">On demand Data Analytics problems<br/>
                        at the click of a button.</div>
                        
                        <div className="text-gray-400 mt-">Tech Ballers TM</div>
                    </div>

                    

                    {/* <!--Start Background Animation Body--> */}
                    <div className="area">
                        <ul className="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    {/* <!--End Background Animation Body--> */}
            </div>

        </>

    )
}

export default Home;