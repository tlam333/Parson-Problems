import React, { useEffect, useState } from 'react';
import NavHome from '../components/NavHome';
import CountUp from 'react-countup';
import axios from 'axios';

const GETSTATS_URL = `http://localhost:3001/api/admin/`;
const GETPROBS_URL = `http://localhost:3001/api/admin/recentProblems`;

const AdminPage = () => {
    const [numUsers, setNumUsers] = useState(0);
    const [numProblems, setNumProblems] = useState(0);
    const [recentProblems, setRecentProblems] = useState([]);
    const [isAdmin, setIsAdmin ] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const getTotals = async () => {
        try {
            const response = await axios.get(GETSTATS_URL, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            });

            // console.log(`Response ${await response.data}`);
            // console.log(`Response ${response.data}`);

            setIsAdmin(true);
            return {
                numUsers: await response.data.numUsers,
                numProblems: await response.data.numProblems
            };
        } catch (error) {
            console.log(`No Access`);
            return null;
        }
    };

    const getRecentProblems = async () => {
        try {
            const response = await axios.get(GETPROBS_URL, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            });

            // console.log(response.data);
            setIsAdmin(true);
            return await response.data;
        } catch (error) {
            console.log(`Error with getRecentProblems: ${error}`);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsAdmin(false);
            setLoading(true); // Set loading to true before fetching data

            const totals = await getTotals();
            if (totals) {
                setNumUsers(totals.numUsers);
                setNumProblems(totals.numProblems);
            }

            // You can also fetch recent problems here if needed
            const probs = await getRecentProblems();
            if (probs) {
                setRecentProblems(probs.recentProblems);
                console.log(`RecentProblems: ${recentProblems}`);
            }
            // Handle recent problems as needed

            setLoading(false); // Set loading to false after data has been fetched
        };

        fetchData();
    }, []);

    return (
        <>
            <NavHome />
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            ) : !isAdmin ? (
                <div className="flex h-full w-full items-center justify-center p-80">NO ACCESS</div>
            ) : (
                <div className="min-h-screen bg-black text-white flex flex-col items-center text-center font-sans gap-10 py-10">
                    <div>
                        <h1 className="text-5xl font-bold">
                            Admin <span className="text-orange-500">Analytics</span>
                        </h1>
                    </div>

                    {/* Statistics with Slimmer DaisyUI Divider */}
                    <div className="flex w-full justify-center flex-row gap-36">
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-sm text-orange-500">Number of Users:</p>
                            <CountUp className="text-5xl font-bold text-white" start={0} end={numUsers} duration={3} />
                            <p className="text-sm text-orange-500">Users</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-sm text-orange-500">Number of Problems:</p>
                            <CountUp className="text-5xl font-bold text-white" start={0} end={numProblems} duration={3} />
                            <p className="text-sm text-orange-500">Problems</p>
                        </div>
                    </div>
                        <div className="w-3/4 overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Owner</th>
                                        <th>IP</th>
                                        <th>Topic</th>
                                        <th>Attempts</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {recentProblems.map((problem, index) => (
                                        <tr key={index}>
                                            <th>{problem.userOwner}</th>
                                            <th>{problem.ipAddress}</th>
                                            <th>{problem.topic}</th>
                                            <th>{problem.numAttempts}</th>
                                            <th>{problem.totalTime}</th>
                                            <th>{problem.correct ? "Correct" : "Incorrect"}</th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </div>
            )
            
            }
        </>
    );
};

export default AdminPage;
