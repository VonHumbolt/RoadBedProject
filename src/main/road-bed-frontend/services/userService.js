import Interceptor from "@/interceptors/interceptor";

export default class UserService {
    
    apiUrl = "users/"
    axiosInstance;

    constructor(session) {
        this.axiosInstance = new Interceptor(session).getInstance();
    }

    getByEmail(email) {
        return this.axiosInstance.get(this.apiUrl + "getByEmail/" + email);
    }

    addHouseToFavorites(userId, house) {
        return this.axiosInstance.post(this.apiUrl + "addFavorite/" + userId, house)
    }
    
    removeHouseFromFavorites(userId, house) {
        return this.axiosInstance.post(this.apiUrl + "removeFavorite/" + userId, house)
    }
}