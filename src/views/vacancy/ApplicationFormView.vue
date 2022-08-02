<template>
  <div>
    <div
      v-for="section in applicantInfo"
      :key="section.sectionName"
      class="pb-8 mt-10 space-y-8 border-b-2 divide-y divide-gray-200 sm:mt-0 border-b-gray-200"
    >
      <div class="pt-8 md:grid md:grid-cols-3 md:gap-6">
        <SideBar>
          <h3 class="text-lg font-bold leading-6 text-gray-900">
            {{ section.sectionName }}
          </h3>
          <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
          <p class="mt-1 text-xs text-gray-500">
            {{ section.description }}
          </p>
        </SideBar>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div
                  v-for="item in section.fields"
                  :key="item.name"
                  class="col-span-6 sm:col-span-6"
                >
                  <label
                    for="names"
                    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >{{ item.name }}</label
                  >
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <ApplicantField @selected-option="updateApplicantForm" :items="item.options" :itemKey="item.key"></ApplicantField>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="pb-8 mt-10 border-b-2 divide-y divide-gray-200 sm:mt-0 border-b-gray-200">
      <div class="pt-8 md:grid md:grid-cols-3 md:gap-6">
        <SideBar>
          <h3 class="text-lg font-bold leading-6 text-gray-900">
            Other Questions
          </h3>
          <h4 class="mt-1 text-sm font-bold text-gray-500">Tips</h4>
          <p class="mt-1 text-xs text-gray-500">
            Add other questions to the section
          </p>
        </SideBar>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-3 bg-white sm:p-6">
              <div class="">
                <div
                  v-for="q in questions"
                  :key="q.question"
                  :value="q.question"
                  class="grid grid-cols-2 px-4 py-3 mb-2 border border-gray-300 rounded-lg shadow"
                >
                  <div class="col-start">
                    <h3 class="font-bold">{{ q.question }}</h3>
                    <p>{{ getQuestionType(q) }}</p>
                  </div>
                  <div class="col-end">
                    <div class="flex flex-row-reverse">
                      <TrashIcon
                        @click="deleteQuestion(q.id)"
                        :disabled="deletingQuestion"
                        :class="deletingQuestion ? 'cursor-not-allowed' : 'cursor-pointer'"
                        class="w-6 h-6 text-red-500 cursor-pointer"></TrashIcon>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-10 sm:mt-0" v-if="questionPanel == true">
                <div class="pt-8 mb-4 md:grid md:grid-cols-3 md:gap-6">
                  <div class="mt-5 md:mt-0 md:col-span-3">
                    <form>
                      <div class="overflow-hidden shadow sm:rounded-md">
                        <div class="px-4 py-5 bg-gray-100 shadow sm:p-6">
                          <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-6">
                              <label
                                for="question-type"
                                class="block text-sm font-medium text-gray-700"
                                >Question Type</label
                              >
                              <MultiSelect
                                searchable
                                value="id"
                                label="name"
                                valueProp="id"
                                id="questionType"
                                v-model="questionType"
                                :options="questionTypes"
                                class="mt-2"
                              ></MultiSelect>
                              <!-- <SelectInput
                                placeholder="Select Question Type"
                                id="question-type"
                                name="question-type"
                                :items="questionTypes"
                                v-model="questionType"
                              >
                              </SelectInput> -->
                            </div>
                            <div class="col-span-6 sm:col-span-6">
                              <label
                                for="question"
                                class="block text-sm font-medium text-gray-700"
                                >Question</label
                              >
                              <div class="mt-1">
                                <textarea
                                  id="question"
                                  v-model="question"
                                  name="question"
                                  rows="4"
                                  class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  placeholder="enter question here...."
                                />
                              </div>
                            </div>
                            <div v-if="showOption" class="col-span-6 sm:col-span-6">
                              <label
                                for="question"
                                class="block text-sm font-medium text-gray-700"
                                >Option Items</label
                              >
                              <div class="mt-1">
                                <MultiSelect
                                  searchable
                                  mode="tags"
                                  v-model="options"
                                  placeholder="add keywords"
                                  label="name"
                                  :options="options"
                                  :create-option="true"
                                ></MultiSelect>
                                <!-- <TagInput @on-tags-changed="onItemsChange"></TagInput> -->
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="px-4 py-3 text-right bg-gray-100 sm:px-6">
                          <AppButton
                            @click="addQuestion"
                            label="Add Question"
                            type="button"
                            :processing="savingQuestion"
                            class="inline-flex justify-center w-auto px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 border border-transparent rounded-md cursor-pointer hover:bg-indigo-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 sm:text-sm sm:leading-5"
                          >
                          </AppButton>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 sm:px-6">
              <button
                  v-if="questionPanel == false"
                  type="button"
                  class="inline-flex px-4 py-3 text-sm font-medium leading-4 text-indigo-700 rounded focus:outline-none"
                  @click="
                    questionPanel == true
                      ? (questionPanel = false)
                      : (questionPanel = true)
                  "
                >
                  <PlusSmIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  Add Questions
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5 space-y-8 divide-y divide-gray-200">
        <div class="flex justify-end">
          <CancelButton
            label="Previous"
            @click="$emit('prevPage')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></CancelButton>
          <AppButton
            label="Save"
            @click="saveApplicantInfo"
            :processing="processing"
            class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></AppButton>
          <AppButton
            label="Next"
            @click="emits('nextPage')"
            class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></AppButton>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { PlusSmIcon, TrashIcon } from "@heroicons/vue/solid";
import applicationData from "../../data/applicationForm";
import { useMiscellaneous } from "../../stores/miscellaneous";
import VacancyService from '../../service/vacancies.service';
import VacancySettingService from "../../service/vacancy-settings.service";
import ApplicantField from "./ApplicantField.vue";

const props = defineProps({
  jobId: Number,
  settingsId: Number,
  vacancySettings: Object,
  existingQuestions: Array,
});

const {
  questionTypes
} = storeToRefs(useMiscellaneous());

const emits = defineEmits(['nextPage']);
const toast = useToast();
const savingQuestion = ref(false);
const deletingQuestion = ref(false);
const questionPanel = ref(false);
const settingsId = ref(0);
const applicantInfo = ref([]);
const questions = ref([]);
const processing = ref(false);
const question = ref("");
const questionType = ref(0);
const selectedType = ref(null);
const showOption = ref(false);
const options = ref([]);

const applicatantFields = ref({
  job_id: 0,
  firstname: "Mandatory",
  lastname: "Mandatory",
  email: "Mandatory",
  gender: "Mandatory",
  cv: "Off",
  dob: "Mandatory",
  phone: "Mandatory",
  heading: "Off",
  address: "Off",
  photo: "Off",
  education: "Mandatory",
  experience: "Mandatory",
  summary: "Optional",
  resume: "Mandatory",
  cover_letter: "Optional",
})

function updateApplicantForm(item) {
  const selectedOption = item.options.find(opt => opt.checked === true);
  applicatantFields.value[item.key] = selectedOption.optionName;
}

function addQuestion() {
  if (questions.value === undefined) questions.value = [];
  const currentQuestion = {
    job_id: props.jobId,
    question: question.value,
    job_question_type_id: Number(questionType.value)
  };

  if (selectedType.value.has_options === 1 && options.value.length > 0) {
    Object.assign(currentQuestion, {question_options: options.value});
  }

  savingQuestion.value = true;
  VacancyService.createQuestion(currentQuestion).then(result => {
    const id = result.data.data.id;
    Object.assign(currentQuestion, {id});
    questions.value.push(currentQuestion);
    toast.success('Question successfully added');
    questionPanel.value = !questionPanel.value;
    question.value = "";
  }).catch(() => {
    toast.error('Unable to add question, please try again later');
  })
  .finally(() => {
    savingQuestion.value = false;
  })
}

function saveApplicantInfo() {
  processing.value = true;
  applicatantFields.value.job_id = props.jobId;
  if (settingsId.value === 0) {
    VacancySettingService.create(applicatantFields.value).then(() => {
      toast.success('Application form successfully saved');
      // emits('nextPage');
    }).catch((ex) => {
      console.log(ex);
      // toast.error('Unable to save application form, please try again later');
    }).finally(() => {
      processing.value = false;
    })
  }

  if (settingsId.value > 0) {
    VacancySettingService.update(settingsId.value, applicatantFields.value).then(() => {
      toast.success('Application form successfully saved');
      // emits('nextPage');
    }).catch(() => {
      // console.log(ex);
      // toast.error('Unable to save application form, please try again later');
    }).finally(() => {
      processing.value = false;
    })
  }
}

function getQuestionType(question) {
  const id = Number(question.job_question_type_id);
  const getType = questionTypes.value.find(q => q.id === id);
  if (getType !== undefined) {
    return getType.name;
  }

  return "";
}

function deleteQuestion(id) {
  deletingQuestion.value = true;
  VacancyService.deleteQuestion(id).then(() => {
    questions.value = questions.value.filter(item => item.id !== id);
    toast.success('Question successfully deleted');
  }).catch(() => {
    toast.error('Unable to delete question, please try again later');
  })
  .finally(() => {
    deletingQuestion.value = false;
  })
}

function getApplicationQuestions(id) {
  VacancyService.single(id).then(result => {
    const { data } = result.data;
    questions.value = data.job_questions;
  })
}

watch(() => props.existingQuestions, (value) => {
  if (value.length > 0) {
    questions.value = value;
  }
});

watch(() => questionType.value, (value) => {
  const getType = questionTypes.value.find(item => item.id === Number(value));
  selectedType.value = getType;
  console.log(getType);
  showOption.value = getType.has_options === 1;
});

watch(() => props.vacancySettings, (fieldData) => {
  applicantInfo.value = applicationData;
  if (fieldData !== null) {
    applicationData.forEach(item => {
      item.fields.forEach(field => {
        const optionValue = fieldData[field.key];
        field.options.forEach(item => {
          item.checked = false;
        })

        if (field.options.length === 1) {
          field.options[0].checked = true;
        } else {
          const index = field.options.findIndex((item => item.optionName === optionValue));
          field.options[index].checked = true;
          applicatantFields.value[field.key] = optionValue;
        }
      })
    });

    applicantInfo.value = applicationData;
  }
});

function updateVacancySettings() {
  const { vacancySettings } = props;
  if (vacancySettings !== null) {
    applicationData.forEach(item => {
      item.fields.forEach(field => {
        const optionValue = vacancySettings[field.key];
        field.options.forEach(item => {
          item.checked = false;
        })

        if (field.options.length === 1) {
          field.options[0].checked = true;
        } else {
          const index = field.options.findIndex((item => item.optionName === optionValue));
          field.options[index].checked = true;
          applicatantFields.value[field.key] = optionValue;
        }
      })
    });

    applicantInfo.value = applicationData;
  } else {
    applicantInfo.value = applicationData;
  }
}

onMounted(() => {
  if (props.jobId > 0) {
    applicatantFields.value.job_id = props.jobId;
    settingsId.value = props.settingsId;
    updateVacancySettings();
    getApplicationQuestions(props.jobId);
  }
});
</script>

<style></style>
