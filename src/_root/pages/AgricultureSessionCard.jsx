import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/useUserContext";
import { useGetAgricultureSessionByIdQuery } from "../../store/api/AgricultureApi";
import DatePicker from "react-multi-date-picker";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import BookSession from "./BookSession";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import SheduledSessions from "../../components/SheduledSessions";
import RegisteredStudentDetails from "../../components/RegisteredStudentDetails";

const AgricultureSessionCard = () => {
  const { agriculture_id } = useParams();
  const { user } = useUserContext();
  const [AgricultureSessionData, setAgricultureSesstionData] = useState(null); // Initialize with null
 

 
  const { data, error, isLoading, isSuccess , refetch} =
  useGetAgricultureSessionByIdQuery(agriculture_id);

  const handleRefetch = () => {
    console.log("refresh")
    refetch();
  };
                                        
  useEffect(() => {
    
    if (
      isSuccess &&
      data &&
      data.AgricultureSession &&
      data.AgricultureSession.media[0]
    ) {
      setAgricultureSesstionData(data.AgricultureSession);
      console.log(data.AgricultureSession);
    }
  }, [isLoading, isSuccess, data]);

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

 

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date.format("M/DD/YYYY"));
  };
  const handleChooseDate = (date) => {
    console.log(selectedDate);
  };

  return (
    <div className="md:flex md:justify-center  md:m-20  gap-9">
        
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess && AgricultureSessionData ? (
        <>
          <div className="flex flex-col  ">
            <h1 className="text-3xl font-bold mb-6">Agriculture Session</h1>
            <div className="flex flex-wrap justify-start gap-4">
              {AgricultureSessionData.media
                .slice(0, showMore ? AgricultureSessionData.media.length : 3)
                .map((image, index) => (
                  <div
                    key={index}
                    className="w-[400px] h-[450px] rounded-md overflow-hidden"
                  >
                    <img
                      src={image.secureUrl}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              {AgricultureSessionData.media.length > 3 && (
                <button className="text-blue-500 mt-4" onClick={toggleShowMore}>
                  {showMore ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col w-9/12">
                <div className="mb-6 ">
                  <h2 className="text-xl font-semibold">
                    Instructor Name :{" "}
                    {AgricultureSessionData.instructorFirstName}
                  </h2>
                  <p>
                    Descrption about Instructor :{" "}
                    {AgricultureSessionData.instructorDescription}
                  </p>
                </div>
                <div className="mb-6">
                  <p>
                    Languages Known: {AgricultureSessionData.languagesKnown}
                  </p>
                  <p>
                    Facilities Provided:{" "}
                    {AgricultureSessionData.facilitiesProvided}
                  </p>
                </div>
                <div className="mb-6">
                  <p>
                    Description About Class:{" "}
                    {AgricultureSessionData.whatToTeach}
                  </p>
                  <p>Requirements : {AgricultureSessionData.requirements}</p>
                </div>
                <div>
                  <RegisteredStudentDetails agriculture_id={agriculture_id} handleRefetch={handleRefetch}     />
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <SheduledSessions AgricultureSession={AgricultureSessionData}   handleRefetch={handleRefetch} />
               
              </div>
              
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Error loading wedding data: {error?.message}</p>
        </>
      )}
    </div>
  );
};

export default AgricultureSessionCard;
