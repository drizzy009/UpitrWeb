import axios from "axios";
const basePath = "account";

const AccountService = {
  changePassword(payload) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/${basePath}/change-password`, payload)
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

export default AccountService;
