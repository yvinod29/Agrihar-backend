import React, { useState } from "react";
import PropTypes from "prop-types";

const HostWeddingstep2 = ({
    formData,
    handleImageUpload,
    handleNextStep,
    handlePreviousStep,
}) => {
    const [imagePreviews, setImagePreviews] = useState([]);

   const handleFileChange = (event) => {
       const files = event.target.files;

       if (files.length > 0) {
           const newPreviews = Array.from(files).map((file) => {
               const reader = new FileReader();
               return new Promise((resolve) => {
                   reader.onload = (e) => resolve(e.target.result);
                   reader.readAsDataURL(file);
               });
           });

           Promise.all(newPreviews).then((newPreviewsArray) => {
               setImagePreviews((prevPreviews) => [
                   ...prevPreviews,
                   ...newPreviewsArray,
               ]);
           });
       }
   };

    return (
        <div className="p-8 bg-white rounded-md w-full">
            <div className="flex flex-col items-center mb-4">
                <h1 className="font-semibold mb-10">
                    {" "}
                    Upload Photos of the bride and groom!!
                </h1>
                <label className="flex flex-col items-center gap-2 cursor-pointer border bg-transparent rounded-md p-4 text-2xl text-gray-600 overflow-hidden">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12 mb-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                    </svg>
                    Upload Photos
                </label>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {imagePreviews.map((preview, index) => (
                        <img
                            key={index}
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-48 h-48 object-cover rounded-md"
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={handlePreviousStep}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

HostWeddingstep2.propTypes = {
    formData: PropTypes.object.isRequired,
    handleImageUpload: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
    handlePreviousStep: PropTypes.func.isRequired,
};

export default HostWeddingstep2;
