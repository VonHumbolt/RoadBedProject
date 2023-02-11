import axios from "axios"

export default class UserService {
    apiUrl = "http://localhost:8080/users/"

    getByEmail(email) {
        return axios.get(this.apiUrl + "getByEmail/" + email);
    }
}