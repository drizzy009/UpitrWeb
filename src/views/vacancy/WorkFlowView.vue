<template>
  <div class="w-full px-2 pb-8 sm:px-0">
    <TabGroup>
      <TabList class="flex rounded-xl p-1">
        <Tab
          disabled
          v-slot="{ selected }"
          :class="[
            selected
              ? 'border-b border-b-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'w-1/6 py-4 px-1 text-center border-b-2 font-medium text-sm',
          ]"
          :aria-current="selected ? 'page' : undefined"
        >
          <!-- <component
              :is="UserIcon"
              :class="[
                selected
                  ? 'text-indigo-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                'h-10 w-10',
              ]"
              aria-hidden="true"
            /> -->
          <span>Sourced</span>
        </Tab>
        <Tab
          disabled
          v-slot="{ selected }"
          :class="[
            selected
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'w-1/6 py-4 px-1 text-center border-b-2 font-medium text-sm',
          ]"
          :aria-current="selected ? 'page' : undefined"
        >
          <span>Applied</span>
        </Tab>
        <Tab
          v-slot="{ selected }"
          :class="[
            selected
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'w-1/6 py-4 px-1 text-center border-b-2 font-medium text-sm',
          ]"
          :aria-current="selected ? 'page' : undefined"
        >
          <span>Assessment</span>
        </Tab>
        <Tab
          v-slot="{ selected }"
          :class="[
            selected
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'w-1/6 py-4 px-1 text-center border-b-2 font-medium text-sm',
          ]"
          :aria-current="selected ? 'page' : undefined"
        >
          <span>Interview</span>
        </Tab>
        <Tab
          disabled
          v-slot="{ selected }"
          :class="[
            selected
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'w-1/6 py-4 px-1 text-center border-b-2 font-medium text-sm',
          ]"
          :aria-current="selected ? 'page' : undefined"
        >
          <span>Offer</span>
        </Tab>
        <Tab
          disabled
          v-slot="{ selected }"
          :class="[
            selected
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'w-1/6 py-4 px-1 text-center border-b-2 font-medium text-sm',
          ]"
          :aria-current="selected ? 'page' : undefined"
        >
          <span>Hired</span>
        </Tab>
        <!-- <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab> -->
      </TabList>
      <TabPanels>
        <TabPanel>Sourced</TabPanel>
        <TabPanel>Applied</TabPanel>
        <TabPanel>
          <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload an assessment</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">.xlsx up to 10MB</p>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div v-if="showMainPanel">
             <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">                
                <span>Setup an interview kit</span>
                <p class="text-xs text-gray-500">How would you like to evaluate candidate during an interview</p>
                <AppButton
                  @click="toggleInterview"
                  label="Edit interview kit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                ></AppButton>
              </div>
            </div>
          </div>
          </div>
          <div
            v-if="showInterview"
            id="interviewKits"
          >
            <InterviewKitsView @toggleMain="toggleMainPanel"></InterviewKitsView>
          </div>
          <div
            v-if="showAssessment"
            id="interviewAssessments"
          >
            <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <!-- <label for="cover-photo" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Cover photo </label> -->
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <div class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <svg
                        class="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div class="flex text-sm text-gray-600">
                        <label
                          for="file-upload"
                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload an assessment</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs text-gray-500">.xlsx up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-5">
              <div class="flex justify-start">
                <CancelButton
                  @click="toggleMainPanel"
                  label="Cancel"
                  class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                ></CancelButton>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>Offer</TabPanel>
        <TabPanel>Hired</TabPanel>
      </TabPanels>
    </TabGroup>
    <div class="pt-5">
      <div class="flex justify-end">
        <CancelButton
          label="Previous"
          @click="$emit('prevPage')"
          class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ></CancelButton>
        <AppButton
          type="submit"
          label="Submit"
          class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ></AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  MenuIcon,
  UserIcon,
  UsersIcon,
  TrashIcon,
  CreditCardIcon,
  SortAscendingIcon,
  OfficeBuildingIcon,
} from "@heroicons/vue/solid";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import InterviewKitsView from "./InterviewKitsView.vue";

const showInterview = ref(false);
const showAssessment = ref(false);
const showMainPanel = ref(true);

function toggleInterview() {
  showInterview.value = !showInterview.value;
  showMainPanel.value = false;
}

function toggleMainPanel() {
  showMainPanel.value = true;
  showInterview.value = false;
  showAssessment.value = false;
}
</script>

<style></style>
