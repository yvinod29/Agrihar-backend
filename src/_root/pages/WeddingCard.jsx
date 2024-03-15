import React, { useEffect, useState } from "react";
import { useGetWeddingByIdQuery } from "../../store/api/WeddingApi";
import { useParams } from "react-router-dom";
import RegisterWedding from "../../components/RegisterWedding";
import { useUserContext } from "../../context/useUserContext";

const WeddingCard = () => {
  const { wedding_id } = useParams();
  const { user } = useUserContext();
  const [weddingData, setWeddingData] = useState(null); // Initialize with null

  const { data, error, isLoading, isSuccess } =
    useGetWeddingByIdQuery(wedding_id);

  useEffect(() => {
    if (isSuccess && data && data.wedding && data.wedding.images[0]) {
      setWeddingData(data.wedding);
      console.log(data.wedding);
    }
  }, [isLoading, isSuccess, data]);

  const isRegistered =
    weddingData &&
    weddingData.registeredUsers &&
    weddingData.registeredUsers.some(
      (userData) => userData.userId === user.userId
    );

  return (
    <div className="md:flex md:justify-center  md:m-20  gap-9">
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess && weddingData ? (
        <>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-6">Wedding Card</h1>

            <div className=" ">
              <img
                src={weddingData.images[0].secureUrl}
                alt="Wedding Image"
                className="w-[400px] h-[450px] rounded-md"
              />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {weddingData.brideFirstName} & {weddingData.groomFirstName}
              </h2>
            </div>
            <div className="mb-6">
              <p>Duration: {weddingData.duration} days</p>
              <p>languages Known: {weddingData.languagesKnown}</p>
              <p>Facilities Provided: {weddingData.facilitiesProvided}</p>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Events</h2>
                {weddingData.events.map((event, index) => (
                  <div
                    key={index}
                    className="mt-4 border border-gray-300 p-4 rounded-md"
                  >
                    <h3 className="text-lg font-bold">Event {index + 1}</h3>
                    <p>Event Name: {event.eventName}</p>
                    <p>Starting Time: {event.startingTime}</p>
                    <p>Description: {event.description}</p>
                    <p>Dress Code: {event.dressCode}</p>
                    <p>Music and Dancing: {event.musicAndDancing}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Display other wedding details */}
          </div>
          {!isRegistered ? (
            <div>
              <div>
                {weddingData.events.map((event, index) => {
                  // Convert ISO 8601 date string to a Date object
                  const eventDate = new Date(event.startingTime);

                  // Extract day, month, year, hour, and minute
                  const day = eventDate.getDate();
                  const month = eventDate.toLocaleString("default", {
                    month: "short",
                  });
                  const year = eventDate.getFullYear();
                  let hour = eventDate.getHours();
                  let minute = eventDate.getMinutes();

                  // Adjust hour and minute formatting
                  const period = hour >= 12 ? "pm" : "am";
                  hour = hour % 12 || 12;
                  minute = minute < 10 ? "0" + minute : minute;

                  return (
                    <div key={index} className="card bg-gray-100 p-2">
        <input type="checkbox" id={`checkbox${index}`} />
         <label htmlFor={`checkbox${index}`}>
             Day  {index + 1}: {day} {month} {year} at {hour}:{minute} {period}
         </label>
      </div>
                  );
                })}
              </div>

              <RegisterWedding />
            </div>
          ) : (
            <div>
            <p>Invitation for wedding</p>
            {weddingData.events.map((event, index) => (
              <div key={index} className="invitation-card">
                <p>Day {index + 1}:</p>
                <p>Date: {event.startingTime}</p>
                <p>Country: {event.country}</p>
                <p>Region: {event.region}</p>
                <p>City: {event.city}</p>
                <p>Postal Code: {event.postalCode}</p>
              </div>
            ))}
           
          </div>
        
          
          )}
        </>
      ) : (
        <p>Error loading wedding data: {error?.message}</p>
      )}
    </div>
  );
};

export default WeddingCard;
