import   { useEffect, useState } from "react";
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
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md w-full py-2 px-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md w-full py-2 px-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button className="primary bg-blue-500 text-white rounded-md py-2 px-4 mb-3 w-full">
                        {isLoading ? "Logging In..." : "Login"}
                    </button>
                    <div className="text-center py-2 text-gray-500">
                        Don&apos;t have an account yet?
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
