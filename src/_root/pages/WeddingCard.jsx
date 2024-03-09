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
        if (isSuccess && data && data.wedding && data.wedding.image) {
            setWeddingData(data.wedding);
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
                        <h1 className="text-3xl font-bold mb-6">
                            Wedding Card
                        </h1>

                        <div className=" ">
                            <img
                                src={weddingData.image.secureUrl}
                                alt="Wedding Image"
                                className="w-[400px] h-[450px] rounded-md"
                            />
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">
                                {weddingData.brideName} &{" "}
                                {weddingData.groomName}
                            </h2>
                        </div>
                        <div className="mb-6">
                            <p>Duration: {weddingData.duration} days</p>
                            <p>Food Offered: {weddingData.foodOffered}</p>
                            <p>languages Known: {weddingData.languagesKnown}</p>
                            <p>
                                Facilities Provided:{" "}
                                {weddingData.facilitiesProvided}
                            </p>
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold">
                                    Events
                                </h2>
                                {weddingData.events.map((event, index) => (
                                    <div
                                        key={index}
                                        className="mt-4 border border-gray-300 p-4 rounded-md"
                                    >
                                        <h3 className="text-lg font-bold">
                                            Event {index + 1}
                                        </h3>
                                        <p>Event Name: {event.eventName}</p>
                                        <p>
                                            Starting Time: {event.startingTime}
                                        </p>
                                        <p>Description: {event.description}</p>
                                        <p>Dress Code: {event.dressCode}</p>
                                        <p>
                                            Music and Dancing:{" "}
                                            {event.musicAndDancing}
                                        </p>
                                        <p>Place: {event.place}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Display other wedding details */}
                    </div>
                    {!isRegistered ? (
                        <RegisterWedding />
                    ) : (
                        <p>You are already registered for this wedding.</p>
                    )}
                </>
            ) : (
                <p>Error loading wedding data: {error?.message}</p>
            )}
        </div>
    );
};

export default WeddingCard;
