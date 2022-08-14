<template>
  <div class="min-h-full">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-indigo-700"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XIcon class="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex items-center flex-shrink-0 px-4">
                <svg class="w-8 h-8 text-indigo-300 shrink-0" viewBox="0 0 24 24">
                  <path
                    class="text-indigo-200 fill-current"
                    d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                  ></path>
                  <path
                    class="text-indigo-400 fill-current"
                    d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                  ></path>
                </svg>
                <h2 class="ml-2 text-3xl font-medium text-white">
                  recruit<span class="text-3xl font-medium text-indigo-200">r</span>
                </h2>
              </div>
              <nav
                class="flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-indigo-800"
                aria-label="Sidebar"
              >
                <div class="px-2 space-y-1">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    :class="[
                      item.current
                        ? 'bg-indigo-800 text-white'
                        : 'text-indigo-100 hover:text-white hover:bg-indigo-600',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                  >
                    <component
                      :is="item.icon"
                      class="flex-shrink-0 w-6 h-6 mr-4 text-indigo-200"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </router-link>
                </div>
                <div class="pt-6 mt-6">
                  <div class="px-2 space-y-1">
                    <router-link
                      v-for="item in secondaryNavigation"
                      :key="item.name"
                      :to="item.href"
                      class="flex items-center px-2 py-2 text-base font-medium text-indigo-100 rounded-md group hover:text-white hover:bg-indigo-600"
                    >
                      <component
                        :is="item.icon"
                        class="w-6 h-6 mr-4 text-indigo-200"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </router-link>
                  </div>
                </div>
              </nav>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden bg-indigo-700 lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-col flex-1 flex-grow pt-3 pb-4 overflow-y-auto">
        <div class="flex items-center flex-1 flex-shrink-0 px-4">
          <svg class="w-8 h-8 text-indigo-300 shrink-0" viewBox="0 0 24 24">
            <path
              class="text-indigo-200 fill-current"
              d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
            ></path>
            <path
              class="text-indigo-400 fill-current"
              d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
            ></path>
          </svg>
          <h2 class="ml-2 text-3xl font-medium text-white">
            recruit<span class="text-3xl font-medium text-indigo-200">r</span>
          </h2>
        </div>
        <nav
          class="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-indigo-800"
          aria-label="Sidebar"
        >
          <div class="px-2 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                appStore.pageName == item.tag
                  ? 'bg-indigo-800 text-white'
                  : 'text-indigo-100 hover:text-white hover:bg-indigo-600',
                'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                class="flex-shrink-0 w-6 h-6 mr-4 text-indigo-200"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </div>
          <div class="pt-6 mt-6">
            <div class="px-2 space-y-1">
              <router-link
                v-for="item in secondaryNavigation"
                :key="item.name"
                :to="item.href"
                class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-indigo-100 rounded-md group hover:text-white hover:bg-indigo-600"
              >
                <component
                  :is="item.icon"
                  class="w-6 h-6 mr-4 text-indigo-200"
                  aria-hidden="true"
                />
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </nav>
      </div>

      <div class="flex flex-shrink-0 p-4 border-t border-indigo-800">
        <a href="#" class="flex-shrink-0 block w-full group">
          <div class="flex items-center">
            <div>
              <!-- <img
                class="inline-block rounded-full h-9 w-9"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /> -->
              <UserCircleIcon class="w-8 h-8 rounded-full"></UserCircleIcon>
            </div>
            <div class="ml-3">
              <p
                class="text-sm font-medium text-white group-hover:text-gray-300"
              >
                {{ loginInfo.firstname }} {{ loginInfo.lastname }}
              </p>
              <p
                class="text-xs font-medium text-white group-hover:text-gray-300"
              >
                View profile
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>

    <div class="flex flex-col flex-1 lg:pl-64">
      <div
        class="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:border-none"
      >
        <button
          type="button"
          class="px-4 text-gray-400 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuAlt1Icon class="w-6 h-6" aria-hidden="true" />
        </button>

        <div
          class="flex justify-between flex-1 px-4 sm:px-6 lg:max-w-9xl lg:mx-auto"
        >
          <div class="flex items-center flex-1">
            <h1
              class="text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate"
            >
              {{ appStore.pageTitle }}
            </h1>
          </div>
          <div class="flex items-center ml-4 md:ml-6">
            <button
              type="button"
              class="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="w-6 h-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                >
                  <!-- <img
                    class="w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /> -->
                  <UserCircleIcon class="w-8 h-8 rounded-full"></UserCircleIcon>
                  <span
                    class="hidden ml-3 text-sm font-medium text-gray-700 lg:block"
                    ><span class="sr-only">Open user menu for </span
                    >{{ loginInfo.firstname }} {{ loginInfo.lastname }}</span
                  >
                  <ChevronDownIcon
                    class="flex-shrink-0 hidden w-5 h-5 ml-1 text-gray-400 lg:block"
                    aria-hidden="true"
                  />
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
                  class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <!-- <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                  >Your Profile</a>
                  </MenuItem> -->
                  <MenuItem v-slot="{ active }">
                    <a
                      href="/settings"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Settings</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      @click="onLogout"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'cursor-pointer block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      Logout
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthentication } from "./../../stores/authentication";
import { useAppStore } from "@/stores/app.js";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  XIcon,
  CogIcon,
  BellIcon,
  HomeIcon,
  UserIcon,
  ClockIcon,
  UsersIcon,
  MenuAlt1Icon,
  BriefcaseIcon,
  UserGroupIcon,
  OfficeBuildingIcon,
} from "@heroicons/vue/outline";
import { UserCircleIcon } from "@heroicons/vue/solid";

const router = useRouter();
const authStore = useAuthentication();
const { loginInfo } = storeToRefs(useAuthentication());

const navigation = [
  {
    name: "Home",
    tag: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Vacancies",
    tag: "ManageVacancies",
    href: "/vacancy/all",
    icon: BriefcaseIcon,
  },
  {
    name: "Candidates",
    tag: "ManageCandidates",
    href: "/candidate/all",
    icon: UserGroupIcon,
  },
  {
    name: "Activities",
    tag: "ManageActivities",
    href: "/activity/all",
    icon: ClockIcon,
  },
  {
    name: "Departments",
    tag: "ManageDepartments",
    href: "/department/all",
    icon: OfficeBuildingIcon,
  },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: CogIcon },
  { name: "Roles", href: "/role", icon: UserIcon },
  { name: "Users", href: "/user", icon: UsersIcon },
  // { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
];

const appStore = useAppStore();
const sidebarOpen = ref(false);

function onLogout() {
  authStore.logOut();
  router.push({ name: 'Login' });
}

onMounted(() => {
  // console.clear();
  // console.log(loginInfo.value);
});
</script>
