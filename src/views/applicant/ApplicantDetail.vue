<template>
  <CandidateLoading v-if="loading"></CandidateLoading>
  <main v-if="!loading && candidateDetail !== null" class="flex-1 pb-8">
    <div
      class="px-4 mx-auto mt-4 max-w-9xl sm:px-6 md:flex md:items-center md:justify-between md:space-x-5"
    >
      <div class="flex items-center space-x-5">
        <div class="flex-shrink-0">
          <div class="relative">
            <img
              v-if="candidateDetail.photo"
              class="w-16 h-16 rounded-full"
              :src="candidateDetail.photo"
              alt=""
            />
            <UserCircleIcon v-else class="w-16 h-16 text-indigo-400" />
            <span
              class="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></span>
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            {{ candidateDetail.firstname }} {{ candidateDetail.lastname }}
          </h1>
          <p class="text-sm font-medium text-gray-500">
            {{ candidateDetail.headline }}
          </p>
        </div>
      </div>
      <div
        class="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
      >
        <span class="hidden sm:block">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
          >
            <CalendarIcon
              class="w-5 h-5 mr-2 -ml-1 text-gray-400"
              aria-hidden="true"
            />
            Schedule Interview
          </button>
        </span>
        <span class="hidden sm:block">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
          >
            <CalendarIcon
              class="w-5 h-5 mr-2 -ml-1 text-gray-400"
              aria-hidden="true"
            />
            Schedule Assessment
          </button>
        </span>

        <Listbox as="div" v-model="selected">
          <ListboxLabel class="sr-only"> Change candidate status </ListboxLabel>
          <div class="relative">
            <div
              class="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm"
            >
              <div
                class="relative z-0 inline-flex divide-x divide-indigo-600 rounded-md shadow-sm"
              >
                <div
                  class="relative inline-flex items-center py-2 pl-3 pr-4 text-white bg-indigo-500 border border-transparent shadow-sm rounded-l-md"
                >
                  <UserCircleIcon class="w-5 h-5" aria-hidden="true" />
                  <p class="ml-2.5 text-sm font-medium">
                    {{ selected.name }}
                  </p>
                </div>
                <ListboxButton
                  class="relative inline-flex items-center p-2 text-sm font-medium text-white bg-indigo-500 rounded-l-none rounded-r-md hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  <span class="sr-only">Change candidate status</span>
                  <ChevronDownIcon class="w-5 h-5" aria-hidden="true" />
                </ListboxButton>
              </div>
            </div>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute left-0 mt-2 -mr-1 overflow-hidden origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg w-72 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0"
              >
                <ListboxOption
                  as="template"
                  v-for="option in workflowStages"
                  :key="option.name"
                  :value="option"
                  v-slot="{ active, selected }"
                >
                  <li
                    @click="onOptionChanged(option)"
                    :class="[
                      active ? 'text-white bg-indigo-500' : 'text-gray-900',
                      'cursor-pointer select-none relative p-4 text-sm',
                    ]"
                  >
                    <div class="flex flex-col">
                      <div class="flex justify-between">
                        <p :class="selected ? 'font-semibold' : 'font-normal'">
                          {{ option.name }}
                        </p>
                        <span
                          v-if="selected"
                          :class="active ? 'text-white' : 'text-indigo-500'"
                        >
                          <CheckIcon class="w-5 h-5" aria-hidden="true" />
                        </span>
                      </div>
                      <p
                        :class="[
                          active ? 'text-indigo-200' : 'text-gray-500',
                          'mt-2',
                        ]"
                      >
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
    <div class="px-4 mx-auto mt-6 max-w-9xl sm:px-6 lg:px-6">
      <div class="w-full px-2 sm:px-0">
        <TabGroup :selectedIndex="selectedTab" @change="setActiveTab">
          <TabList class="flex p-1 space-x-1 bg-white">
            <Tab
              v-for="tab in tabs"
              as="template"
              :key="tab.id"
              v-slot="{ selected }"
              :disabled="tab.disabled"
            >
              <button
                :class="[
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-500',
                  'ring-white',
                  selected
                    ? 'bg-indigo-200'
                    : 'text-white hover:bg-indigo/[0.12] hover:text-indigo-700',
                ]"
              >
                {{ tab.name }}
              </button>
            </Tab>
          </TabList>

          <TabPanels class="mt-6">
            <TabPanel :class="['rounded-xl', 'ring-white ring-opacity-60']">
              <div class="mx-auto mt-6 max-w-9xl">
                <div class="flex flex-col mt-2">
                  <div
                    class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
                  >
                    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                      <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                          Candidate Information
                        </h3>
                        <p class="max-w-2xl mt-1 text-sm text-gray-500">
                          Personal details and application.
                        </p>
                      </div>
                      <div class="border-t border-gray-200">
                        <dl>
                          <div
                            class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              Full name
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{ candidateDetail.firstname }}
                              {{ candidateDetail.lastname }}
                            </dd>
                          </div>
                          <div
                            class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              Application for
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              Backend Developer
                            </dd>
                          </div>
                          <div
                            class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              Email address
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{ candidateDetail.email }}
                            </dd>
                          </div>
                          <div
                            class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              About
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{ candidateDetail.summary }}
                            </dd>
                          </div>
                          <div
                            class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              Attachments
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              <ul
                                role="list"
                                class="border border-gray-200 divide-y divide-gray-200 rounded-md"
                              >
                                <li
                                  class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                >
                                  <div class="flex items-center flex-1 w-0">
                                    <PaperClipIcon
                                      class="flex-shrink-0 w-5 h-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span class="flex-1 w-0 ml-2 truncate">
                                      Cover Letter
                                    </span>
                                  </div>
                                  <div class="flex-shrink-0 ml-4">
                                    <a
                                      :href="candidateDetail.cover_letter"
                                      target="_blank"
                                      class="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Download
                                    </a>
                                  </div>
                                </li>
                                <li
                                  class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                >
                                  <div class="flex items-center flex-1 w-0">
                                    <PaperClipIcon
                                      class="flex-shrink-0 w-5 h-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span class="flex-1 w-0 ml-2 truncate">
                                      Resume
                                    </span>
                                  </div>
                                  <div class="flex-shrink-0 ml-4">
                                    <a
                                      :href="candidateDetail.resume"
                                      target="_blank"
                                      class="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Download
                                    </a>
                                  </div>
                                </li>
                              </ul>
                            </dd>
                          </div>
                          <div
                            class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              Work Experience(s)
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              <ul
                                role="list"
                                v-for="experience in candidateDetail.applicant_experiences"
                                :key="experience.id"
                                class="border border-gray-200 divide-y divide-gray-200 rounded-md"
                              >
                                <li
                                  class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                >
                                  <div class="flex items-center flex-1 w-0">
                                    <span class="flex-1 w-0 ml-2">
                                      <b>{{ experience.title }}</b> at
                                      {{ experience.company }}</span
                                    >
                                  </div>
                                  <div class="flex-shrink-0 ml-4">
                                    From
                                    {{ formatDate(experience.start_date) }} to
                                    {{ formatDate(experience.end_date) }}
                                  </div>
                                </li>
                              </ul>
                            </dd>
                          </div>
                          <div
                            class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              Education
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              <ul
                                role="list"
                                v-for="education in candidateDetail.applicant_educations"
                                :key="education.id"
                                class="border border-gray-200 divide-y divide-gray-200 rounded-md"
                              >
                                <li
                                  class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                >
                                  <div class="flex items-center flex-1 w-0">
                                    <span class="flex-1 w-0 ml-2">
                                      Studied <b>{{ education.field }}</b> at
                                      {{ education.institution }}</span
                                    >
                                  </div>
                                  <div class="flex-shrink-0 ml-4">
                                    From
                                    {{ formatDate(education.start_date) }} to
                                    {{ formatDate(education.end_date) }}
                                  </div>
                                </li>
                              </ul>
                            </dd>
                          </div>
                          <div
                            class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          >
                            <dt class="text-sm font-medium text-gray-500">
                              Skills
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              <p>{{ candidateDetail.skills }}</p>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel :class="['rounded-xl', 'ring-white ring-opacity-60']">
              <div class="mx-auto mt-6 max-w-7xl">
                <div class="flex flex-col mt-2">
                  <div
                    class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
                  >
                    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                      <div
                        class="px-4 py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6"
                      >
                        <div class="sm:col-span-10">
                          <h3
                            class="text-lg font-medium leading-6 text-gray-900"
                          >
                            Assessment and Interview
                          </h3>
                          <p class="max-w-2xl mt-1 text-sm text-gray-500">
                            {{ interviewSection.title }} responses
                          </p>
                        </div>
                        <div class="text-right sm:col-span-2">
                          <h2>Score/Overall</h2>
                        </div>
                      </div>
                      <div class="border-t border-gray-200">
                        <dl
                          v-for="section in interviewSection.interview_sections"
                          :key="section.id"
                        >
                          <div
                            class="px-4 py-1 bg-white border-b border-gray-200 sm:px-6"
                          >
                            <div
                              class="flex flex-wrap items-center justify-between -ml-4 sm:flex-nowrap"
                            >
                              <div class="ml-4">
                                <h3
                                  class="text-lg font-medium leading-6 text-gray-900"
                                >
                                  {{ section.title }}
                                </h3>
                              </div>
                              <div class="flex-shrink-0 ml-4">
                                <star-rating
                                  starSize="20"
                                  v-model="section.rating"
                                />
                              </div>
                            </div>
                            <div
                              v-for="question in section.interview_questions"
                              :key="question.id"
                              class="flex flex-col w-full"
                            >
                              <div class="py-2">
                                <!-- <h5 class="text-sm">{{question.title}}</h5> -->
                                <p class="text-xs text-gray-700">
                                  {{ question.question }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pt-5">
                  <div class="flex justify-end">
                    <AppButton
                      type="submit"
                      label="Submit"
                      @click="submitInterview"
                      :processing="processing"
                      class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    ></AppButton>
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
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import moment from "moment";
import {
  CalendarIcon,
  PaperClipIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/vue/solid";
import {
  Listbox,
  ListboxLabel,
  ListboxOption,
  ListboxButton,
  ListboxOptions,
} from "@headlessui/vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
//import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
// import CandidateService from "../../service/candidate.service";
import { FormatMonthYear } from "../../util/Formatter";
import { useVacancies } from "../../stores/vacancies";
import CandidateLoading from "../../components/layout/CandidateDetailSkeleton.vue";
import ApplicantService from "../../service/applicant.service";
import InterviewService from "../../service/interview.service";
// const memoryOptions = [
//   { name: "Definitely", inStock: true, icon: StarIcon },
//   { name: "Yes", inStock: true, icon: ThumbUpIcon },
//   { name: "No", inStock: true, icon: ThumbDownIcon },
// ];

const router = useRouter();
const toast = useToast();
const candidateDetail = ref(null);
const interviewSection = ref(null);
const loading = ref(false);
const processing = ref(false);
const swal = inject("$swal");
const selectedTab = ref(0);
const { workflowStages } = useVacancies();
const props = defineProps({
  id: String,
  vacancyId: String,
  interviewId: String,
});

const tabs = ref([
  {
    id: 1,
    name: "Summary",
    current: true,
    disabled: false,
  },
  {
    id: 2,
    name: "Interview Scorecard",
    current: false,
    disabled: false,
  },
]);

function setActiveTab(index) {
  selectedTab.value = index;
}

const selected = ref(workflowStages[0]);

function submitInterview() {
  processing.value = true;
  const sectionRating = [];
  interviewSection.value.interview_sections.forEach((section) => {
    sectionRating.push({
      rating: section.rating || 0,
      interview_section_id: Number(section.id),
    });
  });

  const endTime = moment().utc(); //.format('MM-DD-YYYY h:mm:ss a');
  const startTime = moment().add(-30, "minutes").utc(); //.format('MM-DD-YYYY h:mm:ss a');
  const payload = {
    applicant_id: Number(props.id),
    interview_id: Number(props.interviewId),
    feedback: "Good",
    start_time: startTime,
    end_time: endTime,
    feedbacks: sectionRating,
  };

  InterviewService.saveInterviewFeedback(payload)
    .then(() => {
      swal({
        title: "Success",
        text: "Interview feedback successfully saved",
        icon: "success",
      });
      getApplicantData();
    })
    .catch((err) => {
      swal({
        title: "Error",
        text: err.data.data,
        icon: "error",
      });
    })
    .finally(() => {
      processing.value = false;
    });
}

function formatDate(dateValue) {
  return FormatMonthYear(dateValue);
}

function onOptionChanged(item) {
  const prevOption = selected.value;
  swal({
    title: "Confirm",
    text: "Are you sure you want to move the candidate",
    icon: "question",
    showCancelButton: true,
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      const payload = {
        job_workflow_stage_id: item.id,
      };

      ApplicantService.changeWorkflowStage(Number(props.id), payload).then(
        () => {
          toast("Candidate successfully moved");
        }
      );
    }

    if (!result.isConfirmed) selected.value = prevOption;
  });
}

function getApplicantInfo(id) {
  loading.value = true;
  ApplicantService.singleByApplicantId(id)
    .then((response) => {
      const { data } = response.data;
      candidateDetail.value = data.candidate;
      const stageId = data.job_workflow_stage.order;
      const stage = workflowStages.find((item) => item.id === stageId);
      selected.value = stage;
      // if (!stage.name.includes("interview")) tabs.value[1].disabled = true;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      loading.value = false;
    });
}

function getInterviewResults(id) {
  InterviewService.all(id)
    .then(() => {
      // console.log(response);
    })
    .catch(() => {});
}

function getInterviews() {
  InterviewService.vacancyInterview(Number(props.interviewId)).then(
    (response) => {
      interviewSection.value = response.data.data;
    }
  );
}

function getApplicantData() {
  getApplicantInfo(Number(props.id));
  getInterviewResults(Number(props.id));
  getInterviews();
}

onMounted(() => {
  if (props.id !== undefined) {
    getApplicantData();
  }
});
</script>
