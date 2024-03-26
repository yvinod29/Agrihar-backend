import React from "react";
import PropTypes from "prop-types";
import { TextareaAutosize } from "@mui/material";

const HostAgricultureStep1 = ({
  formData,
  handleInputChange,
  handleNextStep,
}) => {
  const handleSubmit = () => {
    // Proceed to the next step if all validations pass
    handleNextStep();
  };

  return (
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
              Descrption:
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
        <button
          className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-40 "
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

HostAgricultureStep1.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};

export default HostAgricultureStep1;
