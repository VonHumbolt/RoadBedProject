import axios from "axios"

export default class AuthService {

    apiUrl = "http://localhost:8080/auth/"

    login(loginRequest) {
        return axios.post(this.apiUrl + "login", loginRequest);
    }

    register(registerRequest) {
        return axios.post(this.apiUrl + "register", registerRequest);
    }
}