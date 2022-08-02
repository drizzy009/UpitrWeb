import axios from "axios";
const basePath = "activities";

const ActivityService = {
  get(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
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
  all(slug = "") {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}?${slug}`)
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
  single(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/${id}`)
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
  create(payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}`, payload)
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
  interview(payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}/interview`, payload)
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
  update(id, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${basePath}`, payload)
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
  delete(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/${basePath}/${id}`)
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

export default ActivityService;
