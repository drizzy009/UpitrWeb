import axios from "axios";
const basePath = "dashboard";

const DashboardService = {
    get() {
      return new Promise((resolve, reject) => {
        axios
          .get(`/${basePath}`)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            if (error.response) {
              reject(error.response);
            } else {
              reject(new Error(error));
            }
          });
      });
    },
  };
  
  export default DashboardService;
  