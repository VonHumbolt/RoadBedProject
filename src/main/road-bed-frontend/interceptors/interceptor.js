const { default: axios } = require("axios");

class Interceptor {
  session;
  axiosInstance;

  constructor(session) {
    this.session = session;
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8080/"
    });

    this.axiosInstance.interceptors.request.use(async (request) => {
      if(session?.accessToken && request.url != "auth/refresh/accessToken") {
        request.headers = {
          ...request.headers,
          authorization: `Bearer ${session?.accessToken}`
        };
      }
      console.log("Request -> ", request);
      return request;
    }, (error) => Promise.reject(error));

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalConfig = error?.config;
        if (error.response) {
 
          if (error.response.status == 403 && !originalConfig.sent) {
            if (!originalConfig.sent) {

              originalConfig.sent = true;
              try {
                const refreshToken = {
                  refreshToken: session?.refreshToken,
                  email: session?.user?.email,
                };
                const result = await this.axiosInstance.post(
                  "auth/refresh/accessToken",
                  refreshToken
                );
       
                session.accessToken = result.data.accessToken;
              
                originalConfig.headers = {
                  ...originalConfig.headers,
                  authorization: `Bearer ${result.data.accessToken}`,
                };
                return this.axiosInstance(originalConfig);

              } catch (err) {
                return Promise.reject(err);
              }
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  getInstance() {
    return this.axiosInstance;
  }
}

export default Interceptor;
