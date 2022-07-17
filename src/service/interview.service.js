import axios from "axios";
const basePath = "applicant-interviews";

const VacancyService = {
  all(id) {
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
  applicantInterview(id) {
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
  singleByInterviewId(id) {
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
  saveInterviewFeedback(payload) {
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
  getVacancyInterview(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/vacancy-interviews/${id}`)
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
