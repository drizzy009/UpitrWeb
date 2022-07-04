<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:max-w-9xl lg:mx-auto lg:px-8">
        <div class="
            py-6
            md:flex md:items-center md:justify-between
            lg:border-t lg:border-gray-200
          ">
          <div class="flex-1 min-w-0">
            <!-- Profile -->
            <div class="flex items-center">
              <img
                class="hidden h-16 w-16 rounded-full sm:block"
                src="../../assets/images/user-avatar.png"
                alt=""
              />
              <div>
                <div class="flex items-center">
                  
                  <h1 class="
                      ml-3
                      text-2xl
                      font-medium
                      leading-7
                      text-gray-900
                      sm:leading-9 sm:truncate
                    ">
                    Hello, {{ loginInfo.firstname }} {{ loginInfo.lastname }}
                  </h1>
                </div>
                <dl class="
                    mt-6
                    flex flex-col
                    sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap
                  ">
                  <dt class="sr-only">Company</dt>
                  <dd class="
                      flex
                      items-center
                      text-sm text-gray-500
                      font-medium
                      capitalize
                      sm:mr-6
                    ">
                    <OfficeBuildingIcon
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {{loginInfo.department.name}}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">            
            <!-- <button
              type="button"
              class="
                inline-flex
                items-center
                px-4
                py-2
                border border-transparent
                shadow-sm
                text-sm
                font-medium
                rounded-sm
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
              "
            >
              <CalendarIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-white"
                aria-hidden="true"
              />
              My Activities
            </button> -->
            <!-- <IconButton label="My Activities">
              <CalendarIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-white"
                aria-hidden="true"
              />
            </IconButton> -->
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <div class="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-lg leading-6 font-medium text-gray-900">Overview</h2>
        <div class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Card -->
          <div
            v-for="card in cards"
            :key="card.name"
            class="bg-white overflow-hidden shadow-lg rounded-xl"
          >
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <component
                    :is="card.icon"
                    class="h-10 w-10 text-indigo-400
                    "
                    aria-hidden="true"
                  />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-regular text-gray-500 text-right truncate">
                      {{ card.name }}
                    </dt>
                    <dd>
                      <div class="font-medium text-gray-900">
                        <h2 class="text-2xl text-right">{{ card.amount }}</h2>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm flex justify-end">
                <a
                  :href="card.href"
                  class="inline-flex items-center font-medium pl-2 pr-1 bg-indigo-500 text-white rounded-xl hover:bg-indigo-400"
                >
                  View all
                  <ChevronRightIcon
                      class="flex-shrink-0 h-3 w-3 text-white"
                      aria-hidden="true"
                    />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class=" max-w-9xl
          mx-auto
          mt-8
          px-4
          text-lg
          leading-6
          font-medium
          text-gray-900
          sm:px-6
          lg:px-8
        ">
        Recent Candidates
      </h2>      

      <div class="hidden sm:block">
        <div class="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col mt-4">
            <div class="
                bg-white 
                align-middle
                min-w-full
                overflow-x-auto
                shadow
                overflow-hidden
                sm:rounded-lg
              ">
              <template v-if="loading">
                <SkeletonLoading></SkeletonLoading>
              </template>
              <ul v-if="!loading"
                role="list"
                class="divide-y divide-gray-200"
              >
                <li
                  v-for="candidate in dashboardData.candidates"
                  :key="candidate.email"
                >
                  <a
                    :href="candidate.href"
                    class="block hover:bg-gray-50"
                  >
                    <div class="flex items-center px-4 py-4 sm:px-6">
                      <div class="min-w-0 flex-1 flex items-center">
                        <div class="flex-shrink-0">
                          <img v-if="candidate.photo"
                            class="h-12 w-12 rounded-full"
                            :src="candidate.photo"
                            alt=""
                          />
                          <UserCircleIcon v-if="!candidate.photo"
                          class="h-14 w-14 text-indigo-400"
                          />
                        </div>
                        <div class="
                            min-w-0
                            flex-1
                            px-4
                            md:grid md:grid-cols-2 md:gap-4
                          ">
                          <div>
                            <p class="
                                text-sm
                                text-gray-600
                                truncate
                                font-semibold
                              ">
                              {{ candidate.firstname }} {{ candidate.lastname }}
                            </p>
                            <p class="
                                mt-2
                                flex
                                items-center
                                text-sm text-gray-500
                              ">
                              <BriefcaseIcon
                                class="
                                  flex-shrink-0
                                  mr-1.5
                                  h-5
                                  w-5
                                  text-gray-400
                                "
                                aria-hidden="true"
                              />
                              <span class="truncate">{{
                                candidate.job.title
                              }}</span>
                            </p>
                          </div>
                          <div class="hidden md:block">
                            <div>
                              <p class="text-sm text-gray-900">
                                Applied on
                                {{ " " }}
                                {{formatAppDate(candidate.created_at)}}
                              </p>
                              <p class="
                                  mt-2
                                  flex
                                  items-center
                                  text-sm text-gray-500
                                ">
                                <CheckCircleIcon
                                  class="
                                    flex-shrink-0
                                    mr-1.5
                                    h-5
                                    w-5
                                    text-green-400
                                  "
                                  aria-hidden="true"
                                />
                                {{ candidate.job_workflow_stage.description }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <a
                          :href="`/candidate/detail/${candidate.id}`">
                          <ChevronRightIcon
                            class="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h2 class=" max-w-9xl
          mx-auto
          mt-8
          px-4
          text-lg
          leading-6
          font-medium
          text-gray-900
          sm:px-6
          lg:px-8
        ">
        Recent Vacancies
      </h2>
 

      <div class="hidden sm:block">
        <div class="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white mt-4 shadow overflow-hidden sm:rounded-md ">
            <template v-if="loading">
              <SkeletonLoading></SkeletonLoading>
            </template>

            <ul v-if="!loading"
              role="list"
              class="divide-y divide-gray-200"
            >
              <li
                v-for="vacancy in dashboardData.vacancies"
                :key="vacancy.id"
              >
                <a
                  href="#"
                  class="block hover:bg-gray-50"
                >
                  <div class="px-4 py-4 flex items-center sm:px-6">
                    <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div class="truncate">
                        <div class="flex text-sm">
                          <p class="font-semibold text-gray-600 truncate">{{ vacancy.title }}</p>
                          <!-- <p class="ml-1 flex-shrink-0 font-normal text-gray-500">in {{ vacancy.department.name }}</p> -->
                        </div>
                        <div class="mt-2 flex">
                          <div class="flex items-center text-sm text-gray-500">
                            <CalendarIcon
                              class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              Closing on
                              {{ ' ' }}
                              {{formatAppDate(vacancy.deadline)}}
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div class="flex overflow-hidden -space-x-1">
                          <img
                            v-for="applicant in vacancy.applicants"
                            :key="applicant.email"
                            class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                            :src="applicant.imageUrl"
                            :alt="applicant.name"
                          />
                        </div>
                      </div> -->
                    </div>
                    <div class="ml-5 flex-shrink-0">
                      <a
                        :href="`/vacancy/detail/${vacancy.id}`">
                        <ChevronRightIcon
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
// import {} from "@headlessui/vue";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  UserGroupIcon,
  UserCircleIcon,
  CalendarIcon} from "@heroicons/vue/outline";
import {
} from "@heroicons/vue/solid";

import { FormatLongDate2 } from '../../util/Formatter';
import { useAuthentication } from "./../../stores/authentication";
import DashboardService from "../../service/dashboard.service";

const { loginInfo } = storeToRefs(useAuthentication());
const loading = ref(false);
const dashboardData = ref({
  active_candidates: 0,
  active_vacancies: 0,
  activities: [],
  candidates: [],
  upcoming_activities: 0,
  vacancies: []
})

const cards = ref([
  { 
    name: "Active Vacancies", 
    href: "/vacancy/all", icon: 
    BriefcaseIcon, amount: "0" 
  },
  {
    name: "Active Candidates",
    href: "/candidate/all",
    icon: UserGroupIcon,
    amount: "0",
  },
  {
    name: "Upcoming Activities",
    href: "/activity/all",
    icon: CalendarIcon,
    amount: "0",
  },
]);

function formatAppDate(dateValue) {
  return FormatLongDate2(dateValue);
}


onMounted(() => {
  loading.value = true;
  DashboardService.get().then(response => {
    const { data } = response.data;
    dashboardData.value = data;
    cards.value[0].amount = dashboardData.value.active_vacancies;
    cards.value[1].amount = dashboardData.value.active_candidates;
    cards.value[2].amount = dashboardData.value.upcoming_activities;
  }).catch(() => {})
  .finally(() => {
    loading.value = false;
  })
})

</script>
