<template>
  <main class="flex-1 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
      <div class="w-full px-2 sm:px-0">
        <TabGroup :selectedIndex="selectedTab" @change="setActiveTab">
          <TabList class="flex space-x-1 bg-indigo-700 p-1">
            <Tab
              v-for="tab in tabs"
              as="template"
              :key="tab.id"
              v-slot="{ selected }"
            >
              <button
                :class="[
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                ]"
              >
                {{ tab.name }}
              </button>
            </Tab>
          </TabList>

          <TabPanels class="mt-6">
            <TabPanel
              :class="[
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              ]"
            >
              <form
                class="space-y-8 divide-y divide-gray-200 bg-white p-6 mt-4 rounded-md border border-gray-300"
              >
                <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Candidate Details
                      </h3>
                      <p class="mt-1 max-w-2xl text-sm text-gray-500">
                        Candidate's basic information
                      </p>
                    </div>
                    <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                      <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="candidateName"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Candidate Name
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <FormInput
                              id="candidateName"
                              name="candidateName"
                            ></FormInput>
                          </div>
                        </div>
                      </div>

                      <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="reference"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Reference
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <FormInput
                              id="reference"
                              name="reference"
                            ></FormInput>
                          </div>
                        </div>
                      </div>

                      <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="gender"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Gender
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <SelectInput
                              :items="[
                                { name: 'Male', id: 'male' },
                                { name: 'Female', id: 'female' },
                              ]"
                              id="gender"
                              name="gender"
                            ></SelectInput>
                          </div>
                        </div>
                      </div>

                      <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="location"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Candidate Location
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <FormInput id="location" name="location"></FormInput>
                          </div>
                        </div>
                      </div>

                      <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="dob"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Date of Birth
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <FormInput type="date" id="dob" name="dob"></FormInput>
                          </div>
                        </div>
                      </div>

                      <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="address"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Candidate Address
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <TextArea id="address" name="address"></TextArea>
                          </div>
                        </div>
                      </div>

                      <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="email"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Candidate Email Address
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <FormInput id="email" name="email"></FormInput>
                          </div>
                        </div>
                      </div>

                      <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="phone"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Candidate Phone Number
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <FormInput id="phone" name="phone"></FormInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Additional Information
                      </h3>
                      <p class="mt-1 max-w-2xl text-sm text-gray-500">
                      </p>
                    </div>

                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="department"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Current Department
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <FormInput
                              id="department"
                              name="department"
                            ></FormInput>
                          </div>
                        </div>
                    </div>

                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="industry"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Candidate Industry
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <FormInput
                              id="industry"
                              name="industry"
                            ></FormInput>
                          </div>
                        </div>
                    </div>

                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                      >
                        <label
                          for="experience"
                          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Year of Experience
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                          <div class="max-w-lg flex rounded-md shadow-sm">
                            <FormInput
                              id="experience"
                              name="experience"
                            ></FormInput>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </form>
            </TabPanel>
            <TabPanel
              :class="[
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              ]"
            >
              <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Resumes
                      </h3>
                      <p class="mt-1 max-w-2xl text-sm text-gray-500">
                        Manage Candidate Resumes
                      </p>
                    </div>
                </div>
                <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                   <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <!-- <label for="cover-photo" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Cover photo </label> -->
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div class="flex text-sm text-gray-600">
                                        <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a resume</span>
                                        <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs text-gray-500">PDF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel
              :class="[
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              ]"
            >
              <h4>Tab Jobs</h4>
            </TabPanel>
            <TabPanel
              :class="[
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              ]"
            >
              <h4>Tab Activities</h4>
            </TabPanel>
            <TabPanel
              :class="[
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              ]"
            >
              <h4>Tab Attachments</h4>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const selectedTab = ref(0);

const tabs = ref([
  {
    id: "summary",
    name: "Summary",
    current: true,
  },
  {
    id: "resume",
    name: "Resume",
    current: false,
  },
  {
    id: "jobs",
    name: "Jobs",
    current: false,
  },
  {
    id: "activities",
    name: "Activities",
    current: false,
  },
  {
    id: "attachments",
    name: "Attachments",
    current: false,
  },
]);

function setActiveTab(index) {
  selectedTab.value = index;
}
</script>
