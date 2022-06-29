import axios from "axios";
const basePath = "authentication";

const UserService = {
  signIn(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/signin`, data)
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

export default UserService;
