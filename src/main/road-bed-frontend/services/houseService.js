import Interceptor from "@/interceptors/interceptor";

export default class HouseService {
    apiUrl = "houses/"
    axiosInstance;

    constructor(session) {
        this.axiosInstance = new Interceptor(session).getInstance();
    }

    getall() {
        return this.axiosInstance.get(this.apiUrl + "getall");
    }
    
    save(formData) {
        return this.axiosInstance.post(this.apiUrl + "save", formData, {
            headers: {
                'Content-Type':'multipart/form-data',
            },
        });
    }

    delete(house) {
        return this.axiosInstance.post(this.apiUrl + "delete", house)
    }

    reserveHouse(reserveDto) {
        return this.axiosInstance.post(this.apiUrl + "reserve", reserveDto)
    }
}