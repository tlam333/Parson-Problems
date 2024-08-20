import NavHome from "../components/NavHome"
import '../styles/homePage.css'

const HomeBody = () =>{
    return (
        <div className="HomeBody">
            <h1>Parsons</h1>

            <div className="logo1">
                <h1>Problems</h1>
            </div>

            <h4>On demand Data Analytics problems <br></br> 
                at the click of a button.</h4>
            <p>Tech Ballers TM</p>

        </div>
        
    )
}

const HomePage = () =>{
    return (
        <>
            <NavHome />
            <HomeBody />
        </>
    )
}

export default HomePage;