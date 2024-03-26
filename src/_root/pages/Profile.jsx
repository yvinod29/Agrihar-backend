import React from "react";
import { useUserContext } from "../../context/useUserContext";
import { INITIAL_USER } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-scroll";

const Profile = () => {
  const { user, setIsAuthenticated, setUser } = useUserContext();
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
  };

  return (
    <>
      <div className="mt-20 flex justify-end mr-20">
        <Button onClick={(e) => handleSignOut(e)}>
          <img
            className="w-10 h-10"
            src="/assets/images/logout.png"
            alt="logout"
          />
          Logout
        </Button>
      </div>
      <div className=" flex  flex-col  items-center">
        <div className="flex flex-row  items-center md:gap-7">
          <div className="bg-gray-200 rounded-full w-32 h-32 flex justify-center items-center mb-4">
            <img
              src="/assets/images/avatar.png"
              alt="User Avatar"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <h2 className="text-gray-600">{user.email}</h2>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
