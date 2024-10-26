import axios from "@/utils/axios";

export const generate = async (values) => {
    const response = await axios.post("/generate", values);
    return response.data;
};
