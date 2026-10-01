import axios from 'axios';

const axiosInstance = axios.create({
    baseurl : import.meta.env.VITE_API_URL
})

export default axiosInstance;