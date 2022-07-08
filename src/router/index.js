import { createRouter, createWebHistory } from "vue-router";

import JobListView from "../views/job/ListView.vue";
import JobDetailView from "../views/job/DetailView.vue";

import LoginView from "../views/authentication/LoginView.vue";
import ForgotPasswordView from "../views/authentication/ForgotPasswordView.vue";

import DashboardView from "../views/dashboard/DashboardView.vue";

import UserListView from "../views/user/ListView.vue";
import UserDetailView from "../views/user/DetailView.vue";

import ManageVacancyView from "../views/vacancy/ManageVacancies.vue";
import CreateVacancyView from "../views/vacancy/CreateView.vue";
import EditVacancyView from "../views/vacancy/EditView.vue";
import VacancyDetailsView from "../views/vacancy/DetailView.vue";

import ManageCandidates from "../views/candidate/ManageCandidates.vue";
import ManageActivities from "../views/activities/ManageActivities.vue";
import CreateCandidate from "../views/candidate/CreateCandidate.vue";
import CandidateDetail from "../views/candidate/CandidateDetail.vue";
import SettingsView from "../views/settings/SettingsView.vue";

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
      redirect: "jobs/all",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "Jobs",
          path: "jobs/all",
          meta: {
            pageTitle: "Jobs",
          },
          component: JobListView,
        },
      ],
    },
    {
      path: "/",
      redirect: "jobs/detail",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "JobDetail",
          path: "jobs/detail",
          meta: {
            pageTitle: "Job Detail",
          },
          component: JobDetailView,
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
      redirect: "forgot-password",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "ForgotPassword",
          path: "forgot-password",
          meta: {
            pageTitle: "ForgotPassword",
          },
          component: ForgotPasswordView,
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
          name: "EditVacancy",
          path: "vacancy/edit/:id",
          meta: {
            pageTitle: "Edit Vacancy",
          },
          component: EditVacancyView,
          props: true,
        },
        {
          name: "VacancyDetail",
          path: "vacancy/detail/:id",
          meta: {
            pageTitle: "Vacancy Details",
          },
          component: VacancyDetailsView,
          props: true,
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
          path: "candidate/detail/:id",
          meta: {
            pageTitle: "Candidate Details",
          },
          component: CandidateDetail,
          props: true,
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
      ],
    },
    {
      path: "/",
      redirect: "activity",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "ManageActivities",
          path: "activity/all",
          meta: {
            pageTitle: "Manage Activities",
          },
          component: ManageActivities,
        },
      ],
    },     
    {
      path: "/",
      redirect: "users/all",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "Users",
          path: "users/all",
          meta: {
            pageTitle: "Users",
          },
          component: UserListView,
        },
      ],
    },
    {
      path: "/",
      redirect: "users/detail",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "UserDetail",
          path: "users/detail",
          meta: {
            pageTitle: "User Detail",
          },
          component: UserDetailView,
        },
      ],
    },
    {
      path: "/",
      redirect: "settings",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "Settings",
          path: "settings",
          meta: {
            pageTitle: "Settings",
          },
          component: SettingsView,
        },
      ],
    },
  ],
});

export default router;
