<template>
  <main class="flex-1">
    <div class="px-4 mx-auto mt-6 bg-white max-w-7xl sm:px-6 lg:px-6">
      <div class="pt-10 pb-16">
        <div class="px-4 sm:px-6 md:px-0">
          <div class="py-6">
            <!-- Tabs -->
            <div>
              <div class="sm:hidden">
                <label for="tabs" class="sr-only">Select a tab</label>
                <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
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
                      'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
                    ]"
                    :aria-current="tab.current ? 'page' : undefined"
                  >
                    <span>{{ tab.name }}</span>
                    <span
                      aria-hidden="true"
                      :class="[
                        tabIdx == tabIndex ? 'bg-indigo-500' : 'bg-transparent',
                        'absolute inset-x-0 bottom-0 h-0.5',
                      ]"
                    ></span>
                  </a>
                </nav>
              </div>
            </div>

            <div v-if="tabIndex == 0">
              <!-- Description list with inline editing -->
              <div class="mt-10 divide-y divide-gray-200">
                <div class="space-y-1">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Profile
                  </h3>
                  <p class="max-w-2xl text-sm text-gray-500">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>
                <div class="mt-6">
                  <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">Name</dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">{{ loginInfo.firstname }} {{ loginInfo.lastname }} {{ loginInfo.middlename }}</span>
                        <span class="flex-shrink-0 ml-4">
                          <!-- <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button> -->
                        </span>
                      </dd>
                    </div>
                    
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
                    >
                      <dt class="text-sm font-medium text-gray-500">Email</dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">{{ loginInfo.email }}</span>
                        <span class="flex-shrink-0 ml-4">
                          <!-- <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button> -->
                        </span>
                      </dd>
                    </div>
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Department
                      </dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">{{ loginInfo.department.name }}</span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <!-- <div class="mt-10 divide-y divide-gray-200">
                <div class="space-y-1">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Account
                  </h3>
                  <p class="max-w-2xl text-sm text-gray-500">
                    Manage how information is displayed on your account.
                  </p>
                </div>
                <div class="mt-6">
                  <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt class="text-sm font-medium text-gray-500">
                        Language
                      </dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">English</span>
                        <span class="flex-shrink-0 ml-4">
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Date format
                      </dt>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <span class="flex-grow">DD-MM-YYYY</span>
                        <span
                          class="flex items-start flex-shrink-0 ml-4 space-x-4"
                        >
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Update
                          </button>
                          <span class="text-gray-300" aria-hidden="true"
                            >|</span
                          >
                          <button
                            type="button"
                            class="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            Remove
                          </button>
                        </span>
                      </dd>
                    </div>
                    <SwitchGroup
                      as="div"
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
                    >
                      <SwitchLabel
                        as="dt"
                        class="text-sm font-medium text-gray-500"
                        passive
                      >
                        Automatic timezone
                      </SwitchLabel>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <Switch
                          v-model="automaticTimezoneEnabled"
                          :class="[
                            automaticTimezoneEnabled
                              ? 'bg-purple-600'
                              : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto',
                          ]"
                        >
                          <span
                            aria-hidden="true"
                            :class="[
                              automaticTimezoneEnabled
                                ? 'translate-x-5'
                                : 'translate-x-0',
                              'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                            ]"
                          />
                        </Switch>
                      </dd>
                    </SwitchGroup>
                    <SwitchGroup
                      as="div"
                      class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"
                    >
                      <SwitchLabel
                        as="dt"
                        class="text-sm font-medium text-gray-500"
                        passive
                      >
                        Auto-update applicant data
                      </SwitchLabel>
                      <dd
                        class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      >
                        <Switch
                          v-model="autoUpdateApplicantDataEnabled"
                          :class="[
                            autoUpdateApplicantDataEnabled
                              ? 'bg-purple-600'
                              : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto',
                          ]"
                        >
                          <span
                            aria-hidden="true"
                            :class="[
                              autoUpdateApplicantDataEnabled
                                ? 'translate-x-5'
                                : 'translate-x-0',
                              'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                            ]"
                          />
                        </Switch>
                      </dd>
                    </SwitchGroup>
                  </dl>
                </div>
              </div> -->
            </div>
            <div v-if="tabIndex == 1">
              <div
                class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8"
              >
                <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6">
                      <div>
                        <label
                          for="oldPassword"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Old Password
                        </label>
                        <div class="mt-1">
                          <PasswordInput
                            id="oldPassword"
                            name="oldPassword"
                            v-model="formData.current_password"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="newPassword"
                          class="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <div class="mt-1">
                          <PasswordInput
                            id="newPassword"
                            name="newPassword"
                            v-tooltip="'Required 8 minimum characters, numbers and special character'"
                            v-model="formData.password"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="confirmPassword"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Confirm New Password
                        </label>
                        <div class="mt-1">
                          <PasswordInput
                            id="confirmPassword"
                            name="confirmPassword"
                            v-tooltip="'Required 8 minimum characters, numbers and special character'"
                            v-model="formData.password_confirmation"
                          />
                        </div>
                      </div>

                      <div>
                        <AppButton
                          type="button"
                          :processing="processing"
                          @click="changePassword"
                          :disabled="v$.$invalid"
                          class="justify-center w-full"
                        >
                          Change Password
                        </AppButton>
                      </div>
                    </form>

                    <div class="mt-6">
                      <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                          <div class="w-full border-t border-gray-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="tabIndex == 2">
              <div class="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" class="divide-y divide-gray-200">
                  <li v-for="position in positions" :key="position.id">
                    <a href="#" class="block hover:bg-gray-50">
                      <div class="flex items-center px-4 py-4 sm:px-6">
                        <div
                          class="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between"
                        >
                          <div class="truncate">
                            <div class="flex text-sm">
                              <p class="font-medium text-indigo-600 truncate">
                                {{ position.title }}
                              </p>
                              <p
                                class="flex-shrink-0 ml-1 font-normal text-gray-500"
                              >
                                in {{ position.department }}
                              </p>
                            </div>
                            <div class="flex mt-2">
                              <div
                                class="flex items-center text-sm text-gray-500"
                              >
                                <CalendarIcon
                                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <p>
                                  Closing on
                                  {{ " " }}
                                  <time :datetime="position.closeDate">{{
                                    position.closeDateFull
                                  }}</time>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
                            <div class="flex -space-x-1 overflow-hidden">
                              <img
                                v-for="applicant in position.applicants"
                                :key="applicant.email"
                                class="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                                :src="applicant.imageUrl"
                                :alt="applicant.name"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="flex-shrink-0 ml-5">
                          <ChevronRightIcon
                            class="w-5 h-5 text-gray-400"
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
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required, helpers, alphaNum, minLength } from "@vuelidate/validators";
// import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { CalendarIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import { useAuthentication } from "../../stores/authentication";
import AccountService from "../../service/account.service";

const toast = useToast();
var tabIndex = ref(1);
const { loginInfo } = storeToRefs(useAuthentication());

const processing = ref(false);
const formData = ref({
  password: '',
  password_confirmation: '',
  current_password: '',
});

const rules = {
  password: { minLength: minLength(8), required: helpers.withMessage("New password required", required, alphaNum) },
  current_password: { required: helpers.withMessage("Old password required", required) },
  password_confirmation: { minLength: minLength(8), required: helpers.withMessage("Confirm password required", required, alphaNum) },
}

const v$ = useVuelidate(rules, formData);

const tabs = [
  { name: "General", href: "#", current: true },
  { name: "Change Password", href: "#", current: false },
  { name: "Notifications", href: "#", current: false },
];

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

function changeTab(tabIdx) {
  tabIndex.value = tabIdx;
}

function showErrorMessage(errorMessage) {
  toast.error(errorMessage);
}

function showErrorMessages(errors) {
  var errorMessage = "";
  Object.keys(errors).forEach((key) => {
    errorMessage += `${errors[key][0]}\n`;
  });

  toast.error(errorMessage);
}
// const automaticTimezoneEnabled = ref(true);
// const autoUpdateApplicantDataEnabled = ref(false);

function changePassword() {
  console.clear();
  processing.value = true;
  AccountService.changePassword(formData.value).then(() => {
    toast.success("Password successfully changed");
  }).catch((error) => {
    const { data } = error;
    if (data.code === "062") {
      showErrorMessages(data.data);
    } else {
      showErrorMessage(data.message);
    }
  }).finally(() => {
    processing.value = false;
  })
}
</script>

<style></style>
