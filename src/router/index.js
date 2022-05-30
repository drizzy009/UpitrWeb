import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/authentication/LoginView.vue";
import DashboardView from "../views/dashboard/DashboardView.vue";
import ManageVacancyView from "../views/vacancy/ManageView.vue";
import CreateVacancyView from "../views/vacancy/CreateView.vue";
import VacancyDetailsView from "../views/vacancy/DetailView.vue";
import ManageCandidates from "../views/candidate/ManageCandidates.vue";
import CreateCandidate from "../views/candidate/CreateCandidate.vue";
import CandidateDetail from "../views/candidate/CandidateDetail.vue";
import ManageDepartments from "../views/department/ManageDepartment.vue";

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
      redirect: "login",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "Login",
          path: "login",
          meta: {
            pageTitle: "Login",
          },
          component: LoginView,
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
    },
    {
      path: "/",
      redirect: "candidate",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "ManageCandidates",
          path: "candidate/all",
          meta: {
            pageTitle: "Manage Candidates",
          },
          component: ManageCandidates,
        },
        {
          name: "CreateCandidate",
          path: "candidate/create",
          meta: {
            pageTitle: "Create Candidate",
          },
          component: CreateCandidate,
        },
        {
          name: "CandidateDetail",
          path: "candidate/detail",
          meta: {
            pageTitle: "Candidate Details",
          },
          component: CandidateDetail,
        },
      ],
    },
    {
      path: "/",
      redirect: "department",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "ManageDepartments",
          path: "department/all",
          meta: {
            pageTitle: "Manage Departments",
          },
          component: ManageDepartments,
        },
        // {
        //   name: "CreateCandidate",
        //   path: "candidate/create",
        //   meta: {
        //     pageTitle: "Create Candidate",
        //   },
        //   component: CreateCandidate,
        // },
        // {
        //   name: "CandidateDetail",
        //   path: "candidate/detail",
        //   meta: {
        //     pageTitle: "Candidate Details",
        //   },
        //   component: CandidateDetail,
        // },
      ],
    }
  ],
});

export default router;
