<template>
  <template v-if="loading">
    <div>
      <div class="px-4 pt-12 mx-auto max-w-9xl sm:px-6 lg:px-8">
        <SkeletonLoading v-for="n in 5" :key="n"></SkeletonLoading>
      </div>
    </div>
  </template>
  <template v-if="vacancyDetail !== null && !loading">
    <header class="pt-3 bg-gray-100">
      <div
        class="px-4 mx-auto max-w-9xl sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between"
      >
        <div class="flex-1 min-w-0">
          <h1
            class="mt-2 text-xl font-medium leading-7 text-gray-700 uppercase sm:text-xl sm:truncate"
          >
            {{ vacancyDetail.title }}
          </h1>
          <div
            class="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8"
          >
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <BriefcaseIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {{ vacancyDetail.employment_type.name }}
            </div>
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <LocationMarkerIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {{ remoteOffice }}
            </div>
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <CurrencyDollarIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {{ convertToMoney(vacancyDetail.salary_min) }} &ndash;
              {{ convertToMoney(vacancyDetail.salary_max) }}
            </div>
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <CalendarIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Closing on {{ formatClosingData(vacancyDetail.deadline) }}
            </div>
          </div>
        </div>
        <div class="flex mt-5 xl:mt-0 xl:ml-4">
          <span class="hidden ml-3 sm:block">
            <button
              type="button"
              @click="viewApplicants"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              <UserGroupIcon
                class="w-5 h-5 mr-2 -ml-1 text-gray-400"
                aria-hidden="true"
              />
              All Applicants
            </button>
          </span>

          <div class="relative z-0 sm:ml-3">
            <IconButton
              type="submit"
              @click="publishVacancy"
              :processing="processing"
              :label="published ? 'Unpublish' : 'Publish'"
              :class="published ? 'bg-red-600' : 'bg-green-600'"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <BanIcon
                v-if="published"
                class="w-5 h-5 mr-1"
                aria-hidden="true"
              />
              <CheckIcon
                v-if="!published"
                class="w-5 h-5 mr-1"
                aria-hidden="true"
              />
            </IconButton>
          </div>

          <!-- Dropdown -->
          <Menu as="div" class="relative ml-3 sm:hidden">
            <MenuButton
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              More
              <ChevronDownIcon
                class="w-5 h-5 ml-2 -mr-1 text-gray-500"
                aria-hidden="true"
              />
            </MenuButton>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 w-48 py-1 mt-2 -mr-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Edit</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >View</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </header>

    <main class="flex-1 pb-8">
      <div class="px-4 mx-auto mt-6 max-w-9xl sm:px-6 lg:px-6">
        <div class="flex flex-col mt-2">
          <div
            class="min-w-full p-6 overflow-hidden overflow-x-auto align-middle bg-white shadow sm:rounded-lg"
          >
            <div class="px-4 sm:px-0">
              <div>
                <div class="sm:hidden">
                  <label for="tabs" class="sr-only">Select a tab</label>
                  <select
                    id="tabs"
                    name="tabs"
                    class="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option
                      v-for="tab in tabs"
                      :key="tab.name"
                      :selected="tab.current"
                    >
                      {{ tab.name }}
                    </option>
                  </select>
                </div>
                <div class="hidden sm:block">
                  <nav
                    class="relative z-0 flex divide-x divide-gray-200 rounded-lg shadow"
                    aria-label="Tabs"
                  >
                    <a
                      v-for="(tab, tabIdx) in tabs"
                      @click="changeTab(tabIdx)"
                      :key="tab.name"
                      :href="tab.href"
                      :class="[
                        tabIdx == tabIndex
                          ? 'text-gray-900'
                          : 'text-gray-500 hover:text-gray-700',
                        tabIdx === 0 ? 'rounded-l-lg' : '',
                        tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                        'group cursor-pointer relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
                      ]"
                      :aria-current="tab.current ? 'page' : undefined"
                    >
                      <span>{{ tab.name }}</span>
                      <span
                        aria-hidden="true"
                        :class="[
                          tabIdx == tabIndex
                            ? 'bg-indigo-500'
                            : 'bg-transparent',
                          'absolute inset-x-0 bottom-0 h-0.5',
                        ]"
                      ></span>
                    </a>
                  </nav>
                </div>
              </div>

              <CandidateView v-if="serverResponse.data.length > 0" :serverData="serverResponse"></CandidateView>
              <div v-if="loadingCandidates" class="px-4 py-2 mx-auto max-w-9xl sm:px-6 lg:px-8">
                <SkeletonLoading></SkeletonLoading>
              </div>
              <h4
                v-if="serverResponse.data.length === 0 && !loadingCandidates"
                class="p-6 text-center"
              >
                No candidate(s)
              </h4>
              <nav
                class="flex items-center justify-between px-4 border-t border-gray-200 sm:px-0"
                aria-label="Pagination"
              >
                <div class="flex flex-1 w-0 -mt-px">
                  <a
                    @click="navigateTo(serverResponse.prev_page_url)"
                    :disabled="serverResponse.prev_page_url === null"
                    :class="
                      serverResponse.prev_page_url !== null
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                    "
                    class="inline-flex items-center pt-3 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200"
                  >
                    <ArrowNarrowLeftIcon
                      class="w-5 h-5 mr-3 text-gray-400"
                      aria-hidden="true"
                    />
                    Previous
                  </a>
                </div>
                <div v-for="link in serverResponse.links" :key="link.label" class="hidden md:-mt-px md:flex">
                  <a
                    v-if="showPageNumber(link.label)"
                    @click="navigateTo(link.url)"
                    :class="
                      link.active
                        ? 'bg-indigo-700 text-white hover:bg-gray-50 hover:text-gray-700'
                        : 'text-gray-700 bg-white'
                    "
                    class="relative inline-flex items-center px-4 py-2 mt-4 text-sm font-medium border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    {{link.label}}
                  </a>
                </div>
                <div class="flex justify-end flex-1 w-0 -mt-px">
                  <a
                    @click="navigateTo(serverResponse.next_page_url)"
                    :disabled="serverResponse.next_page_url === null"
                    :class="
                      serverResponse.next_page_url !== null
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                    "
                    class="inline-flex items-center pt-3 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200"
                  >
                    Next
                    <ArrowNarrowRightIcon
                      class="w-5 h-5 ml-3 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>

    <main class="pt-8 pb-16">
      <div class="mx-auto max-w-9xl sm:px-6 lg:px-8"></div>
    </main>
  </template>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/vue";
import {
  BanIcon,
  CheckIcon,
  CalendarIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LocationMarkerIcon,
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/vue/solid";
import CandidateView from "./CandidateView.vue";
import VacancyService from "../../service/vacancies.service";
import { FormatMoney, FormatShortDate } from "../../util/Formatter";
// import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const props = defineProps({
  id: Number
});

var tabIndex = ref(0);
const vacancyId = ref(0);
const loading = ref(false);
const loadingCandidates = ref(false);
const router = useRouter();
const published = ref(false);
const processing = ref(false);
const vacancyDetail = ref(null);
const remoteOffice = ref("On-site");

const serverResponse = ref({
  to: 0,
  from: 0,
  total: 0,
  data: [],
  links: [],
  per_page: 0,
  last_page: 0,
  current_page: 0,
  prev_page_url: null,
  next_page_url: null,
  last_page_url: null,
  first_page_url: null,
});

const tabs = ref([]);

function viewApplicants() {
  router.push({ name: 'ManageApplicants', params: { id: vacancyId.value }});
}

function showPageNumber(label) {
  const labelNumber = Number(label);
  return !isNaN(labelNumber);
}

function navigateTo(url) {
  const pageUrl = `${url}&vacancy=${vacancyId.value}&stage=${tabIndex.value + 1}`;
  serverResponse.value.data = [];
  loadingCandidates.value = true;
  VacancyService.get(pageUrl).then((response) => {
    serverResponse.value = response.data.data;
  }).catch(() => {})
  .finally(() => {
    loadingCandidates.value = false;
  });
}

function changeTab(tabIdx) {
  tabIndex.value = tabIdx;
  getVacancyCandidates(tabIdx + 1);
}

function formatClosingData(dateValue) {
  return FormatShortDate(dateValue);
}

function publishVacancy() {
  processing.value = true;
  const id = vacancyDetail.value.id;

  if (!published.value) {
    VacancyService.publish(id)
      .then(() => {
        getVacancyDetail(id);
        published.value = true;
      })
      .catch(() => {})
      .finally(() => {
        processing.value = false;
      });
  }

  if (published.value) {
    VacancyService.unPublish(id)
      .then(() => {
        getVacancyDetail(id);
        published.value = false;
      })
      .catch(() => {})
      .finally(() => {
        processing.value = false;
      });
  }
}

function getVacancyCandidates(stageId) {
  serverResponse.value.data = [];
  loadingCandidates.value = true;
  VacancyService.candidatesByStageId(vacancyId.value, stageId).then((response) => {
    serverResponse.value = response.data.data;
    console.log(serverResponse.value)
  }).catch(() => {})
  .finally(() => {
    loadingCandidates.value = false;
  });
}

function getVacancyDetail(id) {
  loading.value = true;
  VacancyService.single(id).then((response) => {
    const { data } = response.data;
    vacancyDetail.value = data;
    published.value = data.is_published;
    const workflowStages = data.job_workflow.job_workflow_stages;
    console.log(workflowStages);
    tabs.value = workflowStages.map(item => {
      return item;
    })
    if (vacancyDetail.value.is_remote !== null) {
      remoteOffice.value = vacancyDetail.value.is_remote ? "Remote" : "On-site";
    }

    getVacancyCandidates(1);
  }).catch(() => {})
  .finally(() => {
    loading.value = false;
  });
}

function convertToMoney(value) {
  return FormatMoney(value);
}

onMounted(() => {
  if (props.id !== undefined) {
    vacancyId.value = props.id;
    getVacancyDetail(vacancyId.value);
  }
});
</script>
