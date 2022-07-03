<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:max-w-9xl lg:mx-auto">
        <div
          class="py-3 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
        >
          <div class="flex-1 min-w-0">
            <form class="w-full flex md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div
                class="relative w-full text-gray-400 focus-within:text-gray-600"
              >
                <div
                  class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  name="search-field"
                  class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Search Vacancies"
                  type="search"
                />
              </div>
            </form>

            <!-- Profile -->
          </div>
          <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
            <button
              type="button"
              @click="goto('CreateVacancy')"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <PlusCircleIcon
                class="flex-shrink-0 h-5 w-5 text-indigo"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              @click="open = true"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <FilterIcon
                class="flex-shrink-0 h-5 w-5 text-indigo"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-200 hover:bg-indigo-200"
            >
              <DownloadIcon
                class="flex-shrink-0 h-5 w-5 text-indigo"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              @click="refreshData"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-200 hover:bg-green-200"
            >
              <RefreshIcon
                class="flex-shrink-0 h-5 w-5 text-green"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-9xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
      <!-- <template v-if="loading">
        <SkeletonLoading v-for="n in 5" :key="n"></SkeletonLoading>
      </template> -->
      <div class="max-w-9xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
        <div class="flex flex-col mt-2">
          <div
            class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
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
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-if="loading">
                  <td colspan="6">
                    <SkeletonLoading v-for="n in 5" :key="n"></SkeletonLoading>
                  </td>
                </tr>
                <tr v-for="vacancy in serverResponse.data" :key="vacancy.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <span
                          class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-200"
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
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="text-gray-900">
                      <span class="inline-flex rounded-full bg-indigo-100 px-2 text-xs font-semibold leading-5 text-indigo-800">{{ vacancy.employment_type.name }}</span>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div
                      class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                    >
                      <LocationMarkerIcon
                        class="flex-shrink-0 mr-1 w-4 text-gray-400"
                        aria-hidden="true"
                      />
                      <span v-if="vacancy.is_remote !== null">{{
                        vacancy.is_remote ? "Remote" : "On-site"
                      }}</span>
                      <span v-if="vacancy.is_remote === null">On-site</span>
                    </div>
                    <!-- <div class="text-gray-500">{{ vacancy.department }}</div> -->
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div
                      class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
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
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="text-gray-900">
                      {{ vacancy.experience_level.name }}
                      <!-- <span class="inline-flex rounded-full bg-indigo-100 px-2 text-xs font-semibold leading-5 text-indigo-800"></span> -->
                    </div>
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton
                          class="bg-indigo-100 rounded-full flex items-center text-indigo-400 p-1 hover:text-gray-600"
                        >
                          <span class="sr-only">Open options</span>
                          <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                        </MenuButton>
                      </div>

                      <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                      >
                        <MenuItems
                          class="origin-top-right z-20 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                        >
                          <div class="py-1">
                            <MenuItem v-slot="{ active }">
                              <a
                                href="#"
                                :class="[
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'group flex items-center px-4 py-2 text-sm',
                                ]"
                              >
                                <PencilAltIcon
                                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                Details
                              </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                              <a
                                href="#"
                                :class="[
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'group flex items-center px-4 py-2 text-sm',
                                ]"
                              >
                                <DuplicateIcon
                                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                Duplicate
                              </a>
                            </MenuItem>
                          </div>
                          <div class="py-1">
                            <MenuItem v-slot="{ active }">
                              <a
                                href="#"
                                :class="[
                                  active ? 'bg-red-100 text-red-900' : 'text-red-700',
                                  'group flex items-center px-4 py-2 text-sm',
                                ]"
                              >
                                <TrashIcon
                                  class="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500"
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
              class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
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
              <div class="flex-1 flex justify-between sm:justify-end">
                <div v-for="link in serverResponse.links" :key="link">
                  <AppButton
                    @click="navigateTo(link.url)"
                    :disabled="link.url === null || processing"
                    :class="
                      link.active
                        ? 'bg-indigo-700 text-white hover:bg-gray-50 hover:text-gray-700'
                        : 'text-gray-700 bg-white'
                    "
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50"
                  >
                    {{ formatLabel(link.label) }}
                  </AppButton>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </main>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
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
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                >
                  <div
                    class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6"
                  >
                    <div class="px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-lg font-medium text-gray-900">
                          Filter Vacancies
                        </DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                            @click="open = false"
                          >
                            <span class="sr-only">Close panel</span>
                            <XIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <div class="flex flex-col">
                        <FormInput
                          v-model="searchForm.keyword"
                          placeholder="Search by vacancy name/description"
                        ></FormInput>
                        <div>
                          <h3
                            class="text-xs mt-4 leading-6 font-medium text-gray-900"
                          >
                            Filter by department
                          </h3>
                          <SelectInput
                            :items="departmentList"
                            v-model="searchForm.department"
                            placeholder="Select department"
                            class="mt-1"
                          ></SelectInput>
                        </div>
                        <div>
                          <h3
                            class="text-xs mt-4 leading-6 font-medium text-gray-900"
                          >
                            Start Date
                          </h3>
                          <DateInput
                            type="date"
                            v-model="searchForm.deadline_start"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <h3
                            class="text-xs mt-4 leading-6 font-medium text-gray-900"
                          >
                            End Date
                          </h3>
                          <DateInput
                            type="date"
                            v-model="searchForm.deadline_end"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-shrink-0 justify-end px-4 py-4">
                    <button
                      type="button"
                      class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      @click="open = false"
                    >
                      Cancel
                    </button>
                    <AppButton
                      type="submit"
                      :processing="loading"
                      @click="searchVacancies"
                      label="Search"
                      class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
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
import {
  CalendarIcon,
  LocationMarkerIcon,
  PlusCircleIcon,
  RefreshIcon,
  FilterIcon,
  DownloadIcon,
  DuplicateIcon,
  PencilAltIcon,
  TrashIcon,
  SearchIcon,
} from "@heroicons/vue/solid";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { DotsVerticalIcon, ClipboardListIcon } from "@heroicons/vue/solid";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import { ConvertDateToDays } from "../../util/Formatter";
import { useDepartments } from "../../stores/department";
import VacancyService from "../../service/vacancies.service";

const departmentStore = useDepartments();
const { departments } = departmentStore;
const departmentList = ref([]);
const open = ref(false);
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
  deadline_start: "",
  deadline_end: "",
  department: "",
});

const router = useRouter();

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
  if (label.includes('Prev')) {
    return `<< Previous`;
  }

  if (label.includes('Next')) {
    return 'Next >>';
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
    if (searchForm.value[key] !== "") {
      slug += `${key}=${searchForm.value[key]}&`;
    }
  });

  fetchVacancies(slug);
}

function refreshData() {
  fetchVacancies("");
}

onMounted(() => {
  departmentList.value = departments.data;
  fetchVacancies();
});
</script>
