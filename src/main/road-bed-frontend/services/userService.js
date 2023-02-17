import axiosInstance from "@/interceptors/interceptor";
import axios from "axios"

export default class UserService {
    
    apiUrl = "http://localhost:8080/users/"

    getByEmail(email) {
        return axiosInstance.get("users/getByEmail/" + email);
    }

    addHouseToFavorites(userId, house, token) {
        return axios.post(this.apiUrl + "addFavorite/" + userId, house, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
    }
    
    removeHouseFromFavorites(userId, house, token) {
        return axios.post(this.apiUrl + "removeFavorite/" + userId, house, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
    }
}