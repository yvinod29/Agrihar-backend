import React, { useEffect } from "react";
import { useUserContext } from "../context/useUserContext";
import { useGetRegisteredAgricultureSesssionsByIdsMutation } from "../store/api/AgricultureApi";
import { Link } from "react-router-dom";

const RegisteredSession = () => {
  const { user } = useUserContext();
  const registeredSessions = user.registeredAgricultureSessions;
  const [getRegisteredAgricultureSesssionsByIds, { data: agricultureFarms }] =
    useGetRegisteredAgricultureSesssionsByIdsMutation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchData();
      console.log("fetchdata");
    }
  }, []);

  const fetchData = async () => {
    const session = await getRegisteredAgricultureSesssionsByIds({ token });
    console.log(session);
  };

  return (
    <div>
      <h1 className="text-3xl mt-3 font-bold ml-8 mb-6">Registered Sessions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 ">
        {agricultureFarms && agricultureFarms.agricultureFarms ? (
          agricultureFarms.agricultureFarms.map((agriclutre) => {
            // Slice the array to include only the first 8 agriclutres
            // Find the earliest and latest event start times
            return (
              <div
                key={agriclutre._id}
                className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
              >
                <Link
                  to={`/agriclutre/${agriclutre._id}`}
                  className="text-center"
                >
                  <div className="relative">
                    <img
                      src={agriclutre.media[0].secureUrl}
                      alt="agriclutre Image"
                      className="w-[400px] h-[350px] rounded-md"
                    />
                    <div className="absolute bottom-0 left-2 right-0 text-left py-2">
                      <h2 className="text-3xl font-bold text-white">
                        {agriclutre.instructorFirstName}
                        &apos;s agriclutre Farm
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No Farms available</p>
        )}
      </div>
    </div>
  );
};

export default RegisteredSession;
