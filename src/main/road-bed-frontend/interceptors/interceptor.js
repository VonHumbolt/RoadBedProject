const { default: axios } = require("axios");

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/"
})

axiosInstance.interceptors.request.use((request) => {
    console.log("sdfhsdhfshdfhsdfh");
    return request;
})

axiosInstance.interceptors.response.use((response) => {
    console.log(response.data);
    return response;
})

export default axiosInstance;