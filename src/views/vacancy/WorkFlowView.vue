<template>
  <div class="w-full px-2 pb-8 sm:px-0">
    <TabGroup>
      <TabList class="flex p-1 rounded-xl">
        <Tab
          as="template"
          v-for="item in tabList"
          :disabled="!item.enabled"
          :key="item.id"
          v-slot="{ selected }"
          :aria-current="selected ? 'page' : undefined"
        >
          <button
            :class="[
              'workflow-tab',
              !item.enabled ? 'workflow-disabled-tab' : 'workflow-enabled-tab',
              selected
                ? 'border-b border-b-indigo-500 text-indigo-600'
                : 'text-gray-500',
            ]"
          >
            {{ item.title }}
          </button>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Sourced</TabPanel>
        <TabPanel>Applied</TabPanel>
        <TabPanel>
          <div class="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
            <div
              v-if="assessments.length > 0"
              class="flex rounded-md"
            >
              <div class="space-y-1">
                <AssessmentView @answerSelected="updateAnswer" @removeQuestion="deleteQuestion" :jobId="jobId" :questions="assessments"></AssessmentView>
              </div>
            </div>
            <div
              v-if="assessments.length === 0"
              class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            >
              <div class="space-y-1 text-center">
                <svg
                  class="w-12 h-12 mx-auto text-gray-400"
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
                    class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload an assessment</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                      @change="uploadAssessment"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">.xlsx up to 10MB</p>
              </div>
            </div>
          </div>
          <div class="pt-5" v-if="assessments.length > 0">
            <div class="flex justify-start">
              <CancelButton
                label="Cancel"
                @click="cancelAssessments"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              ></CancelButton>
              <AppButton
                type="button"
                label="Save Assessments"
                @click="toggleConfirmation = !toggleConfirmation"
                :processing="savingAssessment"
                class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              ></AppButton>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div v-if="showMainPanel">
            <div class="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
              <div
                class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <span>Setup an interview kit</span>
                  <p class="text-xs text-gray-500">
                    How would you like to evaluate candidate during an interview
                  </p>
                  <AppButton
                    @click="toggleInterview"
                    label="Add interview kit"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  ></AppButton>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showInterview" id="interviewKits">
            <InterviewKitsView
              @toggleMain="toggleMainPanel"
              :jobId="jobId"
              :interviewId="interviewId"
            ></InterviewKitsView>
          </div>
          <div v-if="showAssessment" id="interviewAssessments">
            <div class="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
              <div
                class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <!-- <label for="cover-photo" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Cover photo </label> -->
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <div
                    class="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                  >
                    <div class="space-y-1 text-center">
                      <svg
                        class="w-12 h-12 mx-auto text-gray-400"
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
                          class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
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
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ></CancelButton>
        <AppButton
          @click="onSubmit"
          type="submit"
          label="Submit"
          class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ></AppButton>
      </div>
    </div>
  </div>
  <AssessmentConfirmationVue :toggle="toggleConfirmation" :processing="savingAssessment" @save="saveAssessments"></AssessmentConfirmationVue>
</template>

<script setup>
import readXlsxFile from 'read-excel-file'
import { ref, inject, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import {
} from "@heroicons/vue/solid";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import AssessmentView from "./AssessmentView.vue";
import InterviewKitsView from "./InterviewKitsView.vue";
import AssessmentConfirmationVue from './AssessmentConfirmation.vue';
import questions from "../../data/interviewKits";
import VacancyAssessmentService from "../../service/vacancy-assessments.service";
import VacancyAssessmentQuestionService from "../../service/vacancy-assessments-question.service";

const props = defineProps({
  jobId: Number,
  interviewId: Number
});

const tabList = [
  {
    id: 1,
    name: "sourced",
    title: "Sourced",
    enabled: false,
  },
  {
    id: 2,
    name: "applied",
    title: "Applied",
    enabled: false,
  },
  {
    id: 3,
    name: "assessment",
    title: "Assessment",
    enabled: true,
  },
  {
    id: 4,
    name: "interview",
    title: "Interview",
    enabled: true,
  },
  {
    id: 5,
    name: "offered",
    title: "Offered",
    enabled: false,
  },
  {
    id: 6,
    name: "hired",
    title: "Hired",
    enabled: false,
  },
];

const toast = useToast();
const router = useRouter();
const assessmentId = ref(0);
const swal = inject("$swal");
const showMainPanel = ref(true);
const showInterview = ref(false);
const showAssessment = ref(false);
const savingAssessment = ref(false);
const toggleConfirmation = ref(false);

const assessments = ref([]);

function assessmentsPayload(assessmentId) {
  const questions = assessments.value.map(item => {
    const newOptions = item.options.map(item => {
      return { value: item.value, is_answer: item.is_answer }
    })
    const assessment = {
      question_type_id: 1,
      question: item.name,
      options: newOptions,
    }

    return assessment;
  });

  const newPayload = {
    questions,
    assesment_id: assessmentId,
  }

  return newPayload;
}

function deleteQuestion(id) {
  assessments.value = assessments.value.filter(item => item.id !== id);
  VacancyAssessmentQuestionService.delete(id);
}

function getAssessment(id) {
  VacancyAssessmentQuestionService.all(`assessment=${id}`).then(result => {
    const { data } = result.data;
    
    let sno = 0;
    const cbtQuestions = [];
      data.forEach(item => {
        const optionList = item.assesment_question_options;
        const list = optionList.map((o) => {
          return {
            id: o.id,
            value: o.value,
            is_answer: o.is_answer,
          }
        });

        sno += sno;
        const question = {
          sno,
          id: item.id,
          name: item.question,
          model: `question-${sno}`,
          options: list
        }

        cbtQuestions.push(question);
      });
      assessments.value = cbtQuestions;
  })
}

function showErrorMessage(errorMessage) {
  swal({
    title: "Invalid Data",
    text: errorMessage,
    icon: "error",
  });
}

function showErrorMessages(errors) {
  var errorMessage = "";
  Object.keys(errors).forEach((key) => {
    errorMessage += `${errors[key][0]}\n`;
  });

  swal({
    title: "Invalid Data",
    text: errorMessage,
    icon: "error",
  });
}

function saveAssessments(assessmentPayload) {
  savingAssessment.value = true;

  Object.assign(assessmentPayload, {job_id: props.jobId});
  
  if (assessmentId.value === 0) {
    VacancyAssessmentService.create(assessmentPayload).then(result => {
      assessmentId.value = result.data.data.id;
      const assessmentData = assessmentsPayload(assessmentId.value);
      VacancyAssessmentQuestionService.createBulk(assessmentData);
      toast.success('Assessment successfully saved');
      toggleConfirmation.value = false;
    }).catch((error) => {
      const { data } = error;
      if (data.code === "062") {
        showErrorMessages(data.data);
      } else {
        showErrorMessage(data.message);
      }
    })
    .finally(() => {
      savingAssessment.value = false;
    })
  }

  if (assessmentId.value > 0) {
    VacancyAssessmentService.update(assessmentId.value, assessmentPayload).then(() => {
      toast.info('Assessment successfully updated');
      const assessmentData = assessmentsPayload(assessmentId.value);
      VacancyAssessmentQuestionService.createBulk(assessmentData);
      toggleConfirmation.value = false;
    }).catch((error) => {
      const { data } = error;
      if (data.code === "062") {
        showErrorMessages(data.data);
      } else {
        showErrorMessage(data.message);
      }
    })
    .finally(() => {
      savingAssessment.value = false;
    })
  }
}

function cancelAssessments() {
  assessments.value = [];
}

function toggleInterview() {
  showInterview.value = !showInterview.value;
  showMainPanel.value = false;
}

function toggleMainPanel() {
  showMainPanel.value = true;
  showInterview.value = false;
  showAssessment.value = false;
}

function updateAnswer(data) {
  const question = assessments.value.find(item => item.id === data.questionId);
  const option = question.options.find(item => item.id === data.optionId);
  const questionIndex = assessments.value.indexOf(question);
  const optionIndex = question.options.indexOf(option);

  for (let index = 0; index < question.options.length; index++) {
    question.options[index].is_answer = false;
  }
  question.options[optionIndex].is_answer = true;
  assessments.value[questionIndex] = question;
}

function uploadAssessment(data) {
  readXlsxFile(data.target.files[0]).then((rows) => {
    if (rows.length > 1) {
      const newRows = rows.slice(1, rows.length);
      const cbtQuestions = [];
      let sno = 0;
      newRows.forEach(item => {
        var optionList = item.slice(1, item.length);
        optionList = optionList.filter(item => item !== null);
        const answer = optionList[optionList.length - 1];
        optionList = optionList.slice(0, optionList.length - 1);
        const newOptions = optionList.map((o) => {
          if (o !== "") {
            return {
              id: ++sno,
              value: o,
              is_answer: false,
            }
          }
        });

        newOptions[answer - 1].is_answer = true;

        sno += sno;
        const question = {
          sno,
          id: sno,
          name: item[0],
          model: `question-${sno}`,
          options: newOptions
        }

        cbtQuestions.push(question);
      });
      assessments.value = cbtQuestions;
    }
  })
}

function onSubmit() {
  router.push({ name: 'VacancyDetail', params: { id: props.jobId} });
}

onMounted(() => {
  if (questions.length > 0) {
    showInterview.value = !showInterview.value;
    showMainPanel.value = false;
  }

  if (assessmentId.value > 0) {
    getAssessment(assessmentId.value);
  }
});
</script>

<style></style>
