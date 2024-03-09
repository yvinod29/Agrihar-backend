import React, { useState } from "react";
import { useSignupMutation } from "../store/api/AuthApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    const [SignUp, { isLoading }] = useSignupMutation();
    const navigate = useNavigate();

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

            if (session.data) {
                const { token: authToken } = session.data;
                localStorage.setItem("token", authToken);
                navigate("/");
            } else {
                console.error(session.error.data.message);
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    return (
        <div className="mt-20 max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-4xl text-center mb-4">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="First Name"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Last Name"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                    <button
                        type="submit"
                        className="primary bg-blue-500 text-white rounded-md py-2 px-4 mb-3 w-full"
                    >
                        {isLoading ? "Loading..." : "Sign Up"}
                    </button>
                </form>
                <div className="text-center py-2 text-gray-500">
                    Already have an account?{" "}
                    <Link className="underline text-black" to={"/signin"}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
