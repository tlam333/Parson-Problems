import React, { useEffect, useState, useContext} from "react";
import NavHome from "../components/NavHome";
import {AuthenticationContext} from "../contexts/AuthenticationContext.js"

const ProfileBody = () => {
  // State to manage the input value
  let [stats, setstats] = useState([])
  const [username, setUsername] = useState("username");
  const authenticationContext = useContext(AuthenticationContext)
  const {state, dispatch} = authenticationContext // state object has two things {user: "AUTHENTICATED" or null, payload: "the user's id is here"}
  
  const statsUrl = `http://localhost:3001/api/users/${state.payload}`

  useEffect(() => {
    fetch(statsUrl, {
      method: 'GET',
      // code: 'cors',
      credentials: 'include',
      headers: {'content-type': 'application/json'}
    })
    .then((result) => result.json())
    .then((data) => {
      if (data != null){
          setstats(data)
          console.log(data)   
      }
    })
  }, [])


  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center  text-center font-sans">
      <div className="mb-10">
        <br />
        <h1 className = "text-5xl font-bold">
            Profile <span className="text-orange-500">Analytics </span>
        </h1>
        </div>
      <br />
      <br />
      {/* Profile Information */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto"></div>{" "}
        {/* Avatar */}
        <div className="mt-4 flex justify-center items-center">
          <div className="flex items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state on input change
              className="text-4xl text-white font-bold bg-transparent border-none focus:outline-none focus:ring-0 text-center"
              placeholder="Enter your username"
            />
            <span className="text-lg ml-2">✏️</span>
          </div>
        </div>
      </div>

      {/* Statistics with Slimmer DaisyUI Divider */}
      <div className="flex w-full max-w-3xl lg:flex-row justify-around items-stretch mt-8">
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-orange-500">Total Questions Attempted:</p>
          <p className="text-5xl font-bold text-white">35</p>
          <p className="text-sm text-orange-500">Questions</p>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-orange-500">Success Rate:</p>
          <p className="text-5xl font-bold text-white">78%</p>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-orange-500">Average Time Per Problem:</p>
          <p className="text-5xl font-bold text-white">3.2</p>
          <p className="text-sm text-orange-500">Mins</p>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <>
      <NavHome />
      <ProfileBody />
    </>
  );
};

export default ProfilePage;
