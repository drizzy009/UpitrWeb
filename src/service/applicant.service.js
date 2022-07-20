import axios from "axios";
const basePath = "applicants";

const VacancyService = {
  getByVacancyId(id, slug = "") {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/${id}?${slug}`)
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
  singleByApplicantId(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${basePath}/single/${id}`)
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
  changeWorkflowStage(id, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/${basePath}/${id}`, payload)
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
  changeWorkflowStageBulk(payload) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/${basePath}/bulk-move`, payload)
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

export default VacancyService;
