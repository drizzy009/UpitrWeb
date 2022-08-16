import { defineStore } from "pinia";
import MiscService from "../service/miscellaneous.service";

export const useMiscellaneous = defineStore({
  id: "miscellaneous",
  state: () => ({
    countries: [],
    userTypes: [],
    industries: [],
    currencies: [],
    designations: [],
    jobFunctions: [],
    questionTypes: [],
    activityTypes: [],
    employmentTypes: [],
    educationLevels: [],
    experienceLevels: [],
    activityRelations: [],
    activityImportance: [],
    degreeClassifications: [],
  }),
  getters: {},
  actions: {
    fetchCountries() {
      MiscService.getCountries().then((response) => {
        this.countries = response.data.data;
      });
    },
    fetchIndustries() {
      MiscService.getIndustries().then((response) => {
        this.industries = response.data.data;
      });
    },
    fetchCurrencies() {
      MiscService.getCurrencies().then((response) => {
        this.currencies = response.data.data;
      });
    },
    fetchDesignations() {
      MiscService.getDesignations().then((response) => {
        this.designations = response.data.data;
      });
    },
    fetchJobFunctions() {
      MiscService.getJobFunctions().then((response) => {
        this.jobFunctions = response.data.data;
      });
    },
    fetchEmploymentTypes() {
      MiscService.getEmploymentTypes().then((response) => {
        this.employmentTypes = response.data.data;
      });
    },
    fetchEducationLevels() {
      MiscService.getEducationLevels().then((response) => {
        this.educationLevels = response.data.data;
      });
    },
    fetchExperienceLevels() {
      MiscService.getExperienceLevels().then((response) => {
        this.experienceLevels = response.data.data;
      });
    },
    fetchQuestionTypes() {
      MiscService.getQuestionTypes().then((response) => {
        this.questionTypes = response.data.data;
      });
    },
    fetchDegreeClassification() {
      MiscService.getDegreeClassifications().then((response) => {
        this.degreeClassifications = response.data.data;
      });
    },
    fetchActivityImportance() {
      MiscService.getActivityImportance().then((response) => {
        this.activityImportance = response.data.data;
      });
    },
    fetchActivityType() {
      MiscService.getActivityType().then((response) => {
        this.activityTypes = response.data.data;
      });
    },
    fetchActivityRelations() {
      MiscService.getActivityRelations().then((response) => {
        this.activityRelations = response.data.data;
      });
    },
    fetchUserTypes() {
      MiscService.getUserTypes().then((response) => {
        this.userTypes = response.data.data;
      });
    },
  },
  persist: true,
});
