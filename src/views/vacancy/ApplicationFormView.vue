<template>
  <div>
    <div
      v-for="section in applicantInfo"
      :key="section.sectionName"
      class="mt-10 sm:mt-0 space-y-8 divide-y divide-gray-200 pb-8 border-b-2 border-b-gray-200"
    >
      <div class="md:grid md:grid-cols-3 md:gap-6 pt-8">
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
          <div class="shadow overflow-hidden sm:rounded-md">
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
                    <RadioGroup v-model="item.model" class="mt-2">
                      <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        <RadioGroupOption
                          as="template"
                          v-for="option in item.options"
                          :key="option.optionName"
                          :value="option"
                          v-slot="{ active, checked }"
                        >
                          <div
                            :class="[
                              'cursor-pointer focus:outline-none',
                              active
                                ? 'ring-2 ring-offset-2 ring-green-500'
                                : '',
                              (checked || setDefault(item))
                                ? 'bg-green-400 border-transparent text-white hover:bg-green-500'
                                : 'bg-[#E1E6EB] border-gray-200 text-gray-900 hover:bg-gray-50',
                              'border rounded-full py-1 px-1 flex items-center justify-center text-sm font-medium sm:flex-1',
                            ]"
                          >
                            <RadioGroupLabel as="span">
                              {{ option.optionName }}
                            </RadioGroupLabel>
                          </div>
                        </RadioGroupOption>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 sm:mt-0 divide-y divide-gray-200 pb-8 border-b-2 border-b-gray-200">
      <div class="md:grid md:grid-cols-3 md:gap-6 pt-8">
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
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-3 bg-white sm:p-6">
              <div class="">
                <div
                  v-for="q in questions"
                  :key="q.question"
                  :value="q.question"
                  class="grid grid-cols-2 shadow rounded-lg mb-2 py-3 px-4 border border-gray-300"
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
                        class="h-6 w-6 text-red-500 cursor-pointer"></TrashIcon>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-10 sm:mt-0" v-if="questionPanel == true">
                <div class="md:grid md:grid-cols-3 md:gap-6 pt-8 mb-4">
                  <div class="mt-5 md:mt-0 md:col-span-3">
                    <form>
                      <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-gray-100 sm:p-6 shadow">
                          <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-6">
                              <label
                                for="question-type"
                                class="block text-sm font-medium text-gray-700"
                                >Question Type</label
                              >
                              <SelectInput
                                id="question-type"
                                name="question-type"
                                :items="questionTypes"
                                v-model="questionType"
                              >
                              </SelectInput>
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
                                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                  placeholder="enter question here...."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-100 text-right sm:px-6">
                          <AppButton
                            @click="addQuestion"
                            label="Add Question"
                            :processing="savingQuestion"
                            class="inline-flex cursor-pointer justify-center w-auto px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 sm:text-sm sm:leading-5"
                          >
                          </AppButton>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50  sm:px-6">
              <button
                  v-if="questionPanel == false"
                  type="button"
                  class="inline-flex text-sm leading-4 font-medium rounded text-indigo-700 px-4 py-3 focus:outline-none"
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
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></CancelButton>
          <AppButton
            label="Save Vacancy"
            @click="saveApplicantInfo"
            :processing="processing"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></AppButton>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { PlusSmIcon, TrashIcon } from "@heroicons/vue/solid";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import applicationData from "../../data/applicationForm";
import { useMiscellaneous } from "../../stores/miscellaneous";
import VacancyService from '../../service/vacancies.service';
import VacancySettingService from "../../service/vacancy-settings.service";

const props = defineProps({
  jobId: Number,
});

const {
  questionTypes
} = storeToRefs(useMiscellaneous());

const toast = useToast();
const router = useRouter();
const savingQuestion = ref(false);
const deletingQuestion = ref(false);
const applicantInfo = ref(applicationData);
const questionPanel = ref(false);
const emits = defineEmits(['nextPage']);

const questions = ref([]);
const processing = ref(false);
const question = ref("");
const questionType = ref(0);

function addQuestion() {
  const currentQuestion = {
    job_id: props.jobId,
    question: question.value,
    job_question_type_id: Number(questionType.value)
  };

  savingQuestion.value = true;
  VacancyService.createQuestion(currentQuestion).then(result => {
    const id = result.data.data.id;
    Object.assign(currentQuestion, {id});
    questions.value.push(currentQuestion);
    toast.info('Question successfully added');
    questionPanel.value = !questionPanel.value;
  }).catch(() => {
    toast.error('Unable to add question, please try again later');
  })
  .finally(() => {
    savingQuestion.value = false;
  })
  // questionPanel.value == true
  //   ? (questionPanel.value = false)
  //   : (questionPanel.value = true);
}

function saveApplicantInfo() {
  processing.value = true;
  const payload = {
    phone: "",
    heading: "",
    address: "",
    photo: "",
    education: "",
    experience: "",
    summary: "",
    resume: "",
    cover_letter: "",
  }

  const appFields = [];
  applicantInfo.value.forEach(element => {
    element.fields.forEach(field => {
      appFields.push(field)
    })
  });

  Object.entries(payload).forEach((key) => {
    const fieldValue = appFields.find(item => item.key === key[0]);
    if (fieldValue !== undefined && fieldValue.model === key[0]) payload[key[0]] = "Off";
    if (fieldValue !== undefined && fieldValue.model !== key[0]) payload[key[0]] = fieldValue.model.optionName;
  })

  Object.assign(
    payload,
    {
      job_id: props.jobId,
      firstname: "Mandatory",
      lastname: "Mandatory",
      email: "Mandatory",
      gender: "Mandatory",
      cv: "Off",
      dob: "Mandatory",
    }
  )

  VacancySettingService.create(payload).then(() => {
    toast.success('Application form successfully saved');
    router.push(`detail/${props.jobId}`);
    // router.push({ name: 'VacancyDetail', params: { ...props.jobId } });
    // emits('nextPage');
  }).catch(() => {
    toast.error('Unable to save application form, please try again later');
  }).finally(() => {
    processing.value = false;
  })
}

function setDefault(item) {
  return item.options.length === 1
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
    toast.info('Question successfully deleted');
  }).catch(() => {
    toast.error('Unable to delete question, please try again later');
  })
  .finally(() => {
    deletingQuestion.value = false;
  })
}

</script>

<style></style>
