<template>
  <div class="bg-white shadow">
    <div class="px-4 sm:px-6 lg:max-w-9xl lg:mx-auto lg:px-8">
      <div class="py-3 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
        <div class="flex-1 min-w-0">
          <form class="flex w-full md:ml-0">
            <label for="search-field" class="sr-only">Search</label>
            <div class="relative w-full text-gray-400 focus-within:text-gray-600">
              <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
                <SearchIcon class="w-5 h-5" aria-hidden="true" />
              </div>
              <input v-debounce:500ms="onSearchChange" id="search-field" name="search-field"
                class="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search Applicants" type="text" />
            </div>
          </form>
        </div>
        <div class="flex mt-6 space-x-3 md:mt-0 md:ml-4">
          <IconButton label="Adanced Filter" @click="openFilter = true"
            class="text-indigo-700 bg-indigo-200 hover:bg-indigo-200">
            <FilterIcon class="flex-shrink-0 w-5 h-5 text-indigo" aria-hidden="true" />
          </IconButton>

          <button type="button"
            class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200">
            <DownloadIcon class="flex-shrink-0 w-5 h-5 text-indigo" aria-hidden="true" />
          </button>

          <button type="button" @click="refreshData"
            class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-200 hover:bg-green-200">
            <RefreshIcon class="flex-shrink-0 w-5 h-5 text-green" aria-hidden="true" />
          </button>
          <IconButton class="bg-green-600 hover:bg-green-500" @click="backToDetail">
            <ArrowCircleLeftIcon class="flex-shrink-0 w-5 h-5 text-green" aria-hidden="true" />
          </IconButton>
        </div>
      </div>
    </div>
  </div>
  <template v-if="loading">
    <div>
      <div class="px-4 pt-12 mx-auto max-w-9xl sm:px-6 lg:px-8">
        <SkeletonLoading v-for="n in 5" :key="n"></SkeletonLoading>
      </div>
    </div>
  </template>
  <template v-if="vacancyDetail !== null">
    <header class="pt-3 bg-gray-100">
      <div class="px-4 mx-auto max-w-9xl sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
        <div class="flex-1 min-w-0">
          <h1 class="mt-2 text-xl font-medium leading-7 text-gray-700 uppercase sm:text-xl sm:truncate">
            {{ vacancyDetail.title }}
          </h1>
          <div class="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <BriefcaseIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              {{ vacancyDetail.employment_type.name }}
            </div>
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <LocationMarkerIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              {{ remoteOffice }}
            </div>
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <CurrencyDollarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              {{ convertToMoney(vacancyDetail.salary_min) }} &ndash;
              {{ convertToMoney(vacancyDetail.salary_max) }}
            </div>
            <div class="flex items-center mt-2 text-sm text-gray-500">
              <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              Closing on {{ formatClosingData(vacancyDetail.deadline) }}
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 pb-8">
      <div class="px-4 mx-auto mt-6 max-w-9xl sm:px-6 lg:px-6">
        <div class="flex flex-col mt-2">
          <div class="min-w-full p-6 overflow-x-auto align-middle bg-white shadow overscroll-y-contain sm:rounded-lg">
            <div class="px-4 sm:px-0">
              <div v-if="loadingApplicants && serverResponse.data.length === 0"
                class="px-4 py-2 mx-auto max-w-9xl sm:px-6 lg:px-8">
                <SkeletonLoading></SkeletonLoading>
              </div>
              <ApplicantView @selected="onSelectedItems" v-if="serverResponse.data.length > 0"
                :applicants="serverResponse.data"></ApplicantView>
              <h4 v-if="serverResponse.data.length === 0 && !loadingApplicants" class="p-6 text-center">
                No applicant(s)
              </h4>
              <!-- Pagination -->
              <nav class="flex items-center justify-between px-4 border-t border-gray-200 sm:px-0"
                aria-label="Pagination">
                <div class="flex flex-1 w-0 -mt-px">
                  <a @click="navigateTo(serverResponse.prev_page_url)" :disabled="serverResponse.prev_page_url === null"
                    :class="
                      serverResponse.prev_page_url !== null
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                    "
                    class="inline-flex items-center pt-3 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200">
                    <ArrowNarrowLeftIcon class="w-5 h-5 mr-3 text-gray-400" aria-hidden="true" />
                    Previous
                  </a>
                </div>
                <div v-for="link in serverResponse.links" :key="link.label" class="hidden md:-mt-px md:flex">
                  <a v-if="showPageNumber(link.label)" @click="navigateTo(link.url)" :class="
                    link.active
                      ? 'bg-indigo-700 text-white hover:bg-gray-50 hover:text-gray-700'
                      : 'text-gray-700 bg-white'
                  "
                    class="relative inline-flex items-center px-4 py-2 mt-4 text-sm font-medium border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    {{ link.label }}
                  </a>
                </div>
                <div class="flex justify-end flex-1 w-0 -mt-px">
                  <a @click="navigateTo(serverResponse.next_page_url)" :disabled="serverResponse.next_page_url === null"
                    :class="
                      serverResponse.next_page_url !== null
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                    "
                    class="inline-flex items-center pt-3 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-200">
                    Next
                    <ArrowNarrowRightIcon class="w-5 h-5 ml-3 text-gray-400" aria-hidden="true" />
                  </a>
                </div>
              </nav>
              <!-- Pagination -->
              <div class="w-1/5 mx-auto">
                <div class="flex flex-row items-center mt-4">
                  <!-- <label class="w-2/5 mr-2 text-xs">Rows per page</label> -->
                  <MultiSelect value="id" label="label" valueProp="id" placeholder="Select page size"
                    v-model="searchForm.page_size" :options="PageSizes" class="text-xs"></MultiSelect>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- <main class="pt-8 pb-16">
      <div class="mx-auto max-w-9xl sm:px-6 lg:px-8"></div>
    </main> -->

    <TransitionRoot as="template" :show="openFilter">
      <Dialog as="div" class="relative z-10" @close="openFilter = false">
        <div class="fixed inset-0" />

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full" enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
                leave-to="translate-x-full">
                <DialogPanel class="w-screen max-w-md pointer-events-auto">
                  <div class="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
                    <div class="flex flex-col flex-1 min-h-0 py-6 overflow-y-scroll">
                      <div class="px-4 sm:px-6">
                        <div class="flex items-start justify-between">
                          <DialogTitle class="text-lg font-medium text-gray-900">
                            Advanced Filter
                          </DialogTitle>
                          <div class="flex items-center ml-3 h-7">
                            <button type="button" class="text-gray-400 bg-white rounded-md hover:text-gray-500"
                              @click="openFilter = false">
                              <span class="sr-only">Close panel</span>
                              <XIcon class="w-6 h-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="relative flex-1 px-4 mt-6 sm:px-6">
                        <div class="flex flex-col">
                          <div>
                            <h3 class="mt-4 text-xs font-medium leading-6 text-gray-900">
                              Filter by Industry
                            </h3>
                            <MultiSelect searchable value="id" label="name" valueProp="id"
                              placeholder="Select an industry" v-model="searchForm.industry" :options="industries">
                            </MultiSelect>
                          </div>

                          <div>
                            <h3 class="mt-4 text-xs font-medium leading-6 text-gray-900">
                              Filter by Degree
                            </h3>
                            <MultiSelect searchable value="value" label="name" valueProp="value"
                              placeholder="Select degree" v-model="searchForm.degree_class"
                              :options="degreeClassifications"></MultiSelect>
                          </div>

                          <div>
                            <h3 class="mt-4 text-xs font-medium leading-6 text-gray-900">
                              Filter by Job Functions
                            </h3>
                            <MultiSelect searchable value="id" label="name" valueProp="id"
                              placeholder="Select job function" v-model="searchForm.job_function"
                              :options="jobFunctions"></MultiSelect>
                          </div>

                          <div>
                            <h3 class="mt-4 text-xs font-medium leading-6 text-gray-900">
                              Filter by Gender
                            </h3>
                            <MultiSelect value="id" label="name" valueProp="id" placeholder="Select gender"
                              v-model="searchForm.gender" :options="genderList"></MultiSelect>
                          </div>

                          <div>
                            <h3 class="mt-4 text-xs font-medium leading-6 text-gray-900">
                              Filter by Stage
                            </h3>
                            <MultiSelect searchable value="id" label="name" valueProp="id" placeholder="Select a stage"
                              v-model="searchForm.stage" :options="workflowStage"></MultiSelect>
                          </div>

                          <div>
                            <h3 class="mt-4 text-xs font-medium leading-6 text-gray-900">
                              Filter by Years of experience
                            </h3>
                          </div>
                          <div class="flex flex-row space-x-2">
                            <div class="w-1/2">
                              <h3 class="mt-2 text-xs font-medium leading-6 text-gray-900">
                                Minimum
                              </h3>
                              <NumberInput v-model="searchForm.exp_min"
                                class="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div class="w-1/2">
                              <h3 class="mt-2 text-xs font-medium leading-6 text-gray-900">
                                Maximum
                              </h3>
                              <NumberInput v-model="searchForm.exp_max"
                                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                          </div>

                          <div>
                            <h3 class="mt-4 text-xs font-medium leading-6 text-gray-900">
                              Filter by Date of Birth
                            </h3>
                          </div>
                          <div class="flex flex-row space-x-2">
                            <div class="w-1/2">
                              <h3 class="mt-2 text-xs font-medium leading-6 text-gray-900">
                                From
                              </h3>
                              <DateInput type="date" v-model="searchForm.dob_start"
                                class="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div class="w-1/2">
                              <h3 class="mt-2 text-xs font-medium leading-6 text-gray-900">
                                To
                              </h3>
                              <DateInput type="date" v-model="searchForm.dob_end"
                                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-end flex-shrink-0 px-4 py-4">
                      <button type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                        @click="openFilter = false">
                        Cancel
                      </button>
                      <AppButton type="submit" label="Search" :processing="loadingApplicants" @click="searchApplicants"
                        class="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
                      </AppButton>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  FilterIcon,
  SearchIcon,
  RefreshIcon,
  DownloadIcon,
  CalendarIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  LocationMarkerIcon,
  ArrowNarrowLeftIcon,
  ArrowCircleLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/vue/solid";
import ApplicantView from "./ApplicantView.vue";
import VacancyService from "../../service/vacancies.service";
import ApplicantService from "../../service/applicant.service";
import { FormatMoney, FormatShortDate } from "../../util/Formatter";
import { useMiscellaneous } from "../../stores/miscellaneous";
import { PageSizes } from "../../util/Constants";

const props = defineProps({
  id: String
});

const {
  industries,
  jobFunctions,
  degreeClassifications
} = storeToRefs(useMiscellaneous());

var tabIndex = ref(0);
const vacancyId = ref(0);
const loading = ref(false);
const openFilter = ref(false);
const loadingApplicants = ref(false);
const router = useRouter();
const published = ref(false);
const processing = ref(false);
const vacancyDetail = ref(null);
const remoteOffice = ref("On-site");
const searchForm = ref({
  keyword: "",
  dob_start: "",
  dob_end: "",
  gender: "",
  degree_class: "",
  industry: "",
  job_function: "",
  exp_min: "",
  exp_max: "",
  stage: "",
  page_size: "",
});

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

const workflowStage = [
  { name: "Sourced", id: 1 },
  { name: "Applied", id: 2, },
  { name: "Assessment", id: 3 },
  { name: "Offered", id: 4, },
  { name: "Hired", id: 5, },
  { name: "Disqualified", id: 6, },
];

const genderList = ref([
  {
    id: 0,
    name: "Female",
  },
  {
    id: 1,
    name: "Male"
  }
])

function backToDetail() {
  router.push({ name: "VacancyDetail", params: { id: vacancyId.value } });
}

function onSearchChange(value) {
  if (value.length > 3) {
    searchForm.value.keyword = value;
    processing.value = true
    ApplicantService.getByVacancyId(vacancyId.value, `keyword=${value}`).then(response => {
      console.log(response);
    }).catch(() => { })
      .finally(() => {
        processing.value = false;
      })
  }
}

function showPageNumber(label) {
  const labelNumber = Number(label);
  return !isNaN(labelNumber);
}

function navigateTo(url) {
  const pageUrl = `${url}&vacancy=${vacancyId.value}&stage=${tabIndex.value + 1}`;
  serverResponse.value.data = [];
  loadingApplicants.value = true;
  VacancyService.get(pageUrl).then((response) => {
    serverResponse.value = response.data.data;
  }).catch(() => { })
    .finally(() => {
      loadingApplicants.value = false;
    });
}

function formatClosingData(dateValue) {
  return FormatShortDate(dateValue);
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
  }).catch(() => { })
    .finally(() => {
      loading.value = false;
      getApplicants(id);
    });
}

function getApplicants(id) {
  loadingApplicants.value = true;
  ApplicantService.getByVacancyId(id).then(response => {
    serverResponse.value = response.data.data;
  }).catch(() => { })
    .finally(() => {
      loadingApplicants.value = false;
    })
}

function convertToMoney(value) {
  return FormatMoney(value);
}

function searchApplicants() {
  loadingApplicants.value = true;
  serverResponse.value.data = [];
  var slug = "";
  Object.keys(searchForm.value).forEach((key) => {
    if (searchForm.value[key] !== "") {
      slug += `${key}=${searchForm.value[key]}&`;
    }
  });

  ApplicantService.getByVacancyId(vacancyId.value, slug).then(response => {
    serverResponse.value = response.data.data;
  }).catch(() => { })
    .finally(() => {
      loadingApplicants.value = false;
    })
}

function refreshData() {
  vacancyDetail.value = null;
  getVacancyDetail(vacancyId.value);
  Object.keys(searchForm.value).forEach((key) => {
    searchForm.value[key] = ""
  });
}

function onSelectedItems(items) {
  console.log(items);
}

onMounted(() => {
  if (props.id !== undefined) {
    vacancyId.value = Number(props.id);
    getVacancyDetail(vacancyId.value);
  }
});
</script>
