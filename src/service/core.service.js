import axios from "axios";
import TokenService from "./token.service";

const CoreService = {
  init() {
    axios.defaults.baseURL = "https://upitr.herokuapp.com/api/v1";
    axios.defaults.headers.common.Accept = "application/json";

    axios.interceptors.request.use(
      (config) => {
        let token = TokenService.getToken()
          ? TokenService.getToken()
          : null;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status == 401) {
          console.log('unauthorised');
          this.$router.push({ name: "Login" });
        }
        return Promise.reject(error);
      }
    );
  },

  setHeader() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      TokenService.getToken().accessToken
    }`;
  },
};

export default CoreService;
