import React from "react";
import PropTypes from "prop-types";

const HostWeddingstep1 = ({ formData, handleInputChange, handleNextStep }) => {
    const validatePhoneNumber = (phoneNumber) => {
        // Regular expression to validate phone number format with country code
        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = () => {
        // Validation logic for compulsory fields
        if (
            !formData.role ||
            !formData.groomFirstName ||
            !formData.groomLastName ||
            !formData.groomPhoneNumber ||
            !formData.groomEmail ||
            !formData.brideFirstName ||
            !formData.brideLastName ||
            !formData.bridePhoneNumber ||
            !formData.brideEmail
        ) {
            return;
        }

        // Validate phone number format
        if (
            !validatePhoneNumber(formData.groomPhoneNumber) ||
            !validatePhoneNumber(formData.bridePhoneNumber)
        ) {
            alert("Please enter a valid phone number with country code (+)");
            return;
        }

        // Proceed to next step if all validations pass
        handleNextStep();
    };

    return (
        <div className="max-w-md mx-auto flex justify-center items-center">
            <div className="">
                <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2">
                        Who are you?
                    </label>
                    <select
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="bride">Bride</option>
                        <option value="groom">Groom</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {formData.role === "other" && (
                        <>
                            <div>
                                <label className="block  text-sm font-bold mb-2">
                                    Other Person First Name:
                                    <input
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        type="text"
                                        name="otherPersonFirstName"
                                        value={formData.otherPersonFirstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>

                            <div>
                                <label className="block  text-sm font-bold mb-2">
                                    Other Person Last Name:
                                    <input
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        type="text"
                                        name="otherPersonLastName"
                                        value={formData.otherPersonLastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>

                            <div>
                                <label className="block  text-sm font-bold mb-2">
                                    Relation to Bride or Groom:
                                    <input
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        type="text"
                                        name="otherRelation"
                                        value={formData.otherRelation}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>

                            <div>
                                <label className="block  text-sm font-bold mb-2">
                                    Other Person Phone Number:
                                    <input
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        type="text"
                                        name="otherPhoneNumber"
                                        value={formData.otherPhoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>

                            <div>
                                <label className="block  text-sm font-bold mb-2">
                                    Other Person Email:
                                    <input
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        type="email"
                                        name="otherEmail"
                                        value={formData.otherEmail}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block  text-sm font-bold mb-2">
                            Groom First Name:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="groomFirstName"
                                value={formData.groomFirstName}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block  text-sm font-bold mb-2">
                            Groom Last Name:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="groomLastName"
                                value={formData.groomLastName}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block  text-sm font-bold mb-2">
                            Groom Phone Number:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="groomPhoneNumber"
                                value={formData.groomPhoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block  text-sm font-bold mb-2">
                            Groom Email:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="email"
                                name="groomEmail"
                                value={formData.groomEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block  text-sm font-bold mb-2">
                            Bride First Name:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="brideFirstName"
                                value={formData.brideFirstName}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block  text-sm font-bold mb-2">
                            Bride Last Name:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="brideLastName"
                                value={formData.brideLastName}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block  text-sm font-bold mb-2">
                            Bride Phone Number:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="text"
                                name="bridePhoneNumber"
                                value={formData.bridePhoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block  text-sm font-bold mb-2">
                            Bride Email:
                            <input
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                type="email"
                                name="brideEmail"
                                value={formData.brideEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
                    onClick={handleSubmit}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

HostWeddingstep1.propTypes = {
    formData: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
};

export default HostWeddingstep1;
