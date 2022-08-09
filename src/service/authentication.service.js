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
  forgotPassword(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/forgot-password`, data)
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
  resetPassword(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/reset-password`, data)
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
  setPassword(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/set-password`, data)
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
  }
};

export default UserService;
