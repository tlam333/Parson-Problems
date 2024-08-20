import NavHome from "../components/NavHome"
import "../styles/homeNavigation.css"

const Home = () => {
    return (
        <>
            <NavHome/>
            <div className = "flex flex-col items-left h-lvh  align-bottom justify-bottom ">
                    
                    <div className="h-1/4"></div>

                    <div className="ml-10">
                        <p className="text-white text-4xl lg:text-8xl sm:text-5xl">Parsons</p>
        
                        <button className="w-24rem bg-orange-500 rounded-md 
                        text-white text-4xl lg:text-8xl sm:text-5xl">Problems</button>

                        <p className="text-orange-500 text-lg lg:text-2xl sm:text-xl">On demand Data Analytics problems<br></br>
                        at the click of a button.</p>
                        
                        <p>Tech Ballers TM</p>
                    </div>

                    {/* <!--Start Background Animation Body--> */}
                    <div class="area">
                        <ul class="circles">
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