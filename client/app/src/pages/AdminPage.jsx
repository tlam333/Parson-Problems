import React from 'react';
import NavHome from '../components/NavHome';
import CountUp from 'react-countup';

const AdminPage = () => {
    return (
        <>
            <NavHome/>
            <div className="min-h-screen bg-black text-white flex flex-col items-center  text-center font-sans">
                <div className="mb-10">
                    <br />
                    <h1 className = "text-5xl font-bold">
                        Profile <span className="text-orange-500">Analytics </span>
                    </h1>
                    </div>
                <br />
                <br />
                

                {/* Statistics with Slimmer DaisyUI Divider */}
                <div className="grid grid-cols-3 w-full max-w-3xl lg:flex-row justify-around items-stretch mt-8">
                <div className="flex flex-col justify-center items-center">
                        <p className="text-sm text-orange-500">Number of Users:</p>
                        <CountUp className="text-5xl font-bold text-white" start={0} end={51} duration={3} />
                        <p className="text-sm text-orange-500">Users</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-sm text-orange-500">Number of Problems:</p>
                        <p className="text-5xl font-bold text-white">124</p>
                        <p className="text-sm text-orange-500">Problems</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-sm text-orange-500">Number of Active Users Today:</p>
                        <p className="text-5xl font-bold text-white">3</p>
                        <p className="text-sm text-orange-500">Users</p>
                    </div>
                </div>
                </div>
        </>
    );
}

export default AdminPage;