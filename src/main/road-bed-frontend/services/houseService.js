import axios from "axios";

export default class HouseService {
    apiUrl = "http://localhost:8080/houses/";

    getall() {
        axios.get(this.apiUrl + "getall");
    }

    save(formData, token) {
        axios.post(this.apiUrl + "save", formData, {
            headers: {
                'Content-Type':'multipart/form-data',
                "Authorization": `Bearer ${token}`
            },
        });
    }
}