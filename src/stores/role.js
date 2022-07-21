import { defineStore } from "pinia";
import RoleService from '../service/role.service';

export const useRole = defineStore({
    id: "role",
    state: () => ({
        roles: [],
        permissions: [],
        isError: false,
        isSuccess: false,
        errorMessage: "",
        successMessage: "",
        processing: false,
    }),
    getters:{},
    actions: {
        fetchAllRoles() {
            this.processing = true;
            RoleService.all().then(response => {
                this.roles = response.data.data
            }).catch((error) => {
                this.errorMessage = error.data.message
                this.error = true;
            }).finally(() => {
                this.processing = false;
            })
        },
        fetchAllPermissions() {
            this.processing = true;
            RoleService.allPermissions().then(response => {
                this.permissions = response.data.data
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