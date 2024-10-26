import axios from "@/utils/axios";

export const getProps = async () => {
    const response = await axios.get("/props");
    return response.data;
};
