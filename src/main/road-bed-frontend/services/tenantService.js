import Interceptor from "@/interceptors/interceptor";

export default class TenantService {
    apiUrl = "tenants/"
    axiosInstance;

    constructor(session) {
        this.axiosInstance = new Interceptor(session).getInstance();
    }

    updateProfilePicture(userId, formData) {
        return this.axiosInstance.post(this.apiUrl + "updateProfilePic/" + userId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }
}