import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../context/useUserContext";
import { useVerifyUserMutation } from "../store/api/AuthApi";

const RegisteredStudentDetails = ({ agriculture_id , handleRefetch}) => {
  console.log(agriculture_id);
  const { user } = useUserContext();
  const [userData, setUserData]=useState(user);
  const [verifyuser, { isError, isSuccess }] = useVerifyUserMutation();


  useEffect(()=>{
    fetchData();

  },[handleRefetch])


  const fetchData =async()=>{

    try{
        const token =localStorage.getItem("token");
        const session = await verifyuser({ token });
        console.log("userDAta")
        if(session.data){
        console.log(session.data.user)
        setUserData(session.data.user)
        }

    }catch(error){
            console.log(error)
    }

  }


  const registeredAgricultureSessions = userData.registeredAgricultureSessions;

  // Filter sessions based on the provided agriculture ID
  const matchedSessions = registeredAgricultureSessions.filter(
    (session) => session.agricultureSessionId === agriculture_id
  );

  return (
    <div>
      <h1 className="text-3xl mt-3 font-bold ml-8 mb-6">Registered Sessions</h1>
      {matchedSessions.map((session, index) => (
        <div key={index} className="border border-gray-200 rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">{session.fullName}</h2>
          <p>
            <strong>Email:</strong> {session.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {session.phoneNumber}
          </p>
          <p>
            <strong>Number of Guests:</strong> {session.numberOfGuests}
          </p>
          <p>
            <strong>Fee Paid:</strong> {session.paidAmount}
          </p>
          <p>
            <strong>Date :</strong>{" "}
            {new Date(session.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              weekday: "short",
            })}
          </p>
          <p>
            <strong>Time :</strong> {session.timings}
          </p>
        </div>
      ))}
    </div>
  );
};

RegisteredStudentDetails.propTypes = {
  agriculture_id: PropTypes.string.isRequired,
   handleRefetch: PropTypes.func.isRequired,
};

export default RegisteredStudentDetails;
