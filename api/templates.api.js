import axios from "@/utils/axios";

export const getTemplates = async () => {
    const response = await axios.get("/templates");
    return response.data;
};

export const createTemplate = async (values) => {
    const response = await axios.post("/templates", values);
    return response.data;
};
