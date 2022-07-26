import { createRouter, createWebHistory } from "vue-router";

import JobListView from "../views/job/ListView.vue";
import JobDetailView from "../views/job/DetailView.vue";

import LoginView from "../views/authentication/LoginView.vue";
import ResetPasswordView from "../views/authentication/ResetPasswordView.vue";
import ForgotPasswordView from "../views/authentication/ForgotPasswordView.vue";

import DashboardView from "../views/dashboard/DashboardView.vue";

import UserListView from "../views/user/ListView.vue";
import UserDetailView from "../views/user/DetailView.vue";

import ManageVacancyView from "../views/vacancy/ManageVacancies.vue";
import CreateVacancyView from "../views/vacancy/CreateView.vue";
import EditVacancyView from "../views/vacancy/EditView.vue";
import VacancyDetailsView from "../views/vacancy/VacancyDetailView.vue";
import ManageApplicants from "../views/vacancy/ManageApplicants.vue";
import ApplicantDetail from "../views/applicant/ApplicantDetail.vue";

import ManageCandidates from "../views/candidate/ManageCandidates.vue";
import ManageActivities from "../views/activities/ManageActivities.vue";
import CreateCandidate from "../views/candidate/CreateCandidate.vue";
import CandidateDetail from "../views/candidate/CandidateDetail.vue";
import SettingsView from "../views/settings/SettingsView.vue";

import ManageRole from "../views/role/ManageRole.vue";
import CreateRole from "../views/role/CreateRole.vue";
import EditRole from "../views/role/EditRole.vue";

import ManageUser from "../views/user/ManageUser.vue";
import CreateUser from "../views/user/CreateUser.vue";
import EditUser from "../views/user/EditUser.vue";

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
      redirect: "reset-password",
      component: () => import("../views/layouts/SaturnLayout.vue"),
      children: [
        {
          name: "ResetPassword",
          path: "reset-password",
          meta: {
            pageTitle: "Reset Password",
          },
          component: ResetPasswordView,
          props: route => ({ query: route.query.email })
        },
      ],
    },
    {
      path: "/",
      redirect: "applicant",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "ApplicantDetail",
          path: "applicant/detail/:id/:interviewId",
          meta: {
            pageTitle: "Applicant Detail"
          },
          component: ApplicantDetail,
          props: true,
        }
      ]
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
        {
          name: "ManageApplicants",
          path: "vacancy/applicants/:id",
          meta: {
            pageTitle: "Manage Applicants"
          },
          component: ManageApplicants,
          props: true
        }
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
    {
      path: "/",
      redirect: "role",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "ManageRole",
          path: "role",
          meta: {
            pageTitle: "Manage Roles",
          },
          component: ManageRole,
        },
        {
          name: "NewRole",
          path: "role/new",
          meta: {
            pageTitle: "Create New Role",
          },
          component: CreateRole,
        },
        {
          name: "EditRole",
          path: "role/edit/:id",
          meta: {
            pageTitle: "Edit Role",
          },
          component: EditRole,
          props: true
        },
      ],
    },
    {
      path: "/",
      redirect: "user",
      component: () => import("../views/layouts/JupiterLayout.vue"),
      children: [
        {
          name: "ManageUser",
          path: "user",
          meta: {
            pageTitle: "Manage Users",
          },
          component: ManageUser,
        },
        {
          name: "NewUser",
          path: "user/new",
          meta: {
            pageTitle: "Create New User",
          },
          component: CreateUser,
        },
        {
          name: "EditUser",
          path: "user/edit/:id",
          meta: {
            pageTitle: "Edit User",
          },
          component: EditUser,
          props: true,
        },
      ],
    },
  ],
});

export default router;
