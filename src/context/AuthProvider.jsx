import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext, { INITIAL_USER } from "./AuthContext";
 import { useNavigate } from "react-router-dom";
import { useVerifyUserMutation } from "../store/api/AuthApi";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use the useVerifyClubMutation hook
  const [verifyuser, { isError, isSuccess }] = useVerifyUserMutation();
  console.log("verifyclub");

  const checkAuthUser = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      // Use the verifyuserMutation function instead of the query
      const session = await verifyuser({ token });
      if (isError) {
        navigate("/");
        return false;
      }
      if (session.data){
        const { data } = session;
        setIsAuthenticated(true);
        console.log(data)
        console.log("datauser")
        console.log(data.user.firstName);
         

        // Check if user.eventsRegistered is an array
           setUser({
            userId: data.user._id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            phoneNumber: data.user.phoneNumber,
            registeredWeddings:data.user.registeredWeddings

          });
        
        console.log("user");
        console.log(user);

        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/");
    } else {
      checkAuthUser();
    }
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
