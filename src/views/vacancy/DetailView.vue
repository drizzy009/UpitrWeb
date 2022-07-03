<template>
  <template v-if="loading">
    <div>
      <div class="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <SkeletonLoading v-for="n in 5" :key="n"></SkeletonLoading>
      </div>
    </div>
  </template>
  <template v-if="vacancyDetail !== null">
    <header class="bg-gray-100 pt-3">
      <div
        class="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between"
      >
        <div class="flex-1 min-w-0">
          <h1
            class="mt-2 text-xl font-medium leading-7 uppercase text-gray-700 sm:text-xl sm:truncate"
          >
            {{ vacancyDetail.title }}
          </h1>
          <div
            class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8"
          >
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {{ vacancyDetail.employment_type.name }}
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <LocationMarkerIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {{ remoteOffice }}
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <CurrencyDollarIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {{ vacancyDetail.salary_min }} &ndash;
              {{ vacancyDetail.salary_max }}
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Closing on {{ formatClosingData(vacancyDetail.deadline) }}
            </div>
          </div>
        </div>
        <div class="mt-5 flex xl:mt-0 xl:ml-4">
          <!-- <span class="hidden sm:block">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              <PencilIcon
                class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Edit
            </button>
          </span> -->

          <!-- <span class="hidden sm:block ml-3">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              <UserGroupIcon
                class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Candidates
            </button>
          </span> -->

          <div class="sm:ml-3 relative z-0">
            <IconButton
              type="submit"
              @click="publishVacancy"
              :processing="processing"
              :label="published ? 'Unpublish' : 'Publish'"
              :class="published ? 'bg-red-600' : 'bg-green-600'"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <BanIcon
                v-if="published"
                class="h-5 w-5 mr-1"
                aria-hidden="true"
              />
              <CheckIcon
                v-if="!published"
                class="h-5 w-5 mr-1"
                aria-hidden="true"
              />
            </IconButton>
          </div>

          <!-- Dropdown -->
          <Menu as="div" class="ml-3 relative sm:hidden">
            <MenuButton
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              More
              <ChevronDownIcon
                class="-mr-1 ml-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </MenuButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
      <div class="max-w-9xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
        <div class="flex flex-col mt-2">
          <div
            class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg p-6 bg-white"
          >
            <div class="px-4 sm:px-0">
              <div>
                <div class="sm:hidden">
                  <label for="tabs" class="sr-only">Select a tab</label>
                  <select
                    id="tabs"
                    name="tabs"
                    class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
                    class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
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
                        'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
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

              <CandidateView v-if="serverResponse.data.length > 0" :candidates="serverResponse.data"></CandidateView>
              <div v-if="loadingCandidates" class="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <SkeletonLoading></SkeletonLoading>
              </div>
              <h4
                v-if="serverResponse.data.length === 0 && !loadingCandidates"
                class="text-center p-6"
              >
                No candidate(s)
              </h4>
              <nav
                class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
                aria-label="Pagination"
              >
                <div class="-mt-px w-0 flex-1 flex">
                  <a
                    @click="navigateTo(serverResponse.prev_page_url)"
                    :disabled="serverResponse.prev_page_url === null"
                    :class="
                      serverResponse.prev_page_url !== null
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                    "
                    class="border-t-2 border-transparent pt-3 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
                  >
                    <ArrowNarrowLeftIcon
                      class="mr-3 h-5 w-5 text-gray-400"
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
                    class="cursor-pointer relative inline-flex items-center px-4 py-2 mt-4 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50"
                  >
                    {{link.label}}
                  </a>
                </div>
                <div class="-mt-px w-0 flex-1 flex justify-end">
                  <a
                    @click="navigateTo(serverResponse.next_page_url)"
                    :disabled="serverResponse.next_page_url === null"
                    :class="
                      serverResponse.next_page_url !== null
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                    "
                    class="border-t-2 border-transparent pt-3 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
                  >
                    Next
                    <ArrowNarrowRightIcon
                      class="ml-3 h-5 w-5 text-gray-400"
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
      <div class="max-w-9xl mx-auto sm:px-6 lg:px-8"></div>
    </main>
  </template>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/vue";
import {
  CheckIcon,
  PencilIcon,
  CalendarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LocationMarkerIcon,
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  BanIcon,
} from "@heroicons/vue/solid";
import CandidateView from "./CandidateView.vue";
import VacancyService from "../../service/vacancies.service";
import { FormatShortDate } from "../../util/Formatter";
// import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
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

const tabs = [
  { name: "Sourced", href: "#", count: "2", current: true },
  { name: "Applied", href: "#", count: "4", current: false },
  { name: "Assessment", href: "#", count: "6", current: false },
  { name: "Offered", href: "#", current: false },
  { name: "Hired", href: "#", current: false },
  { name: "Disqualified", href: "#", current: false },
];

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
    if (vacancyDetail.value.is_remote !== null) {
      remoteOffice.value = vacancyDetail.value.is_remote ? "Remote" : "On-site";
    }

    getVacancyCandidates(1);
  }).catch(() => {})
  .finally(() => {
    loading.value = false;
  });
}

onMounted(() => {
  const { id } = router.currentRoute.value.params;
  if (id !== undefined) {
    vacancyId.value = Number(id);
    getVacancyDetail(vacancyId.value);
  }
});
</script>
