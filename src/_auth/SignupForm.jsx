import React, { useState } from "react";
import { useSignupMutation } from "../store/api/AuthApi";
import { useAppDispatch } from "../store/Hook";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";

const SignupForm = () => {
    const da = useUserContext();
    console.log(da);
    const [SignUp, { isLoading }] = useSignupMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email, firstName, lastName, password } = formData;
            const session = await SignUp({
                email,
                firstName,
                lastName,
                password,
            });

            // Handle success or error based on the isSuccess function
            if (session.data) {
                console.log(session.data);
                const { token: authToken } = session.data;
                console.log(authToken);
                localStorage.setItem("token", authToken);

                navigate("/");
                // Additional logic after successful signup
            } else {
                console.error(session.error.data.message);
                // Additional error handling logic
            }
        } catch (error) {
            console.error("Error during signup:", error);
            // Additional error handling logic
        }
    };

    return (
        <div className="flex justify-center items-center h-screen mt-10">
            <div className="bg-gray-96 rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">
                        Sign up!
                    </h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">
                        Welcome Back
                    </p>
                    <div className="flex items-center border py-2 px-3 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none flex-1 ml-2"
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="given-name"
                            placeholder="First Name"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center border py-2 px-3 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="pl-2 outline-none border-none flex-1 ml-2"
                        />
                    </div>
                    <div className="flex items-center border py-2 px-3 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none flex-1 ml-2 "
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="flex items-center border py-2 px-3 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none flex-1 ml-2"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center border py-2 px-3 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none flex-1 ml-2"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="block w-full bg-primary mt-4 py-2 rounded-lg text-white font-semibold"
                    >
                        {isLoading ? <>Loading...</> : <>Sign Up</>}
                    </button>
                </form>
                <div>
                    <Link to="/signin" className="text-center mt-4">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
