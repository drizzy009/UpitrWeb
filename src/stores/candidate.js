import { defineStore } from "pinia";
import CandidateService from '../service/candidate.service';

export const useCandidates = defineStore({
    id: "candidate",
    state: () => ({
        candidates: [],
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
        fetchAllCandidates(slug) {
            this.processing = true;
            CandidateService.all(slug).then(response => {
                this.candidates = response.data.data
            }).catch((error) => {
                this.errorMessage = error.data.message
                this.error = true;
            }).finally(() => {
                this.processing = false;
            })
        },
        createCandidate(payload) {
            this.processing = true
            CandidateService.create(payload).then(() => {
                this.successMessage = "Candidate successfully created"
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