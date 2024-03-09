import { createContext } from "react";
 
 
export const INITIAL_USER = {
    userId: "",
    email: "",
    firstName: "",
    lastName:"",
    phoneNumber: "",
 };

export const INITIAL_STATE = {
    user: INITIAL_USER,
    setUser: () => {},
    isLoading: false,
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false,
};

const AuthContext = createContext(INITIAL_STATE);

export default AuthContext;
