import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from "@mui/material/TextareaAutosize";

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
                      startingTime: null,
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
                    <label className="font-semibold">
                        Number of Days of the Wedding:
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleNoOfDaysChange}
                            className="border p-2 rounded-md"
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
                        className="border p-2 rounded-md"
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
                        className="border p-2 rounded-md"
                    />
                </div>
            </div>

            {events.map((event, index) => (
                <div
                    key={index}
                    className="mt-4 border border-gray-300 p-4 rounded-md"
                >
                    <h3 className="text-lg font-bold">Day {index + 1}</h3>
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
                                    handleEventInputChange(
                                        index,
                                        "eventName",
                                        e.target.value
                                    )
                                }
                                placeholder="Event Name"
                                className="border p-2 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor={`startingTime-${index}`}
                                className="font-semibold"
                            >
                                Starting Time:
                            </label>
                            <DatePicker
                                id={`startingTime-${index}`}
                                selected={event.startingTime}
                                onChange={(date) =>
                                    handleEventInputChange(
                                        index,
                                        "startingTime",
                                        date
                                    )
                                }
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                placeholderText="Select Starting Time"
                                className="border p-2 rounded-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">
                                Food Offered:
                            </label>
                            <FormControl className="w-full ">
                                <Select
                                    labelId="foodOffered-label"
                                    id="foodOffered"
                                    name="foodOffered"
                                    value={formData.foodOffered}
                                    onChange={handleInputChange}
                                    className="border p-1 rounded-md"
                                >
                                    <MenuItem value="veg">Vegetarian</MenuItem>
                                    <MenuItem value="non-veg">
                                        Non-Vegetarian
                                    </MenuItem>
                                    <MenuItem value="both">Both</MenuItem>
                                </Select>
                            </FormControl>
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
                        <br />
                        <h2 className="text-lg font-semibold mb-4">
                            Location Details
                        </h2>
                        <br />

                        <div className="flex flex-col">
                            <label className="font-semibold">Country:</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Region:</label>
                            <input
                                type="text"
                                name="region"
                                value={formData.region}
                                onChange={handleInputChange}
                                className=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">City:</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">
                                Postal Code:
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                className=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">
                                Street Number:
                            </label>
                            <input
                                type="text"
                                name="streetNumber"
                                value={formData.streetNumber}
                                onChange={handleInputChange}
                                className=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">
                                Name of Venue:
                            </label>
                            <input
                                type="text"
                                name="venueName"
                                value={formData.venueName}
                                onChange={handleInputChange}
                                className=""
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">
                            Description:
                        </label>
                        <TextareaAutosize
                            type="text"
                            id={`description-${index}`}
                            name={`description`}
                            value={event.description}
                            onChange={(e) =>
                                handleEventInputChange(
                                    index,
                                    "description",
                                    e.target.value
                                )
                            }
                            placeholder="Provide details about the event"
                            className="border p-2 rounded-md"
                            style={{ minHeight: "80px", resize: "none" }} // You can adjust the height as needed
                        />
                    </div>
                </div>
            ))}

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
