<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div class="
            py-6
            md:flex md:items-center md:justify-between
            lg:border-t lg:border-gray-200
          ">
          <div class="flex-1 min-w-0">
            <!-- Profile -->
            <div class="flex items-center">
              <UserCircleIcon class="h-16 w-16 rounded-full sm:block"></UserCircleIcon>
              <!-- <img
                class="hidden h-16 w-16 rounded-full sm:block"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                alt=""
              /> -->
              <div>
                <div class="flex items-center">
                  <UserCircleIcon class="h-16 w-16 rounded-full sm:hidden"></UserCircleIcon>
                  <!-- <img
                    class="h-16 w-16 rounded-full sm:hidden"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                    alt=""
                  /> -->
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
            <IconButton label="My Activities">
              <CalendarIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-white"
                aria-hidden="true"
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <h2 class=" max-w-7xl
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

      <template v-if="applications.length === 0">
        <SkeletonLoading></SkeletonLoading>
      </template>

      <div v-if="applications.length > 0" class="hidden sm:block">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <ul
                role="list"
                class="divide-y divide-gray-200"
              >
                <li
                  v-for="application in applications"
                  :key="application.email"
                >
                  <a
                    :href="application.href"
                    class="block hover:bg-gray-50"
                  >
                    <div class="flex items-center px-4 py-4 sm:px-6">
                      <div class="min-w-0 flex-1 flex items-center">
                        <div class="flex-shrink-0">
                          <img
                            class="h-12 w-12 rounded-full"
                            :src="application.photo"
                            alt=""
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
                              {{ application.firstname }} {{ application.lastname }}
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
                                application.job.title
                              }}</span>
                            </p>
                          </div>
                          <div class="hidden md:block">
                            <div>
                              <p class="text-sm text-gray-900">
                                Applied on
                                {{ " " }}
                                {{formatAppDate(application.created_at)}}
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
                                {{ application.job_workflow_stage.description }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h2 class=" max-w-7xl
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

      <template v-if="recentVacancies.length === 0">
        <SkeletonLoading></SkeletonLoading>
      </template>

      <div v-if="recentVacancies.length > 0" class="hidden sm:block">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white mt-4 shadow overflow-hidden sm:rounded-md ">
            <ul
              role="list"
              class="divide-y divide-gray-200"
            >
              <li
                v-for="vacancy in recentVacancies"
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
                          <p class="ml-1 flex-shrink-0 font-normal text-gray-500">in {{ vacancy.department.name }}</p>
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
                      <ChevronRightIcon
                        class="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
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
import { ref, watch, onMounted } from "vue";
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
import { useVacancies } from "../../stores/vacancies";
import { useCandidates } from "../../stores/candidate";
import { useAuthentication } from "./../../stores/authentication";

const { vacancies } = storeToRefs(useVacancies());
const { candidates } = storeToRefs(useCandidates());
const { loginInfo } = storeToRefs(useAuthentication());
const recentVacancies = ref([]);
const vacancyCount = ref(0);

const cards = ref([
  { name: "Active Vacancies", href: "#", icon: BriefcaseIcon, amount: "0" },
  {
    name: "Active Candidates",
    href: "#",
    icon: UserGroupIcon,
    amount: "0",
  },
  {
    name: "Shortlisted Candidates",
    href: "#",
    icon: UserGroupIcon,
    amount: "0",
  },
]);

const applications = ref([]);

const positions = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
    applicants: [
      {
        name: "Dries Vincent",
        email: "dries.vincent@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        email: "lindsay.walton@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        email: "courtney.henry@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        email: "tom.cook@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
    applicants: [
      {
        name: "Whitney Francis",
        email: "whitney.francis@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Leonard Krasner",
        email: "leonard.krasner@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Floyd Miles",
        email: "floy.dmiles@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
    applicants: [
      {
        name: "Emily Selman",
        email: "emily.selman@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Kristin Watson",
        email: "kristin.watson@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Emma Dorsey",
        email: "emma.dorsey@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
];

function formatAppDate(dateValue) {
  return FormatLongDate2(dateValue);
}

watch(() => vacancies.value, (newValue) => {
  // vacancyCount.value = newValue.data.length;
  cards.value[0].amount = newValue.data.length;
  if (newValue.data.length > 0) {
    recentVacancies.value = newValue.data.slice(0, 3);
  }
});

watch(() => candidates.value, (newValue) => {
  cards.value[1].amount = newValue.data.length;
  cards.value[2].amount = newValue.data.length;

  if(newValue.data.length > 0) {
    applications.value = newValue.data.slice(0, 3);
  }
});

onMounted(() => {
  // console.clear();
  // console.log(vacancies.value);
  // vacancyCount.value = vacancies.value.data.length();
})

</script>
