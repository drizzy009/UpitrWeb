import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/dashboard/DashboardView.vue";
import ManageVacancyView from "../views/vacancy/ManageView.vue";
import CreateVacancyView from "../views/vacancy/CreateView.vue";
import VacancyDetailsView from "../views/vacancy/DetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "dashboard",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "Dashboard",
          path: "dashboard",
          meta: {
            pageTitle: "Dashboard",
          },
          component: DashboardView,
        },
      ],
    },
    {
      path: "/",
      redirect: "vacancy",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "ManageVacancies",
          path: "vacancy/all",
          meta: {
            pageTitle: "Manage Vacancies",
          },
          component: ManageVacancyView,
        },
        {
          name: "CreateVacancy",
          path: "vacancy/create",
          meta: {
            pageTitle: "Create Vacancy",
          },
          component: CreateVacancyView,
        },
        {
          name: "VacancyDetail",
          path: "vacancy/detail",
          meta: {
            pageTitle: "Vacancy Details",
          },
          component: VacancyDetailsView,
        },
      ],
    }
  ],
});

export default router;
