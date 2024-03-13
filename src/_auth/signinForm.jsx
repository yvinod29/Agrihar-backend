import React, { useEffect, useState } from "react";
import { useSigninMutation } from "../store/api/AuthApi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";
import { Link } from "react-router-dom";

const SigninForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { checkAuthUser } = useUserContext();
    const [signin, { isLoading }] = useSigninMutation();
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        if (isSuccess) {
            checkAuthUser();
            navigate("/");
        }
    }, [isSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform signin logic here
        const session = await signin(formData);
        if (session.data) {
            console.log(session.data);
            const { token: authToken } = session.data;
            console.log(authToken);
            localStorage.setItem("token", authToken);
            setIsSuccess(true);
        } else {
            console.error(session.error.data.message);
        }
        console.log("Form submitted:", formData);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form
                    className="max-w-md mx-auto space-y-4"
                    onSubmit={handleSubmit}
                >
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
                    <button className="primary bg-blue-500 text-white rounded-md py-2 px-4 mb-3 w-full">
                        {isLoading ? "Logging In..." : "Login"}
                    </button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?{" "}
                        <Link className="underline text-black" to={"/signup"}>
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SigninForm;
