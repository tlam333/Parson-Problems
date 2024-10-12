import React, { useEffect, useState, useContext} from "react";
import NavHome from "../components/NavHome";
import {AuthenticationContext} from "../contexts/AuthenticationContext.js";
import axios from 'axios';

const ProfileBody = () => {
  // State to manage the input value
  let [stats, setStats] = useState([]);
  const [username, setUsername] = useState("username");
  const authenticationContext = useContext(AuthenticationContext)
  const {state, dispatch} = authenticationContext // state object has two things {user: "AUTHENTICATED" or null, payload: "the user's id is here"}
  
  const statsUrl = `http://localhost:3001/api/users/${state.payload}`

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(statsUrl, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true // This is equivalent to credentials: 'include' in fetch
        });
  
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = response.data;
        if (data != null) {
          setUsername(data.userName);
          setStats(data);
          console.log(data);
        }
      } catch (error) {
        console.error('Axios error:', error);
      }
    };
  
    fetchStats();
  }, [statsUrl]); // Add statsUrl as a dependency
  
  


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
        <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto"></div>{"✏️"}
        {/* Avatar */}
        <div className="mt-4 flex justify-center items-center">
          <div className="flex items-center">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update state on input change
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Call the function only when the Enter key is pressed
                const changeUserName = async (newName) => {
                  try {
                    const response = await axios.patch(statsUrl,
                      {
                        userName: newName
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        withCredentials: true
                      }
                    );

                    if (response.status !== 200) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }

                  } catch (error) {
                    console.error('Axios error:', error);
                  }
                };

                changeUserName(username);
              }
            }}
            className="text-4xl text-white font-bold bg-transparent border-none focus:outline-none focus:ring-0 text-center"
            placeholder="Enter your username"
          />
          
          </div>
        </div>
      </div>

      {/* Statistics with Slimmer DaisyUI Divider */}
      <div className="flex w-full max-w-3xl lg:flex-row justify-around items-stretch mt-8">
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-orange-500">Total Questions Attempted:</p>
          <p className="text-5xl font-bold text-white">{String(stats.totalProblems)}</p>
          <p className="text-sm text-orange-500">Questions</p>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-orange-500">Success Rate:</p>
          <p className="text-5xl font-bold text-white">{`${String(stats.correctProblemsRatio * 100)}%`}</p>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-orange-500">Average Time Per Problem:</p>
          <p className="text-5xl font-bold text-white">{String(stats.averageTimeSpendPerProblem)}</p>
          <p className="text-sm text-orange-500">Seconds</p>
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
