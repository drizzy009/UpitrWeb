<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:max-w-9xl lg:mx-auto lg:px-8">
        <div
          class="py-3 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
        >
          <div class="flex-1 min-w-0">
            <form class="flex w-full md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div
                class="relative w-full text-gray-400 focus-within:text-gray-600"
              >
                <div
                  class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon class="w-5 h-5" aria-hidden="true" />
                </div>
                <input
                  v-debounce:500ms="onSearchChange"
                  id="search-field"
                  name="search-field"
                  class="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Search Candidates"
                  type="text"
                  v-model="searchForm.keyword"
                />
              </div>
            </form>
          </div>
          <div class="flex mt-6 space-x-3 md:mt-0 md:ml-4">
            <IconButton
              type="button"
              @click="openFilter = true"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <FilterIcon
                class="flex-shrink-0 w-5 h-5 text-indigo"
                aria-hidden="true"
              />
              Advanced Filter
            </IconButton>

            <IconButton
              type="button"
              @click="downloadCandidates"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <DownloadIcon
                class="flex-shrink-0 w-5 h-5 text-indigo"
                aria-hidden="true"
              />
            </IconButton>

            <IconButton
              type="button"
              @click="refreshData"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-200 hover:bg-green-200"
            >
              <RefreshIcon
                class="flex-shrink-0 w-5 h-5 text-green"
                aria-hidden="true"
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
    <div class="px-4 mx-auto mt-6 max-w-9xl sm:px-6 lg:px-6">
      <div class="flex flex-col mt-2">
        <div
          class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-0 text-left text-sm font-semibold text-gray-900 sm:pl-4"
                >
                  Sno
                </th>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Job Description
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Gender &amp; Age
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Applied on
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                ></th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading">
                <td colspan="7">
                  <SkeletonLoading v-for="n in 5" :key="n"></SkeletonLoading>
                </td>
              </tr>
              <tr
                v-for="(candidate, index) in serverResponse.data"
                :key="candidate.id"
              >
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div class="text-gray-900">
                    <span class="inline-flex px-2 text-xs font-semibold">{{
                      index +
                      1 +
                      (serverResponse.current_page - 1) *
                        serverResponse.per_page
                    }}</span>
                  </div>
                </td>
                <td class="py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        v-if="candidate.photo"
                        class="w-12 h-12 rounded-full"
                        :src="candidate.photo"
                        alt=""
                      />
                      <UserCircleIcon
                        v-else
                        class="w-10 h-10 text-indigo-400"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">
                        {{ candidate.firstname }} {{ candidate.lastname }} {{ candidate.middlename }}
                      </div>
                      <div class="text-gray-500">{{ candidate.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div class="text-gray-900">
                    {{ candidate.job_function.name }}
                  </div>
                  <div class="text-gray-500">
                    in {{ candidate.industry.name }}
                  </div>
                  <div class="text-gray-500">
                    with {{ candidate.years_of_experience }} years of experience
                  </div>
                </td>
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div>
                    <p class="text-sm text-gray-900">
                      {{ candidate.gender_id === 0 ? "Female" : "Male" }}
                    </p>
                    <p class="mt-2 text-sm text-gray-900">
                      {{ FormatAge(candidate.dob) }} years old
                    </p>
                  </div>
                </td>
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <p class="text-sm text-gray-900">
                    {{ formatAppDate(candidate.created_at) }}
                  </p>
                </td>
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {{ candidate.role }}
                </td>
                <td
                  class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6"
                >
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        class="flex items-center p-1 text-indigo-400 bg-indigo-100 rounded-full hover:text-gray-600"
                      >
                        <span class="sr-only">Open options</span>
                        <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
                      </MenuButton>
                    </div>

                    <transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <MenuItems
                        class="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div class="py-1">
                          <MenuItem v-slot="{ active }">
                            <a
                              :href="`/candidate/detail/${candidate.id}`"
                              :class="[
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm',
                              ]"
                            >
                              <ClipboardListIcon
                                class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              Details
                            </a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <nav
            class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
          >
            <div class="hidden sm:block">
              <p class="text-sm text-gray-700">
                Showing
                {{ " " }}
                <span class="font-medium">{{ serverResponse.from }}</span>
                {{ " " }}
                to
                {{ " " }}
                <span class="font-medium">{{ serverResponse.to }}</span>
                {{ " " }}
                of
                {{ " " }}
                <span class="font-medium">{{ serverResponse.total }}</span>
                {{ " " }}
                results
              </p>
            </div>
            <div class="flex justify-between flex-1 sm:justify-end">
              <div v-for="link in serverResponse.links" :key="link">
                <AppButton
                  @click="navigateTo(link.url)"
                  :disabled="link.url === null || processing"
                  :class="
                    link.active
                      ? 'bg-indigo-700 text-white hover:bg-gray-50 hover:text-gray-700'
                      : 'text-gray-700 bg-white'
                  "
                  class="relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {{ formatLabel(link.label) }}
                </AppButton>
              </div>
              <!-- <AppButton
                label="Previous"
                :disabled="serverResponse.prev_page_url === null"
                @click="previousPage"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
              </AppButton>
              <AppButton
                label="Next"
                :disabled="serverResponse.next_page_url === null"
                @click="nextPage"
                class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
              </AppButton> -->
            </div>
          </nav>
        </div>
      </div>
    </div>

    <TransitionRoot as="template" :show="openFilter">
      <Dialog as="div" class="relative z-10" @close="openFilter = false">
        <div class="fixed inset-0" />

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none"
            >
              <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <DialogPanel class="w-screen max-w-md pointer-events-auto">
                  <div
                    class="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl"
                  >
                    <div
                      class="flex flex-col flex-1 min-h-0 py-6 overflow-y-scroll"
                    >
                      <div class="px-4 sm:px-6">
                        <div class="flex items-start justify-between">
                          <DialogTitle
                            class="text-lg font-medium text-gray-900"
                          >
                            Advanced Filter
                          </DialogTitle>
                          <div class="flex items-center ml-3 h-7">
                            <button
                              type="button"
                              class="text-gray-400 bg-white rounded-md hover:text-gray-500"
                              @click="openFilter = false"
                            >
                              <span class="sr-only">Close panel</span>
                              <XIcon class="w-6 h-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="relative flex-1 px-4 mt-6 sm:px-6">
                        <div class="flex flex-col">
                          <div>
                            <h3
                              class="mt-4 text-xs font-medium leading-6 text-gray-900"
                            >
                              Filter by Industry
                            </h3>
                            <MultiSelect
                              searchable
                              value="id"
                              label="name"
                              valueProp="id"
                              placeholder="Select an industry"
                              v-model="searchForm.industry"
                              :options="industries"
                            >
                            </MultiSelect>
                          </div>

                          <div>
                            <h3
                              class="mt-4 text-xs font-medium leading-6 text-gray-900"
                            >
                              Filter by Degree
                            </h3>
                            <MultiSelect
                              searchable
                              value="value"
                              label="name"
                              valueProp="value"
                              placeholder="Select degree"
                              v-model="searchForm.degree_class"
                              :options="degreeClassifications"
                            ></MultiSelect>
                          </div>

                          <div>
                            <h3
                              class="mt-4 text-xs font-medium leading-6 text-gray-900"
                            >
                              Filter by Job Functions
                            </h3>
                            <MultiSelect
                              searchable
                              value="id"
                              label="name"
                              valueProp="id"
                              placeholder="Select job function"
                              v-model="searchForm.job_function"
                              :options="jobFunctions"
                            ></MultiSelect>
                          </div>

                          <div>
                            <h3
                              class="mt-4 text-xs font-medium leading-6 text-gray-900"
                            >
                              Filter by Gender
                            </h3>
                            <MultiSelect
                              value="id"
                              label="name"
                              valueProp="id"
                              placeholder="Select gender"
                              v-model="searchForm.gender"
                              :options="genderList"
                            ></MultiSelect>
                          </div>

                          <div>
                            <h3
                              class="mt-4 text-xs font-medium leading-6 text-gray-900"
                            >
                              Filter by Stage
                            </h3>
                            <MultiSelect
                              searchable
                              value="id"
                              label="name"
                              valueProp="id"
                              placeholder="Select a stage"
                              v-model="searchForm.stage"
                              :options="workflowStage"
                            ></MultiSelect>
                          </div>

                          <div>
                            <h3
                              class="mt-4 text-xs font-medium leading-6 text-gray-900"
                            >
                              Filter by Years of experience
                            </h3>
                          </div>
                          <div class="flex flex-row space-x-2">
                            <div class="w-1/2">
                              <h3
                                class="mt-2 text-xs font-medium leading-6 text-gray-900"
                              >
                                Minimum
                              </h3>
                              <NumberInput
                                v-model="searchForm.exp_min"
                                class="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </div>
                            <div class="w-1/2">
                              <h3
                                class="mt-2 text-xs font-medium leading-6 text-gray-900"
                              >
                                Maximum
                              </h3>
                              <NumberInput
                                v-model="searchForm.exp_max"
                                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <h3
                              class="mt-4 text-xs font-medium leading-6 text-gray-900"
                            >
                              Filter by Date of Birth
                            </h3>
                          </div>
                          <div class="flex flex-row space-x-2">
                            <div class="w-1/2">
                              <h3
                                class="mt-2 text-xs font-medium leading-6 text-gray-900"
                              >
                                From
                              </h3>
                              <DateInput
                                type="date"
                                v-model="searchForm.dob_start"
                                class="mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </div>
                            <div class="w-1/2">
                              <h3
                                class="mt-2 text-xs font-medium leading-6 text-gray-900"
                              >
                                To
                              </h3>
                              <DateInput
                                type="date"
                                v-model="searchForm.dob_end"
                                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-end flex-shrink-0 px-4 py-4">
                      <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                        @click="closeSearch"
                      >
                        Cancel
                      </button>
                      <AppButton
                        type="submit"
                        label="Search"
                        :processing="loading"
                        @click="searchCandidates"
                        class="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                      >
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
  </main>
</template>
<script setup>
import { ref, onMounted, inject } from "vue";
import { storeToRefs } from "pinia";
import { utils, writeFile } from 'xlsx';
import {
  Menu,
  Dialog,
  MenuItem,
  MenuItems,
  MenuButton,
  DialogTitle,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import {
  RefreshIcon,
  FilterIcon,
  DownloadIcon,
  SearchIcon,
  DotsVerticalIcon,
  ClipboardListIcon,
} from "@heroicons/vue/solid";
import { XIcon, UserCircleIcon } from "@heroicons/vue/outline";
import { useVacancies } from "../../stores/vacancies";
import { useMiscellaneous } from "../../stores/miscellaneous";
import { GetUnixTime, FormatAge, FormatLongDate2 } from "../../util/Formatter";
import CandidateService from "../../service/candidate.service";

const vacancyStore = useVacancies();
const { vacancies } = vacancyStore;
const { industries, jobFunctions, degreeClassifications } = storeToRefs(
  useMiscellaneous()
);

const workflowStage = [
  { name: "Sourced", id: 1 },
  { name: "Applied", id: 2 },
  { name: "Assessment", id: 3 },
  { name: "Offered", id: 4 },
  { name: "Hired", id: 5 },
  { name: "Disqualified", id: 6 },
];

const genderList = ref([
  {
    id: 0,
    name: "Female",
  },
  {
    id: 1,
    name: "Male",
  },
]);

const $loading = inject("$loading");

// const candidateList = ref([]);
const openFilter = ref(false);
const vacancyList = ref([]);
const loading = ref(false);
const processing = ref(false);
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

function downloadCandidates() {
  const loader = $loading.show();
  CandidateService.all(`page_size=${serverResponse.value.total}`)
    .then((result) => {
      const { data } = result.data.data;
      let sno = 0;

      const exportData = data.map(candidate => {
        return {
          SN: ++sno,
          Name: `${candidate.firstname} ${candidate.lastname} ${candidate.middlename}`,
          Email: candidate.email,
          "Phone No.": candidate.phone,
          Gender: genderList.value.find(g => g.id === candidate.gender_id).name,
          "Job Function": candidate.job_function.name,
          Industry: candidate.industry.name,
          "Years of Experience": candidate.years_of_experience,
        }
      });

      const time = GetUnixTime();
      const sheet = utils.json_to_sheet(exportData);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, sheet, 'Candidates');
      writeFile(workbook, `candidates_list_${time}.xlsx`);
    })
    .catch(() => {})
    .finally(() => {
      loader.hide();
    });
}

function formatLabel(label) {
  if (label.includes("Prev")) {
    return `<< Previous`;
  }

  if (label.includes("Next")) {
    return "Next >>";
  }

  return label;
}

function getCandidates(slug = "") {
  serverResponse.value.data = [];
  slug += "page_size=10";
  loading.value = true;
  CandidateService.all(slug)
    .then((result) => {
      serverResponse.value = result.data.data;
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false;
    });
}

function onSearchChange(value) {
  if (value.length > 2) {
    searchForm.value.keyword = value;
    getCandidates(`keyword=${value}&`);
  }
}

function navigateTo(link) {
  processing.value = true;
  // serverResponse.value.data = [];
  var url = `${link}&page_size=10&`;
  Object.keys(searchForm.value).forEach((key) => {
    if (searchForm.value[key] !== "") {
      url += `${key}=${searchForm.value[key]}&`;
    }
  });

  CandidateService.get(url)
    .then((result) => {
      serverResponse.value = result.data.data;
    })
    .catch(() => {})
    .finally(() => {
      processing.value = false;
    });
}

function closeSearch() {
  openFilter.value = false;
}

function formatAppDate(dateValue) {
  return FormatLongDate2(dateValue);
}

function searchCandidates() {
  var slug = "";
  Object.keys(searchForm.value).forEach((key) => {
    if (searchForm.value[key] !== "" && searchForm.value[key] !== null) {
      slug += `${key}=${searchForm.value[key]}&`;
    }
  });

  getCandidates(slug);
}

function refreshData() {
  getCandidates();
  Object.keys(searchForm.value).forEach((key) => {
    searchForm.value[key] = "";
  });
}

onMounted(() => {
  getCandidates();
  vacancyList.value = vacancies.data.map((item) => {
    return { id: item.id, name: item.title };
  });
});
</script>
