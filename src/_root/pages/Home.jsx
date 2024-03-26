import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetWeddingsQuery } from "../../store/api/WeddingApi";
import Agriculture from "./Agriculture";

const Home = () => {
  const { data: weddings, isError, isLoading, error } = useGetWeddingsQuery();
 
  useEffect(() => {
    // Fetch data here if needed
    console.log(weddings);
  }, [weddings]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Function to format date as "dd mmm yyyy"
  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Function to format date range as "dd to dd mmm yyyy"
  const formatDateRange = (startDate, endDate) => {
    const startDay = new Date(startDate).getDate();
    const endDay = new Date(endDate).getDate();
    const startMonth = new Date(startDate).toLocaleString("en-us", {
      month: "short",
    });

    const endMonth = new Date(endDate).toLocaleString("en-us", {
      month: "short",
    });
    const year = new Date(startDate).getFullYear();
    return `${startDay} to ${endDay} ${startMonth} ${year}`;
  };

  return (
    <div className="mt-20  md:m-5 md:mt-20">
      <h1 className="text-3xl font-bold ml-8 mb-6">Weddings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 ">
        {weddings && weddings.weddings ? (
          weddings.weddings.slice(0, 4).map((wedding) => {
            // Slice the array to include only the first 8 weddings
            // Find the earliest and latest event start times
            const eventStartTimes = wedding.events.map(
              (event) => new Date(event.startingTime)
            );
            const earliestStartTime = new Date(Math.min(...eventStartTimes));
            const latestStartTime = new Date(Math.max(...eventStartTimes));

            return (
              <div
                key={wedding._id}
                className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
              >
                <Link to={`/wedding/${wedding._id}`} className="text-center">
                  <div className="relative">
                    <img
                      src={wedding.images[0].secureUrl}
                      alt="Wedding Image"
                      className="w-[400px] h-[350px] rounded-md"
                    />
                    <div className="absolute bottom-0 left-2 right-0 text-left py-2">
                      <h2 className="text-3xl font-bold text-white">
                        {wedding.brideFirstName} & {wedding.groomFirstName}
                        &apos;s Wedding
                      </h2>
                    </div>
                  </div>
                  <h3 className="text-center">{wedding.events[0].city}</h3>
                  <h3 className="text-center">
                    {formatDateRange(earliestStartTime, latestStartTime)}
                  </h3>
                </Link>
                {/* Add other details as needed */}
              </div>
            );
          })
          ) : (
          <p>No weddings available</p>
        )}
       </div>
       <h1 className="text-3xl mt-3 font-bold ml-8 mb-6">Agriculture</h1>
        <Agriculture/>
    </div>
  );
};

export default Home;
