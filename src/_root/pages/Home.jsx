import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetWeddingsQuery } from "../../store/api/WeddingApi";

const Home = () => {
     const { data: weddings, isError, isLoading, error } = useGetWeddingsQuery();
    
    useEffect(() => {
        // Fetch data here if needed
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    // Render your data here
    return (
        <div className="mt-20 md:m-5 md:mt-20">
            <h1 className="text-3xl font-bold ml-8 mb-6">Weddings</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
                {weddings && weddings.weddings ? (
                    weddings.weddings.map((wedding) => (
                        <div
                            key={wedding._id}
                            className="bg-white p-4 rounded-md shadow-md flex "
                        >
                            {/* Render wedding details here */}
                            <Link to={`/wedding/${wedding._id}`}>
                                <img
                                    src={wedding.image.secureUrl}
                                    alt={`${wedding.groomName} & ${wedding.brideName}`}
                                    className="w-full h-80 mb-4 rounded-md object-cover aspect-square"
                                />
                                <h2 className="text-xl font-semibold mb-2">
                                    {wedding.groomName} & {wedding.brideName}{" "}
                                    Wedding
                                </h2>
                                <h3 className="">{wedding.events[0].place}</h3>
                                <h3>{wedding.events[0].startingTime}</h3>
                            </Link>
                            {/* Add other details as needed */}
                        </div>
                    ))
                ) : (
                    <p>No weddings available</p>
                )}
            </div>
        </div>
    );
};

export default Home;
