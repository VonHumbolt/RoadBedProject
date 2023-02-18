import Interceptor from "@/interceptors/interceptor";

export default class CityService {
    apiUrl = "cities/"
    axiosInstance;

    constructor(session) {
        this.axiosInstance = new Interceptor(session).getInstance();
    }

    getall() {
        return this.axiosInstance.get(this.apiUrl + "getall");
    }
}