import axios from "@/utils/axios";

export const getProducts = async () => {
    const response = await axios.get("/products");
    return response.data;
};

export const createProduct = async (values) => {
    const response = await axios.post("/products", values);
    return response.data;
};
