import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useUserContext } from "../../context/useUserContext";
import { useGetAgricultureSessionByIdQuery } from "../../store/api/AgricultureApi";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker"
import RegisteredStudentsForSession from "../../components/RegisteredStudentsForSession";



const AgricultureHostCard = () => {
  const { agriculture_id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [AgricultureSessionData, setAgricultureSesstionData] = useState(null); // Initialize with null

  const { data, error, isLoading, isSuccess, refetch } =
    useGetAgricultureSessionByIdQuery(agriculture_id);

  useEffect(() => {
    if (
      isSuccess &&
      data &&
      data.AgricultureSession &&
      data.AgricultureSession.media[0]

    ) {
      setAgricultureSesstionData(data.AgricultureSession);
      const datesFromSchedule = data.AgricultureSession.schedule.map(entry => new Date(entry.classDate));
      setValues(datesFromSchedule);
    }
  }, [isLoading, isSuccess, data]);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  useEffect(() => {
    refetch();
  }, [navigate]);

  const handleEditButton = () => {
    const agri_id = AgricultureSessionData._id;
    console.log(agri_id);
    //    navigate(`/agriculture-host-edit/${agri_id}`);
    navigate(`/agriculture-host-edit/${agri_id}`, {
      state: { agricultureFarms: AgricultureSessionData },
    });
  };

  const handleSetSheduleButton = () => {
    navigate(`/${agriculture_id}/set-schedule`);
  };

  const [values, setValues] = useState([
    new Date('2024-04-01'), // Default date 1
    new Date('2024-04-05'), // Default date 2
    new Date('2024-04-10')  // Default date 3
  ]);
  return (
    <div className=" md:flex md:justify-center  md:m-20  gap-9">
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess && AgricultureSessionData ? (
        <>
          <div className="flex flex-col m-1 ">
            <div className="flex  justify-between">
              <h1 className="text-3xl font-bold mb-6">Agriculture Session</h1>

              <button
                onClick={handleEditButton}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2  h-8  rounded-md block text-center"
              >
                EDIT DETAILS
              </button>
            </div>

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
            <div className="flex flex-row mt-4">
              {/* Information in columns 1 to 7 */}
              <div className="flex flex-col w-8/12 pr-6">
                <div className="mb-6">
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
                    languages Known: {AgricultureSessionData.languagesKnown}
                  </p>
                  <p>
                    Facilities Provided:{" "}
                    {AgricultureSessionData.facilitiesProvided}
                  </p>
                </div>
                <div className="mb-6">
                  <p>
                    Descrption About Class: {AgricultureSessionData.whatToTeach}
                  </p>
                  <p>Requirements : {AgricultureSessionData.requirements}</p>
                </div>
              </div>
              {/* Select Date and Time button in columns 8 to 12 */}
              <div className="w-4/12">
                <button
                  onClick={handleSetSheduleButton}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  <h1 className="text-lg">Set Shedule</h1>
                </button>
                <div className="p-2">
                  Scheduled Classes
                <Calendar
                value={values}
                readOnly
                   /> 


                </div>
              </div>
            </div>
            <div>
              <RegisteredStudentsForSession schedule={AgricultureSessionData.schedule}/>

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

export default AgricultureHostCard;
