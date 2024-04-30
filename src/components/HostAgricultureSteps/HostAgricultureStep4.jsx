import React, { useState } from "react";
import PropTypes from "prop-types";

const HostAgricultureStep4 = ({
   isLoading,
  formData,
  handleInputChange,
  handleSubmit,
  handlePreviousStep,
}) => {
  const [accountDetails, setAccountDetails] = useState(
    formData.accountDetails
      ? formData.accountDetails
      : {
          bankAccountNumber: "",
          IFSCcode: "",
        }
  );

  const handleBankAccountInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    accountDetails[name] = value;
    setAccountDetails({ ...accountDetails });

    formData.accountDetails = accountDetails;
    console.log(accountDetails);
  };

  return (
    <>
      <div className="max-w-md mx-auto">
        <div className="">
          <h2 className="text-xl mb-4">Bank Account Details </h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Account Number:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="bankAccountNumber"
                value={accountDetails.bankAccountNumber}
                onChange={handleBankAccountInputChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              IFSC Code:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="IFSCcode"
                value={accountDetails.IFSCcode}
                onChange={handleBankAccountInputChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bank Name:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ccvv:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="ccvv"
                value={formData.ccvv}
                onChange={handleInputChange}
                placeholder=""
              />
            </label>
          </div>

          {/* Add other input fields for groom and bride information */}

          <button
            onClick={handlePreviousStep}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Previous
          </button>
          {isLoading ? (
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Loading...
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

HostAgricultureStep4.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlePreviousStep: PropTypes.func.isRequired,
};

export default HostAgricultureStep4;
