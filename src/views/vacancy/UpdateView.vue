<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div class="
            py-3
            md:flex md:items-center md:justify-between
            lg:border-t lg:border-gray-200
          ">
          <div class="flex-1 min-w-0">
            <!-- Profile -->
            <div class="flex items-center">
              <span class="inline-block h-16 w-16 rounded-full overflow-hidden bg-sky-200 pt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-sky-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <div>
                <div class="flex items-center">
                  <img
                    class="h-16 w-16 rounded-full sm:hidden"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                    alt=""
                  />
                  <h1 class="
                      ml-3
                      text-2xl
                      font-bold
                      leading-7
                      text-gray-900
                      sm:leading-9 sm:truncate
                    ">
                    Manage Vacancies
                  </h1>
                </div>
                <div class="
                    mt-1
                    flex flex-col
                    sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap
                  ">
                  <p class="text-sm text-gray-400">Manage all of the organisation's job vacancies</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
            <button
              type="button"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-sky-700 bg-sky-200 hover:bg-sky-200"
            >
              <PlusCircleIcon
                class="flex-shrink-0 h-5 w-5 text-sky"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              @click="open = true"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-sky-700 bg-sky-200 hover:bg-sky-200"
            >
              <FilterIcon
                class="flex-shrink-0 h-5 w-5 text-sky"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-sky-700 bg-sky-200 hover:bg-sky-200"
            >
              <DownloadIcon
                class="flex-shrink-0 h-5 w-5 text-sky"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
      <div class="flex flex-col mt-2">
        <div class="
            align-middle
            min-w-full
            overflow-x-auto
            shadow
            overflow-hidden
            sm:rounded-lg
          ">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >SN</th>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >Vacancy</th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Type</th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Location</th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Due Date</th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Status</th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Level</th>
                <th
                  scope="col"
                  class="relative py-3.5 pl-3 pr-4 sm:pr-6"
                >
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="job in jobs"
                :key="job.id"
              >
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:pl-6">
                  {{ job.id }}
                </td>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-sky-200">
                        <span class="text-xl font-medium leading-none text-sky-700">{{ job.position[0] }}</span>
                      </span>
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">{{ job.position }}</div>
                      <div class="text-gray-500">{{ job.department }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="text-gray-900"><span class="inline-flex rounded-full bg-sky-100 px-2 text-xs font-semibold leading-5 text-sky-800">{{ job.type }}</span></div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <LocationMarkerIcon
                      class="flex-shrink-0 mr-1 w-4 text-gray-400"
                      aria-hidden="true"
                    />{{ job.location }}
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <CalendarIcon
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      Closing in
                      {{ ' ' }}
                      <time :datetime="job.duedate">{{ job.deadline }}</time>
                    </p>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ job.level }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Menu
                    as="div"
                    class="relative inline-block text-left"
                  >
                    <div>
                      <MenuButton class="bg-sky-100 rounded-full flex items-center text-sky-400  p-1 hover:text-gray-600">
                        <span class="sr-only">Open options</span>
                        <DotsVerticalIcon
                          class="h-5 w-5"
                          aria-hidden="true"
                        />
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
                      <MenuItems class="origin-top-right z-20 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                        <div class="py-1">
                          <MenuItem v-slot="{ active }">
                          <a
                            href="#"
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']"
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
                            href="#"
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']"
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
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']"
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
                            :class="[active ? 'bg-red-100 text-red-900' : 'text-red-700', 'group flex items-center px-4 py-2 text-sm']"
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
            class="
              bg-white
              px-4
              py-3
              flex
              items-center
              justify-between
              border-t border-gray-200
              sm:px-6
            "
            aria-label="Pagination"
          >
            <div class="hidden sm:block">
              <p class="text-sm text-gray-700">
                Showing
                {{ " " }}
                <span class="font-medium">1</span>
                {{ " " }}
                to
                {{ " " }}
                <span class="font-medium">10</span>
                {{ " " }}
                of
                {{ " " }}
                <span class="font-medium">20</span>
                {{ " " }}
                results
              </p>
            </div>
            <div class="flex-1 flex justify-between sm:justify-end">
              <a
                href="#"
                class="
                  relative
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-gray-300
                  text-sm
                  font-medium
                  rounded-md
                  text-gray-700
                  bg-white
                  hover:bg-gray-50
                "
              >
                Previous
              </a>
              <a
                href="#"
                class="
                  ml-3
                  relative
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-gray-300
                  text-sm
                  font-medium
                  rounded-md
                  text-gray-700
                  bg-white
                  hover:bg-gray-50
                "
              >
                Next
              </a>
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
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                <div class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  <div class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                    <div class="px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-lg font-medium text-gray-900"> Filter Vacancies </DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                            @click="open = false"
                          >
                            <span class="sr-only">Close panel</span>
                            <XIcon
                              class="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <!-- Replace with your content -->
                      <div
                        class="h-full border-2 border-dashed border-gray-200"
                        aria-hidden="true"
                      />
                      <!-- /End replace -->
                    </div>
                  </div>
                  <div class="flex flex-shrink-0 justify-end px-4 py-4">
                    <button
                      type="button"
                      class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 "
                      @click="open = false"
                    >Cancel</button>
                    <button
                      type="submit"
                      class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700"
                    >Search</button>
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
} from "@heroicons/vue/solid";
import { ref } from "vue";
import { DotsVerticalIcon,  ClipboardListIcon } from "@heroicons/vue/solid";
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

const open = ref(false);

const jobs = [
  {
    position: "Fullstack Developer",
    department: "Engineering Department",
    code: "ROV-001",
    level: "Senior Developer",
    duedate: "2020-01-07",
    deadline: "5 Days",
    location: "Lagos",
    type: "Full time",
    id: 1,
  },
  {
    position: "Frontend Developer",
    department: "Engineering Department",
    code: "ROV-002",
    level: "Senior Developer",
    duedate: "2020-01-07",
    deadline: "5 Days",
    location: "Lagos",
    type: "Full time",
    id: 2,
  },
  {
    position: "Backend Developer",
    department: "Engineering Department",
    code: "ROV-003",
    level: "Senior Developer",
    duedate: "2020-01-07",
    deadline: "5 Days",
    location: "Remote",
    type: "Full time",
    id: 3,
  },
];
</script>
