import React, { useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import PropTypes from "prop-types";
import { useParams , useNavigate } from "react-router-dom";
import { useGetAgricultureSessionByIdQuery, useUpdateAgricultureSessionMutation } from "../../store/api/AgricultureApi";
import { WindowSharp } from "@mui/icons-material";


const EditAgriculture = () => {
  const { agriculture_id } = useParams();
  const [updateAgriculteSession, {data: updatedData}] = useUpdateAgricultureSessionMutation();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    instructorFirstName: "",
    instructorLastName: "",
    instructorEmail: "",
    instructorPhoneNumber: "",
    instructorDescription: "",
    whatToTeach: "",
    images: [],
    duration: "",
    pricePerSession: 0,
    location: [],
    languagesKnown: [],
    studentsPerClass: 40,
    facilitiesProvided: "",
    requirements: "",
    accountDetails: [],
  });

  const { data, error, isLoading, isSuccess } =useGetAgricultureSessionByIdQuery(agriculture_id);

  useEffect(() => {
    if (
      isSuccess &&
      data &&
      data.AgricultureSession &&
      data.AgricultureSession.media[0]
    ) {
      setFormData(data.AgricultureSession);
      setLocation(data.AgricultureSession.location);
      console.log(data.AgricultureSession);
    }
  }, [isLoading, isSuccess, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };
  const [location, setLocation] = useState(
    formData.location
      ? formData.location
      : {
          country: "",
          state: "",
          city: "",
          postalCode: "",
          street: "",
          venueName: "",
        }
  );


  
 useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: location,
    }));
  }, [location]);

  const handleLocationInputChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
        ...prevLocation,
        [name]: value
    }));
    formData.location=location
};

const handleSubmit =async()=>{
    try {
        const token=localStorage.getItem("token")
        const formDataToSend=formData
        console.log(agriculture_id)
        const session=await updateAgriculteSession({formDataToSend,token, agriculture_id})
        console.log(session)
        if(session.data){
            navigate(-1);
          }
    }catch(error){
        console.log(error)
    }

}

  


  return (
    <div className="mt-10 p-5 md:m-20 md:p-20">
          <h1 className="font-bold mb-2 text-2xl">

      Edit agricluture

      </h1>
      <div className="   ">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold mb-2">
                Instructor First Name:
                <input
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="text"
                  name="instructorFirstName"
                  value={formData.instructorFirstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Instructor Last Name:
                <input
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="text"
                  name="instructorLastName"
                  value={formData.instructorLastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Instructor Phone Number:
                <input
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="text"
                  name="instructorPhoneNumber"
                  value={formData.instructorPhoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Instructor Email:
                <input
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="email"
                  name="instructorEmail"
                  value={formData.instructorEmail}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              Instructor Descrption:
              <TextareaAutosize
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                type="text"
                name="instructorDescription"
                value={formData.instructorDescription}
                onChange={handleInputChange}
                style={{ minHeight: "80px", resize: "none" }}
                required
              />
            </label>
          </div>
        </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-semibold">Languages Known:</label>
          <input
            type="text"
            name="languagesKnown"
            value={formData.languagesKnown}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
            placeholder="Eg : English , Telugu"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Facilities Provided:</label>
          <input
            type="text"
            name="facilitiesProvided"
            value={formData.facilitiesProvided}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
            placeholder="Eg : Transportation , Accomidation"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Requirements:</label>
          <input
            type="text"
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
            placeholder="Requirements needed for session"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Price Per Session:</label>
          <input
            type="number"
            name="pricePerSession"
            value={formData.pricePerSession}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
            placeholder="Requirements needed for session"
          />
        </div>
      </div>
      <h2 className="text-xl mb-4">Location </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-semibold">Country :</label>
          <input
            type="text"
            name="country"
            value={location.country}
            onChange={handleLocationInputChange}
            className="border p-2 rounded-md"
            placeholder="India"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">State:</label>
          <input
            type="text"
            name="state"
            value={location.state}
            onChange={handleLocationInputChange}
            className="border p-2 rounded-md"
            placeholder=""
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">City:</label>
          <input
            type="text"
            name="city"
            value={location.city}
            onChange={handleLocationInputChange}
            className="border p-2 rounded-md"
            placeholder=""
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Postal code:</label>
          <input
            type="text"
            name="postalCode"
            value={location.postalCode}
            onChange={handleLocationInputChange}
            className="border p-2 rounded-md"
            placeholder=""
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Street :</label>
          <input
            type="text"
            name="street"
            value={location.street}
            onChange={handleLocationInputChange}
            className="border p-2 rounded-md"
            placeholder=""
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Venue Name:</label>
          <input
            type="text"
            name="venueName"
            value={location.venueName}
            onChange={handleLocationInputChange}
            className="border p-2 rounded-md"
            placeholder=""
          />
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <label className="font-semibold">Class Description:</label>
        <textarea
          name="whatToTeach"
          value={formData.whatToTeach}
          onChange={handleInputChange}
          className="border p-2 rounded-md"
          rows="3"
          placeholder="Common description for all classes"
        />
      </div>
 
   

      </div>
      <button  onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md block text-center">Submit</button>

    </div>
  );
};

 
export default EditAgriculture;
