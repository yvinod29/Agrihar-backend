import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../context/useUserContext";
import { useBookSessionMutation } from "../../store/api/AgricultureApi";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyUserMutation } from "../../store/api/AuthApi";

const BookSession = ({ selectedDate, schedule,PricePerSession, handleClose ,  handleRefetch }) => {
  // Filter the schedule array to get class times for the selected date
  const { user } = useUserContext();

  const navigate=useNavigate();
 
 

  const [BookSession, { isLoading }] = useBookSessionMutation();
  const { agriculture_id } = useParams();
  console.log(selectedDate);
 

  

  const [studentData, setStudentData] = useState({
    firstName: user.firstName ? user.firstName : "",
    email: user.email ? user.email : "",
    numberOfGuests: 1,
    selectedDate: selectedDate,
    selectedTime: "",
    phoneNumber: "",
    pricePerSession: PricePerSession
  });

  const classTimes = schedule
    .filter(
      (entry) =>
        new Date(entry.classDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }) ===
        new Date(selectedDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
    )
    .map((entry) => entry.classTime)
    .flat(); // Flatten the array of arrays to a single array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
    console.log(studentData);
  };

  const handleSubmit = async () => {
    console.log(studentData);
    const token = localStorage.getItem("token");
    const session = await BookSession({ studentData, token, agriculture_id });
    if (session.data) {
      console.log(session);
      //  setOpen(false)
      handleRefetch();
      handleClose();
    }
    console.log(session);
  };

  return (
    <div className="m-9">
      <h1 className="font-bold text-3xl">Book Session</h1>
      <p>
        Selected Date:{" "}
        {new Date(selectedDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div>
        <h2 className="font-semibold mb-2">Select Time:</h2>
        <select
          onChange={handleInputChange}
          name="selectedTime"
          value={studentData.selectedTime}
        >
          <option value="">Select a time</option>
          {classTimes.map((times, index) => (
            <option key={index} value={times.time}>
              {times.time}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <label htmlFor="numberOfGuests">Number of guests:</label>
        <select
          id="numberOfGuests"
          name="numberOfGuests"
          onChange={handleInputChange}
        >
          {[...Array(7).keys()].map((value) => (
            <option key={value + 1} value={value + 1}>
              {value + 1}
            </option>
          ))}npm
        </select>
      </div>
      <div>
        <label>Name :</label>
        <input
          type="email"
          name="firstName"
          value={studentData.firstName}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={studentData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone Number :</label>
        <input
          type="text"
          name="phoneNumber"
          value={studentData.phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button
          className=" bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-500"
          onClick={handleSubmit}
        >
          {isLoading ? "Loading..." : `Confirm & Pay ${PricePerSession}`}
        </button>
      </div>
    </div>
  );
};

export default BookSession;

BookSession.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  schedule: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  PricePerSession: PropTypes.string.isRequired,
  
  handleRefetch: PropTypes.func.isRequired,
};
