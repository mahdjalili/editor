import axios from "@/utils/axios";

export const login = async (values) => {
    return await axios.post("/auth/login", values);
};

export const register = async (values) => {
    return await axios.post("/auth/signup", values);
};
