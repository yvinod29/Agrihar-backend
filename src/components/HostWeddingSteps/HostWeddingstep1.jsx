import React from "react";
import PropTypes from "prop-types";

const HostWeddingstep1 = ({ formData, handleInputChange, handleNextStep }) => {
   
    const handleSubmit = () => {
        // Proceed to the next step if all validations pass
        handleNextStep();
    };

    return (
        <div className="   ">
            <div className="">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                        Who are you?
                    </label>
                    <select
                        className="block w-80 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        name="hostRole"
                        value={formData.hostRole}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="bride">Bride</option>
                        <option value="groom">Groom</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {formData.hostRole === "other" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Your First Name:
                                <input
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="text"
                                    name="hostFirstName"
                                    value={formData.hostFirstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Your Last Name:
                                <input
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="text"
                                    name="hostLastName"
                                    value={formData.hostLastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Relation to Bride or Groom:
                                <input
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="text"
                                    name="hostRelation"
                                    value={formData.hostRelation}
                                    onChange={handleInputChange}
                                    placeholder="Eg : Brother"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Your Phone Number:
                                <input
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="text"
                                    name="hostPhoneNumber"
                                    value={formData.hostPhoneNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Your Email:
                                <input
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    type="email"
                                    name="hostEmail"
                                    value={formData.hostEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">
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
                        <label className="block text-sm font-bold mb-2">
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
                        <label className="block text-sm font-bold mb-2">
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
                        <label className="block text-sm font-bold mb-2">
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

                    <div>
                        <label className="block text-sm font-bold mb-2">
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
                        <label className="block text-sm font-bold mb-2">
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
                        <label className="block text-sm font-bold mb-2">
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
                        <label className="block text-sm font-bold mb-2">
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

HostWeddingstep1.propTypes = {
    formData: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
};

export default HostWeddingstep1;
