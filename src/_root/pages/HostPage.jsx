import React from 'react';
import { Link } from 'react-router-dom';

const HostPage = () => {
    return (
        <div className="flex flex-col md:flex-row  justify-center items-center min-h-screen bg-gray-100 gap-9">
            {/* Wedding Hosting Section */}
            <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md ">
                <h2 className="text-2xl font-semibold mb-4">Host Wedding</h2>
                <img className='h-20 w-20' src="/assets/images/hall.png"/>
                <p className="text-gray-600 mb-4">
                    Are you planning to host a beautiful wedding ceremony? Click below to start hosting now!
                </p>
                <Link
                    to="/host-wedding"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md block text-center"
                >
                    Host Wedding
                </Link>
            </div>

            {/* Agriculture Hosting Section */}
            <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Host Agriculture Session</h2>
                <img className='h-20 w-20' src="/assets/images/planting.png"/>

                <p className="text-gray-600 mb-4">
                    Interested in hosting an agriculture session to share your knowledge? Click below to get started!
                </p>
                <Link
                    to="/host-agriculture"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md block text-center"
                >
                    Host Agriculture Session
                </Link>
            </div>
        </div>
    );
};

export default HostPage;
