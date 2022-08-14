import { defineStore } from "pinia";
import AuthService from "../service/authentication.service";
import TokenService from "../service/token.service";

export const useAuthentication = defineStore({
    id: "authentication",
    state: () => ({
        error: false,
        loginInfo: null,
        tokenInfo: null,
        successful: false,
        authenticating: false,
        isAuthenticated: false,
        errorMessage: "",
        returnUrl: "",
        newUserEmail: "",
    }),
    getters: {},
    actions: {
        loginUser(payload) {
            this.error = false;
            this.errorMessage = "";
            this.authenticating = true;
            AuthService.signIn(payload).then(result => {
                const { data } = result.data;
                this.loginInfo = data.user;
                this.tokenInfo = data.access;
                this.isAuthenticated = true;
                TokenService.saveToken(data.access.token)
                this.successful = true;
            }).catch((error) => {
                this.errorMessage = error.data.message
                this.error = true;
            }).finally(() => {
                this.authenticating = false;
            })
        },
        setLoginInfo(payload) {
            this.loginInfo = payload.user;
            this.tokenInfo = payload.access;
            this.isAuthenticated = true;
            TokenService.saveToken(payload.access.token)
        },
        logOut() {
            this.loginInfo = null;
            this.tokenInfo = null;
            this.isAuthenticated = false;
            TokenService.destroyToken();
        },
        setNewUserEmail(payload) {
            this.newUserEmail = payload;
        }
    },
    persist: true
})