<template>
  <main class="flex-1 pb-8">
    <div class="max-w-3xl mt-4 mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
      <div class="flex items-center space-x-5">
        <div class="flex-shrink-0">
          <div class="relative">
            <img
              class="h-16 w-16 rounded-full"
              src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
              alt=""
            />
            <span
              class="absolute inset-0 shadow-inner rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Margot Foster</h1>
          <p class="text-sm font-medium text-gray-500">Sales Representative</p>
        </div>
      </div>
      <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
        <span class="hidden sm:block">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-emerald-500"
          >
            <CalendarIcon
              class="-ml-1 mr-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Schedule Interview
          </button>
        </span>

        <Listbox
          as="div"
          v-model="selected"
        >
          <ListboxLabel class="sr-only">
            Change candidate status
          </ListboxLabel>
          <div class="relative">
            <div class="inline-flex shadow-sm rounded-md divide-x divide-emerald-600">
              <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-emerald-600">
                <div class="relative inline-flex items-center bg-emerald-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                  <UserCircleIcon
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                  <p class="ml-2.5 text-sm font-medium">
                    {{ selected.name }}
                  </p>
                </div>
                <ListboxButton class="relative inline-flex items-center bg-emerald-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-emerald-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-emerald-500">
                  <span class="sr-only">Change candidate status</span>
                  <ChevronDownIcon
                    class="h-5 w-5"
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
                  <li :class="[
                        active ? 'text-white bg-emerald-500' : 'text-gray-900',
                        'cursor-default select-none relative p-4 text-sm',
                      ]">
                    <div class="flex flex-col">
                      <div class="flex justify-between">
                        <p :class="selected ? 'font-semibold' : 'font-normal'">
                          {{ option.name }}
                        </p>
                        <span
                          v-if="selected"
                          :class="active ? 'text-white' : 'text-emerald-500'"
                        >
                          <CheckIcon
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <p :class="[
                            active ? 'text-emerald-200' : 'text-gray-500',
                            'mt-2',
                          ]">
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
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
      <div class="w-full px-2 sm:px-0">
        <TabGroup
          :selectedIndex="selectedTab"
          @change="setActiveTab"
        >
          <TabList class="flex space-x-1 bg-white p-1">
            <Tab
              v-for="tab in tabs"
              as="template"
              :key="tab.id"
              v-slot="{ selected }"
            >
              <button :class="[
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-emerald-500',
                  'ring-white',
                  selected
                    ? 'bg-emerald-200'
                    : 'text-white hover:bg-emerald/[0.12] hover:text-emerald-700',
                ]">
                {{ tab.name }}
              </button>
            </Tab>
          </TabList>

          <TabPanels class="mt-6">
            <TabPanel :class="['rounded-xl', 'ring-white ring-opacity-60',]">
              <div class="max-w-7xl mx-auto mt-6">
                <div class="flex flex-col mt-2">
                  <div class="
                    align-middle
                    min-w-full
                    overflow-x-auto
                    shadow
                    overflow-hidden
                    sm:rounded-lg
                  ">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">                      
                      <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Candidate Information</h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                      </div>
                      <div class="border-t border-gray-200">
                        <dl>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Full name</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Margot Foster</dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Application for</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Backend Developer</dd>
                          </div>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Email address</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">margotfoster@example.com</dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Salary expectation</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">$120,000</dd>
                          </div>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">About</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Attachments</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <ul
                                role="list"
                                class="border border-gray-200 rounded-md divide-y divide-gray-200"
                              >
                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div class="w-0 flex-1 flex items-center">
                                    <PaperClipIcon
                                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span class="ml-2 flex-1 w-0 truncate"> resume_back_end_developer.pdf </span>
                                  </div>
                                  <div class="ml-4 flex-shrink-0">
                                    <a
                                      href="#"
                                      class="font-medium text-emerald-600 hover:text-emerald-500"
                                    > Download </a>
                                  </div>
                                </li>
                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div class="w-0 flex-1 flex items-center">
                                    <PaperClipIcon
                                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span class="ml-2 flex-1 w-0 truncate"> coverletter_back_end_developer.pdf </span>
                                  </div>
                                  <div class="ml-4 flex-shrink-0">
                                    <a
                                      href="#"
                                      class="font-medium text-emerald-600 hover:text-emerald-500"
                                    > Download </a>
                                  </div>
                                </li>
                              </ul>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel :class="['rounded-xl', 'ring-white ring-opacity-60',]">
              <div class="max-w-7xl mx-auto mt-6">
                <div class="flex flex-col mt-2">
                  <div class="
                    align-middle
                    min-w-full
                    overflow-x-auto
                    shadow
                    overflow-hidden
                    sm:rounded-lg
                  ">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                      <div class="px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                        <div class="sm:col-span-10">
                          <h3 class="text-lg leading-6 font-medium text-gray-900">Candidate Information</h3>
                          <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                        </div>
                        <div class="sm:col-span-2 text-right">
                          <h2>Score/Overall</h2>
                        </div>
                      </div>
                      <div class="border-t border-gray-200">
                        <dl>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-2 sm:px-6">
                            <dt class="text-lg font-bold text-gray-500 sm:col-span-10">Communication Skills</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <RadioGroup v-model="mem">
                                <RadioGroupLabel class="sr-only"> Choose feedback </RadioGroupLabel>
                                <div class="grid grid-cols-3 gap-3 sm:grid-cols-3">
                                  <RadioGroupOption
                                    as="template"
                                    v-for="option in memoryOptions"
                                    :key="option.name"
                                    :value="option"
                                    :disabled="!option.inStock"
                                    v-slot="{ active, checked }"
                                  >
                                    <div :class="[option.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed', active ? 'ring-2 ring-offset-2 ring-emerald-500' : '', checked ? 'bg-emerald-600 border-transparent text-white hover:bg-emerald-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'border rounded-md py-2 px-2 flex items-center justify-center text-sm font-medium uppercase sm:flex-1']">
                                      <RadioGroupLabel as="span">
                                        <component
                                          :is="option.icon"
                                          class="flex-shrink-0 h-4 w-4"
                                          :class="[ checked ? 'text-white' : 'text-emerald-600']"
                                          aria-hidden="true"
                                        />
                                      </RadioGroupLabel>
                                    </div>
                                  </RadioGroupOption>
                                </div>
                              </RadioGroup>
                            </dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">1. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">2. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">3. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">4. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                        </dl>
                      </div>
                      <div class="border-t border-gray-200">
                        <dl>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-2 sm:px-6">
                            <dt class="text-lg font-bold text-gray-500 sm:col-span-10">Time Management Skills</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <RadioGroup v-model="mem">
                                <RadioGroupLabel class="sr-only"> Choose feedback </RadioGroupLabel>
                                <div class="grid grid-cols-3 gap-3 sm:grid-cols-3">
                                  <RadioGroupOption
                                    as="template"
                                    v-for="option in memoryOptions"
                                    :key="option.name"
                                    :value="option"
                                    :disabled="!option.inStock"
                                    v-slot="{ active, checked }"
                                  >
                                    <div :class="[option.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed', active ? 'ring-2 ring-offset-2 ring-emerald-500' : '', checked ? 'bg-emerald-600 border-transparent text-white hover:bg-emerald-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'border rounded-md py-2 px-2 flex items-center justify-center text-sm font-medium uppercase sm:flex-1']">
                                      <RadioGroupLabel as="span">
                                        <component
                                          :is="option.icon"
                                          class="flex-shrink-0 h-4 w-4"
                                          :class="[ checked ? 'text-white' : 'text-emerald-600']"
                                          aria-hidden="true"
                                        />
                                      </RadioGroupLabel>
                                    </div>
                                  </RadioGroupOption>
                                </div>
                              </RadioGroup>
                            </dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">1. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">2. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">3. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">4. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                        </dl>
                      </div>
                      <div class="border-t border-gray-200">
                        <dl>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-2 sm:px-6">
                            <dt class="text-lg font-bold text-gray-500 sm:col-span-10">Time Management Skills</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <RadioGroup v-model="mem">
                                <RadioGroupLabel class="sr-only"> Choose feedback </RadioGroupLabel>
                                <div class="grid grid-cols-3 gap-3 sm:grid-cols-3">
                                  <RadioGroupOption
                                    as="template"
                                    v-for="option in memoryOptions"
                                    :key="option.name"
                                    :value="option"
                                    :disabled="!option.inStock"
                                    v-slot="{ active, checked }"
                                  >
                                    <div :class="[option.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed', active ? 'ring-2 ring-offset-2 ring-emerald-500' : '', checked ? 'bg-emerald-600 border-transparent text-white hover:bg-emerald-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'border rounded-md py-2 px-2 flex items-center justify-center text-sm font-medium uppercase sm:flex-1']">
                                      <RadioGroupLabel as="span">
                                        <component
                                          :is="option.icon"
                                          class="flex-shrink-0 h-4 w-4"
                                          :class="[ checked ? 'text-white' : 'text-emerald-600']"
                                          aria-hidden="true"
                                        />
                                      </RadioGroupLabel>
                                    </div>
                                  </RadioGroupOption>
                                </div>
                              </RadioGroup>
                            </dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">1. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">2. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">3. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 sm:col-span-12">4. Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint</dt>
                          </div>
                        </dl>
                      </div>
                      <div class="border-t border-gray-200">
                        <dl>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-2 sm:px-6">
                            <dt class="text-lg font-bold text-gray-500 sm:col-span-10">Should this candidateproceed to the next stage?</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <RadioGroup v-model="mem">
                                <RadioGroupLabel class="sr-only"> Choose feedback </RadioGroupLabel>
                                <div class="grid grid-cols-3 gap-3 sm:grid-cols-3">
                                  <RadioGroupOption
                                    as="template"
                                    v-for="option in memoryOptions"
                                    :key="option.name"
                                    :value="option"
                                    :disabled="!option.inStock"
                                    v-slot="{ active, checked }"
                                  >
                                    <div :class="[option.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed', active ? 'ring-2 ring-offset-2 ring-emerald-500' : '', checked ? 'bg-emerald-600 border-transparent text-white hover:bg-emerald-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'border rounded-md py-2 px-2 flex items-center justify-center text-sm font-medium uppercase sm:flex-1']">
                                      <RadioGroupLabel as="span">
                                        <component
                                          :is="option.icon"
                                          class="flex-shrink-0 h-4 w-4"
                                          :class="[ checked ? 'text-white' : 'text-emerald-600']"
                                          aria-hidden="true"
                                        />
                                      </RadioGroupLabel>
                                    </div>
                                  </RadioGroupOption>
                                </div>
                              </RadioGroup>
                            </dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6">
                            <textarea
                              id="review"
                              v-model="review"
                              name="question"
                              rows="7"
                              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 col-span-12 sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Write full interview review here"
                            />
                          </div>
                          <div>
                            <div class="flex flex-shrink-0 justify-end px-4 py-4">
                              <button
                                type="button"
                                class="rounded-md border border-gray-300 bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-50"
                                @click="open = false"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>

  </main>
</template>
<script setup>
import {
  PaperClipIcon,
  ChevronDownIcon,
  UserCircleIcon,
  CalendarIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  StarIcon,
} from "@heroicons/vue/solid";

import { ref } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxOption,
  ListboxButton,
  ListboxOptions,
} from "@headlessui/vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

const memoryOptions = [
  { name: "Definitely", inStock: true, icon: StarIcon },
  { name: "Yes", inStock: true, icon: ThumbUpIcon },
  { name: "No", inStock: true, icon: ThumbDownIcon },
];

const mem = ref(memoryOptions[2]);

const selectedTab = ref(0);

const tabs = ref([
  {
    id: "summary",
    name: "Summary",
    current: true,
  },
  {
    id: "interview",
    name: "Interview Scorecard",
    current: false,
  },
]);

function setActiveTab(index) {
  selectedTab.value = index;
}

const publishingOptions = [
  {
    name: "In View",
    description: "Disqualify this candidate",
    current: true,
  },
  {
    name: "Assessment",
    description: "Move candidate to assessment",
    current: false,
  },
  {
    name: "Interview",
    description: "Move candidate to interview",
    current: false,
  },
];

const selected = ref(publishingOptions[0]);
</script>
