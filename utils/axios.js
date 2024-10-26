import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const TOKEN_NAME = "access_token";

const axiosInstance = axios.create({
    baseURL: "https://aksaz-backend.darkube.app", // Set your base URL
    timeout: 1000, // Set a timeout for requests
    headers: { Authorization: `Bearer ${cookies.get(TOKEN_NAME)}` }, // Set custom headers
});

export default axiosInstance;
