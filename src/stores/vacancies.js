import { defineStore } from "pinia";
import VacancyService from '../service/vacancies.service';

export const useVacancies = defineStore({
    id: "vacancy",
    state: () => ({
        vacancies: [],
        newVacancy: null,
        isError: false,
        isSuccess: false,
        errorMessage: "",
        successMessage: "",
        processing: false,
    }),
    getters:{},
    actions: {
        reset() {
            this.isError = false;
            this.isSuccess = false;
            this.processing = false;
            this.errorMessage = "";
        },
        fetchAllVacancies() {
            this.processing = true;
            VacancyService.all().then(response => {
                this.vacancies = response.data.data
            }).catch((error) => {
                this.errorMessage = error.data.message
                this.error = true;
            }).finally(() => {
                this.processing = false;
            })
        },
        createVacancy(payload) {
            this.processing = true
            VacancyService.create(payload).then(() => {
                this.successMessage = "Vacancy successfully created"
            }).catch((error) => {
                this.errorMessage = error.data.message
                this.error = true;
            }).finally(() => {
                this.processing = false;
            })
        }
    },
    persist: true
});