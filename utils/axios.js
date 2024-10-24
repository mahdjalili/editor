import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://aksaz-backend.darkube.app", // Set your base URL
    timeout: 1000, // Set a timeout for requests
    headers: { "X-Custom-Header": "foobar" }, // Set custom headers
});

export default axiosInstance;
