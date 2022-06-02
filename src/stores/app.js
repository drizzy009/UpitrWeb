import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    pageName: "",
    pageTitle: "",
  }),
  getters: {
    getPageTitle: (state) => state.pageTitle,
    getPageName: (state) => state.pageName,
  },
  actions: {
    setPageTitle(value) {
      this.pageTitle = value;
    },

    setPageName(value) {
      this.pageName = value;
    }
  },
});
