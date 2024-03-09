import React from "react";
import PropTypes from "prop-types";

const HostWeddingstep4 = ({
    formData,
    handleInputChange,
    handleSubmit,
    handlePreviousStep,
}) => {
    return (
        <>
            <div className="max-w-md mx-auto">
                <div className="">
                    <h2 className="text-xl mb-4">Guide Information</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Guide Name:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="guideName"
                                value={formData.guideName}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Guide Phone Number:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="guidePhoneNumber"
                                value={formData.gudiePhoneNumber}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Guide Email:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                name="guideEmail"
                                value={formData.guideEmail}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Bride Relation:
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="guideRelation"
                                value={formData.guideRelation}
                                onChange={handleInputChange}
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
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        submit
                    </button>
                </div>
            </div>
        </>
    );
};

HostWeddingstep4.propTypes = {
    formData: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handlePreviousStep: PropTypes.func.isRequired,
};

export default HostWeddingstep4;
