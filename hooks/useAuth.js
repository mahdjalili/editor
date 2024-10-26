import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const TOKEN_NAME = "access_token";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = cookies.get(TOKEN_NAME);
        setIsAuthenticated(!!token);
    };

    const setAuthToken = (token) => {
        if (token) {
            cookies.set(TOKEN_NAME, token, { path: "/" });
            setIsAuthenticated(true);
        } else {
            logout();
        }
    };

    const logout = () => {
        cookies.remove(TOKEN_NAME, { path: "/" });
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        setAuthToken,
        logout,
        checkAuth,
    };
};

export default useAuth;
