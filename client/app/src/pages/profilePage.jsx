import React from 'react';
import NavMenu from '../components/NavMenu.jsx';

const ProfileBody = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center font-sans">
      {/* Profile Information */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto"></div> {/* Avatar */}
        <div className="mt-4">
          <h1 className="text-4xl font-bold">
            username <span className="text-lg">✏️</span>
          </h1>
          <br />
          <p className="mt-2 text-orange-500">⭐ On a 4 Question Streak!</p>
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
