import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HostWeddingstep3 = ({
    formData,
    handleInputChange,
    handleNextStep,
    handlePreviousStep,
}) => {
    const [events, setEvents] = useState(
        formData.events
            ? formData.events
            : [
                  {
                      eventName: "",
                      startingTime: null, // Updated to use Date object
                      description: "",
                      dressCode: "",
                      musicAndDancing: "",
                      place: "",
                  },
              ]
    );

    const addEvent = () => {
        setEvents([
            ...events,
            {
                eventName: "",
                startingTime: null,
                description: "",
                dressCode: "",
                musicAndDancing: "",
                place: "",
            },
        ]);
    };

    const handleEventInputChange = (index, name, value) => {
        const newEvents = [...events];
        newEvents[index][name] = value;
        setEvents(newEvents);
        formData.events = events;
    };

    const handleNoOfDaysChange = (e) => {
        const noOfDays = parseInt(e.target.value, 10);
        if (!isNaN(noOfDays)) {
            const newEvents = Array.from({ length: noOfDays }, () => ({
                eventName: "",
                startingTime: null,
                description: "",
                dressCode: "",
                musicAndDancing: "",
                place: "",
            }));
            setEvents(newEvents);
        }
        handleInputChange(e);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className=" font-semibold">
                        Number of Days of the Wedding:
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleNoOfDaysChange}    // removed handleinputchange ---->dont know u try it  iguess
                            className=""
                        />
                    </label>
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">Languages Known:</label>
                    <input
                        type="text"
                        name="languagesKnown"
                        value={formData.languagesKnown}
                        onChange={handleInputChange}
                        className=""
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">Food Offered:</label>
                    <input
                        type="text"
                        name="foodOffered"
                        value={formData.foodOffered}
                        onChange={handleInputChange}
                        className=""
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold">
                        Facilities Provided:
                    </label>
                    <input
                        type="text"
                        name="facilitiesProvided"
                        value={formData.facilitiesProvided}
                        onChange={handleInputChange}
                        className=""
                    />
                </div>
            </div>
            <div className="">
                {/* Render event details based on the number of days */}
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="mt-4 border border-gray-300 p-4 rounded-md"
                    >
                        <h3 className="text-lg font-bold">Event {index + 1}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label
                                    htmlFor={`eventName-${index}`}
                                    className="font-semibold"
                                >
                                    Event Name:
                                </label>
                                <input
                                    type="text"
                                    id={`eventName-${index}`}
                                    name={`eventName`}
                                    value={event.eventName}
                                    onChange={(e) =>
                                        handleEventInputChange(index, e)
                                    }
                                    placeholder="Event Name"
                                    className=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor={`startingTime-${index}`}
                                    className="font-semibold"
                                >
                                    Starting Time:
                                </label>
                                <input
                                    type="text"
                                    id={`startingTime-${index}`}
                                    name={`startingTime`}
                                    value={event.startingTime}
                                    onChange={(e) =>
                                        handleEventInputChange(index, e)
                                    }
                                    placeholder="Starting Time"
                                    className=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor={`description-${index}`}
                                    className="font-semibold"
                                >
                                    Description:
                                </label>
                                <input
                                    type="text"
                                    id={`description-${index}`}
                                    name={`description`}
                                    value={event.description}
                                    onChange={(e) =>
                                        handleEventInputChange(index, e)
                                    }
                                    placeholder="Description"
                                    className=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor={`dressCode-${index}`}
                                    className="font-semibold"
                                >
                                    Dress Code:
                                </label>
                                <input
                                    type="text"
                                    id={`dressCode-${index}`}
                                    name={`dressCode`}
                                    value={event.dressCode}
                                    onChange={(e) =>
                                        handleEventInputChange(index, e)
                                    }
                                    placeholder="Dress Code"
                                    className=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor={`musicAndDancing-${index}`}
                                    className="font-semibold"
                                >
                                    Music and Dancing:
                                </label>
                                <input
                                    type="text"
                                    id={`musicAndDancing-${index}`}
                                    name={`musicAndDancing`}
                                    value={event.musicAndDancing}
                                    onChange={(e) =>
                                        handleEventInputChange(index, e)
                                    }
                                    placeholder="Music and Dancing"
                                    className=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor={`musicAndDancing-${index}`}
                                    className="font-semibold"
                                >
                                    Music and Dancing:
                                </label>
                                <input
                                    type="text"
                                    id={`place${index}`}
                                    name={`place`}
                                    value={event.place}
                                    onChange={(e) =>
                                        handleEventInputChange(index, e)
                                    }
                                    placeholder="place"
                                    className=""
                                />
                            </div>
                            {/* Add more input fields for other event properties as needed */}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addEvent}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
            >
                Add Event
            </button>

            <div className="flex justify-between mt-8">
                <button
                    onClick={handlePreviousStep}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextStep}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Next
                </button>
            </div>
        </>
    );
};

HostWeddingstep3.propTypes = {
    formData: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
    handlePreviousStep: PropTypes.func.isRequired,
};

export default HostWeddingstep3;