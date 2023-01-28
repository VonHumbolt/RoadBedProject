import axios from "axios"

export default class CityService {
    apiUrl = "http://localhost:8080/cities/"

    getall() {
        return axios.get("getall")
    }
}