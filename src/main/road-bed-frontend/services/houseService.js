import axios from "axios";

export default class HouseService {
    apiUrl = "http://localhost:8080/houses/";

    save(house, token) {
        axios.post(this.apiUrl + "save", house, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        });
    }
}