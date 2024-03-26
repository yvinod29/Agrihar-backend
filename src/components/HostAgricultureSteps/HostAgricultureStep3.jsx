import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
 
const HostAgricultureStep3 = ({
  formData,
  handleInputChange,
  handleNextStep,
  handlePreviousStep,
}) => {
 
 
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

  const handleLocationInputChange = (e) => {
    const { name, value } = e.target;

    location[name] = value;
    setLocation({ ...location });

    formData.location = location;
  };

    
 
 
 
 

  return (
    <>
      
      
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
        <label className="font-semibold">Description:</label>
        <textarea
          name="whatToTeach"
          value={formData.whatToTeach}
          onChange={handleInputChange}
          className="border p-2 rounded-md"
          rows="3"
          placeholder="Common description for all classes"
        />
      </div>
 
  
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

HostAgricultureStep3.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  handlePreviousStep: PropTypes.func.isRequired,
};

export default HostAgricultureStep3;
