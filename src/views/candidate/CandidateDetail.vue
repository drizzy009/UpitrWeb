<template>
  <CandidateLoading v-if="loading"></CandidateLoading>
  <main v-if="!loading && candidateDetail !== null" class="flex-1 pb-8">
    <div class="max-w-9xl mt-4 mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5">
      <div class="flex items-center space-x-5">
        <div class="flex-shrink-0">
          <div class="relative">
            <img v-if="candidateDetail.photo"
              class="h-16 w-16 rounded-full"
              :src="candidateDetail.photo"
              alt=""
            />
            <UserCircleIcon
              v-else
              class="h-16 w-16 text-indigo-400"
            />
            <span
              class="absolute inset-0 shadow-inner rounded-full"
              aria-hidden="true"
            ></span>
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{candidateDetail.firstname}} {{candidateDetail.lastname}}</h1>
          <p class="text-sm font-medium text-gray-500">{{candidateDetail.headline}}</p>
        </div>
      </div>
    </div>
    <div class="max-w-9xl mx-auto px-4 sm:px-6 mt-6 lg:px-6">
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
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-500',
                  'ring-white',
                  selected
                    ? 'bg-indigo-200'
                    : 'text-white hover:bg-indigo/[0.12] hover:text-indigo-700',
                ]">
                {{ tab.name }}
              </button>
            </Tab>
          </TabList>

          <TabPanels class="mt-6">
            <TabPanel :class="['rounded-xl', 'ring-white ring-opacity-60',]">
              <div class="max-w-9xl mx-auto mt-6">
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
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{candidateDetail.firstname}} {{candidateDetail.lastname}}</dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Application for</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Backend Developer</dd>
                          </div>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Email address</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{candidateDetail.email}}</dd>
                          </div>
                          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">About</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{candidateDetail.summary}}</dd>
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
                                    <span class="ml-2 flex-1 w-0 truncate"> Cover Letter </span>
                                  </div>
                                  <div class="ml-4 flex-shrink-0">
                                    <a
                                      :href="candidateDetail.cover_letter"
                                      target="_blank"
                                      class="font-medium text-indigo-600 hover:text-indigo-500"
                                    > Download </a>
                                  </div>
                                </li>
                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div class="w-0 flex-1 flex items-center">
                                    <PaperClipIcon
                                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span class="ml-2 flex-1 w-0 truncate"> Resume </span>
                                  </div>
                                  <div class="ml-4 flex-shrink-0">
                                    <a
                                      :href="candidateDetail.resume"
                                      target="_blank"
                                      class="font-medium text-indigo-600 hover:text-indigo-500"
                                    > Download </a>
                                  </div>
                                </li>
                              </ul>
                            </dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Work Experience(s)</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <ul
                                role="list"
                                v-for="experience in candidateDetail.applicant_experiences"
                                :key="experience.id"
                                class="border border-gray-200 rounded-md divide-y divide-gray-200"
                              >
                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div class="w-0 flex-1 flex items-center">
                                    <span class="ml-2 flex-1 w-0"> <b>{{experience.title}}</b> at  {{experience.company}}</span>
                                  </div>
                                  <div class="ml-4 flex-shrink-0">
                                    From {{formatDate(experience.start_date)}} to {{formatDate(experience.end_date)}}
                                  </div>
                                </li>
                              </ul>
                            </dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Education</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <ul
                                role="list"
                                v-for="education in candidateDetail.applicant_educations"
                                :key="education.id"
                                class="border border-gray-200 rounded-md divide-y divide-gray-200"
                              >
                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div class="w-0 flex-1 flex items-center">
                                    <span class="ml-2 flex-1 w-0"> Studied <b>{{education.field}}</b> at {{education.institution}}</span>
                                  </div>
                                  <div class="ml-4 flex-shrink-0">
                                    From {{formatDate(education.start_date)}} to {{formatDate(education.end_date)}}
                                  </div>
                                </li>
                              </ul>
                            </dd>
                          </div>
                          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Skills</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <p>{{candidateDetail.skills}}</p>
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
              <div class="max-w-9xl mx-auto mt-6">
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
                          <h3 class="text-lg leading-6 font-medium text-gray-900">Education Details</h3>
                          <p class="mt-1 max-w-2xl text-sm text-gray-500">Candidate's education history</p>
                        </div>
                      </div>
                      <div class="border-t border-gray-200">
                        <EducationView :items="educationList"></EducationView>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel :class="['rounded-xl', 'ring-white ring-opacity-60',]">
              <div class="max-w-9xl mx-auto mt-6">
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
                          <h3 class="text-lg leading-6 font-medium text-gray-900">Past Work Experience</h3>
                          <p class="mt-1 max-w-2xl text-sm text-gray-500">Candidate's work history</p>
                        </div>
                      </div>
                      <div class="border-t border-gray-200">
                        <ExperienceView :items="experienceList"></ExperienceView>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel :class="['rounded-xl', 'ring-white ring-opacity-60',]">
              <div class="max-w-9xl mx-auto mt-6">
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
                          <h3 class="text-lg leading-6 font-medium text-gray-900">Job Applications</h3>
                          <p class="mt-1 max-w-2xl text-sm text-gray-500">Job Application history</p>
                        </div>
                        <!-- <div class="sm:col-span-2 text-right">
                          <h2>Score/Overall</h2>
                        </div> -->
                      </div>
                      <div class="border-t border-gray-200">
                        
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
  UserCircleIcon,
} from "@heroicons/vue/solid";

import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
//import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import CandidateService from '../../service/candidate.service';
import { FormatMonthYear } from "../../util/Formatter";
import EducationView from "./EducationView.vue";
import ExperienceView from "./ExperienceView.vue";
import CandidateLoading from '../../components/layout/CandidateDetailSkeleton.vue';

// const memoryOptions = [
//   { name: "Definitely", inStock: true, icon: StarIcon },
//   { name: "Yes", inStock: true, icon: ThumbUpIcon },
//   { name: "No", inStock: true, icon: ThumbDownIcon },
// ];

const router = useRouter();
const toast = useToast();
const candidateDetail = ref(null);
const loading = ref(false);
// const mem = ref(memoryOptions[2]);
const swal = inject('$swal');
const selectedTab = ref(0);
const educationList = ref([]);
const experienceList = ref([]);

const tabs = ref([
  {
    id: "summary",
    name: "Summary",
    current: true,
  },
  {
    id: "education",
    name: "Education",
    current: false,
  },
  {
    id: "experience",
    name: "Work Experience",
    current: false,
  },
  {
    id: "applications",
    name: "Applications",
    current: false,
  },
]);

function setActiveTab(index) {
  selectedTab.value = index;
}

const publishingOptions = [
  {
    id: 1,
    name: "Sourced",
    description: "Move candidate to sourced",
    current: true,
  },
  {
    id: 2,
    name: "Applied",
    description: "Move candidate to applied",
    current: true,
  },
  {
    id: 3,
    name: "Assessment",
    description: "Move candidate to assessment",
    current: false,
  },
  {
    id: 4,
    name: "Offered",
    description: "Send offer letter to candidate",
    current: false,
  },
  {
    id: 5,
    name: "Hired",
    description: "Move candidate to hired",
    current: false,
  },
  {
    id: 6,
    name: "Disqualified",
    description: "Move candidate to disqualified",
    current: false,
  },
];

const selected = ref(publishingOptions[0]);

function getCandidateDetails(id) {
  loading.value = true;
  CandidateService.single(id).then(response => {
    const { data } = response.data;
    candidateDetail.value = data;
    const stageId = data.job_work_flow_stage.order;
    const stage = publishingOptions.find(item => item.id === stageId);
    selected.value = stage;
  }).catch(() => {})
  .finally(() => {
    loading.value = false;
  });
}

function getCandidateEducations(id) {
  CandidateService.getEducations(id).then(response => {
    const { data } = response.data.data;
    educationList.value = data;
  })
}

function getCandidateExperiences(id) {
  CandidateService.getExperiences(id).then(response => {
    const { data } = response.data.data;
    experienceList.value = data;
  })
}

function formatDate(dateValue) {
  return FormatMonthYear(dateValue);
}

onMounted(() => {
  const { id } = router.currentRoute.value.params;
  if (id !== undefined) {
    const candidateId = Number(id);
    getCandidateDetails(candidateId);
    getCandidateEducations(candidateId);
    getCandidateExperiences(candidateId);
  }
})
</script>
