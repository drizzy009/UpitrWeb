<template>
  <header class="bg-gray-100 pt-3">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
      <div class="flex-1 min-w-0">
        <h1 class="mt-2 text-xl font-medium leading-7 uppercase text-gray-700 sm:text-xl sm:truncate">Back End Developer</h1>
        <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon
              class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Full-time
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <LocationMarkerIcon
              class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Remote
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon
              class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            $120k &ndash; $140k
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon
              class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Closing on January 9, 2020
          </div>
        </div>
      </div>
      <div class="mt-5 flex xl:mt-0 xl:ml-4">
        <span class="hidden sm:block">
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
        </span>

        <span class="hidden sm:block ml-3">
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
        </span>

        <div class="sm:ml-3 relative z-0">
          <Listbox
            as="div"
            v-model="selected"
          >
            <ListboxLabel class="sr-only"> Change published status </ListboxLabel>
            <div class="relative">
              <div class="inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                  <div class="relative inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                    <CheckIcon
                      class="h-5 w-5"
                      aria-hidden="true"
                    />
                    <p class="ml-2.5 text-sm font-medium">{{ selected.name }}</p>
                  </div>
                  <ListboxButton class="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                    <span class="sr-only">Change published status</span>
                    <ChevronDownIcon
                      class="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </ListboxButton>
                </div>
              </div>

              <transition
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions class="origin-top-right absolute left-0 mt-2 -mr-1 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
                  <ListboxOption
                    as="template"
                    v-for="option in publishingOptions"
                    :key="option.name"
                    :value="option"
                    v-slot="{ active, selected }"
                  >
                    <li :class="[active ? 'text-white bg-indigo-500' : 'text-gray-900', 'cursor-default select-none relative p-4 text-sm']">
                      <div class="flex flex-col">
                        <div class="flex justify-between">
                          <p :class="selected ? 'font-semibold' : 'font-normal'">
                            {{ option.name }}
                          </p>
                          <span
                            v-if="selected"
                            :class="active ? 'text-white' : 'text-indigo-500'"
                          >
                            <CheckIcon
                              class="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <p :class="[active ? 'text-indigo-200' : 'text-gray-500', 'mt-2']">
                          {{ option.description }}
                        </p>
                      </div>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>

        <!-- Dropdown -->
        <Menu
          as="div"
          class="ml-3 relative sm:hidden"
        >
          <MenuButton class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
            <MenuItems class="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
              >Edit</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
              >View</a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </header>

  <main class="flex-1 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
      <div class="flex flex-col mt-2">
        <div class="
            align-middle
            min-w-full
            overflow-x-auto
            shadow
            overflow-hidden
            sm:rounded-lg
            p-6
            bg-white
          ">
          <div class="px-4 sm:px-0">
            <h2 class="text-lg font-medium text-gray-900">Candidates</h2>
            <TabGroup>
              <TabList class="flex rounded- mt-4">
                <Tab
                  as="template"
                  v-for="item in tabList"
                  :key="item.id"
                  v-slot="{ selected }"
                  :aria-current="selected ? 'page' : undefined"
                >
                  <button
                    :class="[
                      'workflow-tab workflow-enabled-tab',
                      selected
                        ? 'border-b border-b-indigo-500 text-indigo-600'
                        : `text-${item.color}-500`,
                    ]"
                  >
                    {{ item.title }}
                  </button>
                </Tab>
              </TabList>
            </TabGroup>
          </div>

          <!-- Stacked list -->
          <ul
            role="list"
            class="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
          >
            <li
              v-for="candidate in candidates"
              :key="candidate.email"
            >
              <a
                href="#"
                class="group block"
              >
                <div class="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                  <div class="min-w-0 flex-1 flex items-center">
                    <div class="flex-shrink-0">
                      <img
                        class="h-12 w-12 rounded-full group-hover:opacity-75"
                        :src="candidate.imageUrl"
                        alt=""
                      />
                    </div>
                    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p class="text-sm font-medium text-indigo-600 truncate">{{ candidate.name }}</p>
                        <p class="mt-2 flex items-center text-sm text-gray-500">
                          <MailIcon
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span class="truncate">{{ candidate.email }}</span>
                        </p>
                      </div>
                      <div class="hidden md:block">
                        <div>
                          <p class="text-sm text-gray-900">
                            Applied on
                            {{ ' ' }}
                            <time :datetime="candidate.appliedDatetime">{{ candidate.applied }}</time>
                          </p>
                          <p class="mt-2 flex items-center text-sm text-gray-500">
                            <CheckCircleIcon
                              class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                            {{ candidate.status }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      class="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>
            </li>
          </ul>

          <!-- Pagination -->
          <nav
            class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
            aria-label="Pagination"
          >
            <div class="-mt-px w-0 flex-1 flex">
              <a
                href="#"
                class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
              >
                <ArrowNarrowLeftIcon
                  class="mr-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Previous
              </a>
            </div>
            <div class="hidden md:-mt-px md:flex">
              <a
                href="#"
                class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              > 1 </a>
              <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" -->
              <a
                href="#"
                class="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                aria-current="page"
              > 2 </a>
              <a
                href="#"
                class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              > 3 </a>
              <a
                href="#"
                class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              > 4 </a>
              <a
                href="#"
                class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              > 5 </a>
              <a
                href="#"
                class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              > 6 </a>
            </div>
            <div class="-mt-px w-0 flex-1 flex justify-end">
              <a
                href="#"
                class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
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
  </main>
  <main class="pt-8 pb-16">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import {
  Menu,
  Listbox,
  MenuItem,
  MenuItems,
  MenuButton,
  ListboxLabel,
  ListboxOption,
  ListboxButton,
  ListboxOptions,
} from "@headlessui/vue";
import {
  MailIcon,
  CheckIcon,
  PencilIcon,
  CalendarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  LocationMarkerIcon,
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/vue/solid";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const tabs = [
  { name: "Applied", href: "#", count: "2", current: false },
  { name: "Phone Screening", href: "#", count: "4", current: false },
  { name: "Interview", href: "#", count: "6", current: true },
  { name: "Offer", href: "#", current: false },
  { name: "Disqualified", href: "#", current: false },
];

const tabList = [
  {
    id: 1,
    name: "sourced",
    title: "Sourced",
    color: 'gray',
  },
  {
    id: 2,
    name: "applied",
    title: "Applied",
    color: 'gray',
  },
  {
    id: 3,
    name: "assessment",
    title: "Assessment",
    color: 'gray',
  },
  {
    id: 4,
    name: "offered",
    title: "Offered",
    color: 'gray',
  },
  {
    id: 5,
    name: "hired",
    title: "Hired",
    color: 'gray',
  },
  {
    id: 6,
    name: "disqualified",
    title: "Disqualified",
    color: 'red'
  },
];

const candidates = [
  {
    name: "Emily Selman",
    email: "emily.selman@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  // More candidates...
];
const publishingOptions = [
  {
    name: "Published",
    description: "This job posting can be viewed by anyone who has the link.",
    current: true,
  },
  {
    name: "Draft",
    description: "This job posting will no longer be publicly accessible.",
    current: false,
  },
];

const selected = ref(publishingOptions[0]);
</script>
