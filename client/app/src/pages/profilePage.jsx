import React, { useState } from "react";
import NavMenu from "../components/NavMenu"

const ProfileBody = () => {
  // State to manage the input value
  const [username, setUsername] = useState("username");

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
      <NavMenu />
      <ProfileBody />
    </>
  );
};

export default ProfilePage;
