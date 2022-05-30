import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    pageTitle: "",
  }),
  getters: {
    getPageTitle: (state) => state.pageTitle,
  },
  actions: {
    setPageTitle(value) {
      this.pageTitle = value;
    },
  },
});
