<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:max-w-9xl lg:mx-auto">
        <div class="py-3 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
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
                  placeholder="Search Vacancies"
                  type="text"
                  v-model="searchForm.keyword"
                />
                <!-- <input
                  id="search-field"
                  name="search-field"
                  class="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Search Vacancies"
                  type="search"
                /> -->
              </div>
            </form>

            <!-- Profile -->
          </div>
          <div class="flex mt-6 space-x-3 md:mt-0 md:ml-4">
            <IconButton
              type="button"
              @click="goto('CreateVacancy')"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <PlusCircleIcon
                class="flex-shrink-0 w-5 h-5 text-indigo"
                aria-hidden="true"
              />
              New Vacancy
            </IconButton>

            <IconButton
              type="button"
              @click="open = true"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <FilterIcon
                class="flex-shrink-0 w-5 h-5 text-indigo"
                aria-hidden="true"
              />
              Advanced Filter
            </IconButton>

            <button
              type="button"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <DownloadIcon
                class="flex-shrink-0 w-5 h-5 text-indigo"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              @click="refreshData"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-200 hover:bg-green-200"
            >
              <RefreshIcon
                class="flex-shrink-0 w-5 h-5 text-green"
                aria-hidden="true"
              />
            </button>
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
                  Vacancy
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Location
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Level
                </th>
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
              <tr v-for="(vacancy, index) in serverResponse.data" :key="vacancy.id">
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div class="text-gray-900">
                    <span class="inline-flex px-2 text-xs font-semibold">{{ (index + 1) + (serverResponse.current_page - 1) * serverResponse.per_page }}</span>
                  </div>
                </td>
                <td class="py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <span
                        class="inline-flex items-center justify-center w-10 h-10 bg-indigo-200 rounded-full"
                      >
                        <span
                          class="text-xl font-medium leading-none text-indigo-700"
                          >{{ vacancy.title[0] }}</span
                        >
                      </span>
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">
                        {{ vacancy.title }}
                      </div>
                      <div class="text-gray-500">
                        {{ vacancy.department.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div class="text-gray-900">
                    <span class="inline-flex px-2 text-xs font-semibold leading-5 text-indigo-800 bg-indigo-100 rounded-full">{{ vacancy.employment_type.name }}</span>
                  </div>
                </td>
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div
                    class="flex items-center mt-2 text-sm text-gray-500 sm:mt-0"
                  >
                    <LocationMarkerIcon
                      class="flex-shrink-0 w-4 mr-1 text-gray-400"
                      aria-hidden="true"
                    />
                    <span v-if="vacancy.is_remote !== null">{{
                      vacancy.is_remote ? "Remote" : "On-site"
                    }}</span>
                    <span v-if="vacancy.is_remote === null">On-site</span>
                  </div>
                  <!-- <div class="text-gray-500">{{ vacancy.department }}</div> -->
                </td>
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div
                    class="flex items-center mt-2 text-sm text-gray-500 sm:mt-0"
                  >
                    <CalendarIcon
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      Closing
                      {{ " " }}
                      {{ getClosingDays(vacancy.deadline) }}
                    </p>
                  </div>
                </td>
                <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div class="text-gray-900">
                    {{ vacancy.experience_level.name }}
                    <!-- <span class="inline-flex px-2 text-xs font-semibold leading-5 text-indigo-800 bg-indigo-100 rounded-full"></span> -->
                  </div>
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
                              :href="`edit/${vacancy.id}`"
                              :class="[
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm',
                              ]"
                            >
                              <PencilAltIcon
                                class="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              Edit
                            </a>
                          </MenuItem>
                          <MenuItem v-slot="{ active }">
                            <a
                              :href="`detail/${vacancy.id}`"
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
                        <div class="py-1">
                          <MenuItem v-slot="{ active }">
                            <a
                              @click="deleteVacancy(vacancy.id)"
                              :class="[
                                active ? 'bg-red-100 text-red-900' : 'text-red-700',
                                'cursor-pointer group flex items-center px-4 py-2 text-sm',
                              ]"
                            >
                              <TrashIcon
                                class="w-5 h-5 mr-3 text-red-400 group-hover:text-red-500"
                                aria-hidden="true"
                              />
                              Delete
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
            </div>
          </nav>
        </div>
      </div>
    </div>
  </main>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="open = false"
    >
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
                        <DialogTitle class="text-lg font-medium text-gray-900">
                          Filter Vacancies
                        </DialogTitle>
                        <div class="flex items-center ml-3 h-7">
                          <button
                            type="button"
                            class="text-gray-400 bg-white rounded-md hover:text-gray-500"
                            @click="open = false"
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
                            Filter by department
                          </h3>
                          <MultiSelect
                            searchable
                            value="id"
                            label="name"
                            valueProp="id"
                            placeholder="Select a department"
                            v-model="searchForm.department"
                            :options="departmentList"
                            class="mt-1"
                          ></MultiSelect>
                          <!-- <SelectInput
                            :items="departmentList"
                            v-model="searchForm.department"
                            placeholder="Select department"
                            class="mt-1"
                          ></SelectInput> -->
                        </div>
                        <div>
                          <h3
                            class="mt-4 text-xs font-medium leading-6 text-gray-900"
                          >
                            Start Date
                          </h3>
                          <DateInput
                            type="date"
                            v-model="searchForm.deadline_start"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <h3
                            class="mt-4 text-xs font-medium leading-6 text-gray-900"
                          >
                            End Date
                          </h3>
                          <DateInput
                            type="date"
                            v-model="searchForm.deadline_end"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end flex-shrink-0 px-4 py-4">
                    <button
                      type="button"
                      class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                      @click="open = false"
                    >
                      Cancel
                    </button>
                    <AppButton
                      type="submit"
                      :processing="loading"
                      @click="searchVacancies"
                      label="Search"
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
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, inject } from "vue";
import { useToast } from "vue-toastification";
import {
  TrashIcon,
  FilterIcon,
  SearchIcon,
  RefreshIcon,
  DownloadIcon,
  CalendarIcon,
  PencilAltIcon,
  PlusCircleIcon,
  LocationMarkerIcon,
} from "@heroicons/vue/solid";
import { DotsVerticalIcon, ClipboardListIcon } from "@heroicons/vue/solid";
import {
  Menu,
  Dialog,
  MenuItem,
  MenuItems,
  MenuButton,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import { ConvertDateToDays } from "../../util/Formatter";
import { useDepartments } from "../../stores/department";
import VacancyService from "../../service/vacancies.service";

const departmentStore = useDepartments();
const { departments } = departmentStore;

const open = ref(false);
const loading = ref(false);
const processing = ref(false);
const departmentList = ref([]);

const toast = useToast();
const swal = inject('$swal');

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
  deadline_start: "",
  deadline_end: "",
  department: "",
});

const router = useRouter();

function onSearchChange(value) {
  if (value.length > 3) {
    searchForm.value.keyword = value;
    processing.value = true;
    VacancyService.all(`keyword=${value}`)
      .then((response) => {
        serverResponse.value = response.data.data;
      })
      .catch(() => {})
      .finally(() => {
        processing.value = false;
      });
  }

  if (value.length <= 3) {
    processing.value = true;
    VacancyService.all()
      .then((response) => {
        serverResponse.value = response.data.data;
      })
      .catch(() => {})
      .finally(() => {
        processing.value = false;
      });
  }
}

function navigateTo(link) {
  processing.value = true;
  var url = `${link}&page_size=10&`;
  Object.keys(searchForm.value).forEach((key) => {
    if (searchForm.value[key] !== "") {
      url += `${key}=${searchForm.value[key]}&`;
    }
  });

  VacancyService.get(url)
    .then((result) => {
      serverResponse.value = result.data.data;
    })
    .catch(() => {})
    .finally(() => {
      processing.value = false;
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

function goto(name) {
  router.push({ name: name });
}

function getClosingDays(dateValue) {
  return ConvertDateToDays(dateValue);
}

function fetchVacancies(slug = "") {
  slug += "page_size=10";
  loading.value = true;
  serverResponse.value.data = [];
  VacancyService.all(slug)
    .then((result) => {
      const resData = result.data;
      serverResponse.value = resData.data;
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false;
    });
}

function searchVacancies() {
  var slug = "";
  Object.keys(searchForm.value).forEach((key) => {
    if (searchForm.value[key] !== "" && searchForm.value[key] !== null) {
      slug += `${key}=${searchForm.value[key]}&`;
    }
  });

  fetchVacancies(slug);
}

function refreshData() {
  Object.keys(searchForm.value).forEach((key) => {
    searchForm.value[key] = "";
  });
  fetchVacancies("");
}

function deleteVacancy(id) {
  swal({
    title: "Confirm Delete",
    text: "Are you sure you want to delete this vacancy",
    icon: "question",
    showCancelButton: true,
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      VacancyService.delete(id).then(() => {
        toast("Vacancy successfully deleted");
        fetchVacancies();
      }).catch(() => {})
    }
  });
}

onMounted(() => {
  departmentList.value = departments.data;
  fetchVacancies();
});
</script>
