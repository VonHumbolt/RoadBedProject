import axios from "axios";

export default class TenantService {
    apiUrl = "http://localhost:8080/tenants/";

    updateProfilePicture(userId, formData, token) {
        return axios.post(this.apiUrl + "updateProfilePic/" + userId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        })
    }
}