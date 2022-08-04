<template>
  <div v-if="!loading" class="space-y-8 bg-white divide-y divide-gray-200">
    <div v-if="showEmptyKit" class="mt-6">
      <button
        type="button"
        @click="toggleEmptyKit()"
        class="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400"
      >
        <svg
          class="w-12 h-12 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          No Interview Kits Here
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Get started by creating a new interview kit.
        </p>
      </button>
    </div>

    <div
      v-if="showAddKit"
      id="newInterviewKit"
      class="mt-6 md:grid md:grid-cols-12 md:gap-6"
    >
      <div class="max-h-screen px-4 py-2 space-y-1 overflow-y-auto bg-gray-100 md:col-span-10">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="pt-6 my-4 border-2 rounded shadow bg-gray-50"
        >
          <div class="px-6">
            <FormInput v-model="section.title" placeholder="Section Name" />
          </div>
          <div
            v-for="(questionItem, index) in section.interview_questions"
            :key="index"
          >
            <div class="grid grid-cols-6 gap-4 px-6 pt-4">
              <div class="col-start-1 col-end-7">
                <QuillEditor
                    theme="snow"
                    contentType="html"
                    v-model:content="questionItem.question"
                    id="question"
                    name="question"
                    class="block w-full bg-white border border-gray-300 rounded-md shadow-sm h-28 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Question"
                  />
              </div>
              <div class="col-span-1 col-end-8">
                <div class="flex flex-col ml-2">
                    <SaveIcon
                      v-tooltip="'Save Question'"
                      @click="saveQuestion(section, questionItem, index)"
                      :disabled="questionItem.question === '' || savingQuestion"
                      class="w-5 h-5 mb-2 text-green-500 cursor-pointer"
                    ></SaveIcon>
                    <TrashIcon
                      v-tooltip="'Delete Question'"
                      @click="deleteQuestion(section, index)"
                      class="w-5 h-5 text-red-500 cursor-pointer"
                    ></TrashIcon>
                  </div>
              </div>
            </div>
            <div class="px-6 py-3">
              <div class="flex flex-row col-start-1 col-end-7">
                  <!-- <textarea
                    id="question"
                    v-model="questionItem.question"
                    name="question"
                    rows="2"
                    class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Question"
                  /> -->
                </div>
            </div>
          </div>
          <div class="flex flex-row px-6 mt-3 mb-4 text-sm text-green-700">
            <PlusCircleIcon class="w-5 h-5 mr-1"></PlusCircleIcon>
            <a class="cursor-pointer" @click="addNewQuestion(index)"
              >Add new question</a
            >
          </div>
          <div class="p-4 px-6">
            <AppButton
              type="button"
              :processing="savingSection"
              @click="saveSection(section, index)"
              class="inline-flex justify-center w-auto px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 rounded-md sm:text-sm sm:leading-5"
            >
              Save Section
            </AppButton>
            <span
              @click="deleteSection(index)"
              class="inline-flex justify-center w-auto px-4 py-2 text-base font-medium leading-6 text-red-700 transition duration-150 ease-in-out cursor-pointer sm:text-sm sm:leading-5"
            >
              Delete Section
            </span>
          </div>
        </div>
      </div>
      <div class="md:col-span-2">
        <ul>
          <li
            @click="addNewSection"
            class="mt-4 mb-2 text-sm font-medium text-green-600 cursor-pointer"
          >
            Add a new section
          </li>
          <li
            @click="addNewSection"
            class="mt-4 mb-2 text-sm font-medium text-blue-600 cursor-pointer"
          >
            Preview interview kit
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-if="loading">
    <SkeletonLoading v-for="n in 5" :key="n"></SkeletonLoading>
  </div>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-7xl sm:w-full sm:p-6"
            >
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full"
                >
                  <CheckIcon
                    class="w-6 h-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Interview Preview
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Eius aliquam laudantium explicabo pariatur iste dolorem
                      animi vitae error totam. At sapiente aliquam accusamus
                      facere veritatis.
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="mt-5 sm:mt-6 sm:grid sm:grid-cols-12 sm:gap-3 sm:grid-flow-row-dense"
              >
                <button
                  type="button"
                  class="inline-flex justify-center w-auto px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-12 sm:text-sm"
                  @click="open = false"
                  ref="cancelButtonRef"
                >
                  Done
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { PlusCircleIcon } from "@heroicons/vue/solid";
import { SaveIcon, CheckIcon, TrashIcon } from "@heroicons/vue/outline";
import InterviewService from "../../service/interview.service";
import VacancyInterviewSectionService from "../../service/vacancy-interview-section.service";
import VacancySectionQuestionService from "../../service/vacancy-interview-section-question.service";

// import { MenuIcon, TrashIcon } from "@heroicons/vue/solid";

const toast = useToast();

const open = ref(false);
const loading = ref(false);
const savingQuestion = ref(false);
const savingSection = ref(false);
const deletingSection = ref(false);
const showAddKit = ref(false);
const showEmptyKit = ref(true);
const interviewSectionId = ref(0);
const interviewKit = ref(null);

const sections = ref([]);

const props = defineProps({
  interviewId: Number,
});

function toggleEmptyKit() {
  showEmptyKit.value = false;
  showAddKit.value = true;

  let section = {
    id: 0,
    title: "",
    interview_questions: [
      {
        id: 0,
        title: "",
        question: "",
      },
    ],
  };

  sections.value.push(section);
}

function saveSection(section, index) {
  if (section.title !== "") {
    savingSection.value = true;
    if (section.id === 0) {
      if (
        // section.questions[0].title === "" ||
        section.interview_questions[0].question === ""
      ) {
        toast.warning("Please add at least one question");
        savingSection.value = false;
        return;
      }
      /// save new
      const payload = {
        title: section.title,
        interview_id: props.interviewId,
        questions: section.interview_questions,
      };

      VacancyInterviewSectionService.create(payload)
        .then((response) => {
          const { data } = response.data;
          sections.value[index].id = data.id;
          sections.value[index].interview_questions = [];
          sections.value[index].interview_questions = data.interview_questions;
          toast.success("Interview section successfully saved");
        })
        .catch(() => {})
        .finally(() => {
          savingSection.value = false;
        });
    }

    if (section.id > 0) {
      /// update
      const payload = {
        title: section.title,
        interview_id: props.interviewId,
      };

      VacancyInterviewSectionService.update(section.id, payload)
        .then(() => {
          toast.success("Interview section successfully updated");
        })
        .catch(() => {})
        .finally(() => {
          savingSection.value = false;
        });
    }
    return;
  }

  toast.error("Enter Section Name");
}

function addNewSection() {
  let section = {
    id: 0,
    title: "",
    interview_questions: [
      {
        id: 0,
        title: "",
        question: "",
      },
    ],
  };
  sections.value.push(section);
}

function addNewQuestion(sectionIndex) {
  let question = {
    id: 0,
    title: "",
    question: "",
  };
  sections.value[sectionIndex].interview_questions.push(question);
}

// function openModal() {
//   open.value = true;
// }

function saveQuestion(section, question, questionIndex) {
  if (question.question === "") return;
  savingQuestion.value = true;
  const payload = {
    title: question.title,
    question: question.question,
    interview_section_id: section.id,
  };

  if (question.id > 0) {
    VacancySectionQuestionService.update(Number(question.id), payload)
      .then(() => {
        toast.info("Question successfully updated");
      })
      .catch(() => {})
      .finally(() => {
        savingQuestion.value = false;
      });
    return;
  }

  VacancySectionQuestionService.create(payload)
    .then((response) => {
      const { data } = response.data;
      const index = sections.value.indexOf(section);
      sections.value[index].interview_questions[questionIndex].id = data.id;
      toast.info("Question successfully saved");
    })
    .catch(() => {})
    .finally(() => {
      savingQuestion.value = false;
    });
}

function deleteQuestion(section, index) {
  const getQuestion = section.interview_questions[index];
  if ("id" in getQuestion) {
    if (getQuestion.id !== 0) {
      VacancySectionQuestionService.delete(Number(getQuestion.id)).then(() => {
        toast.info("Question successfully deleted");
      });
    }
  }

  section.interview_questions.splice(index, 1);

  // if (section.questions.value.length == 0 && interviewSectionId.value === 0) {
  //   showEmptyKit.value = true;
  //   showAddKit.value = false;
  // }
}

function deleteSection(index) {
  const section = sections.value[index];

  if (section.id !== 0) {
    deletingSection.value = true;
    VacancyInterviewSectionService.delete(section.id)
      .then(() => {
        toast.success("Section successfully deleted");
      })
      .catch(() => {})
      .finally(() => {
        deletingSection.value = false;
      });
  }

  sections.value.splice(index, 1);
  if (sections.value.length === 0) {
    showEmptyKit.value = true;
    showAddKit.value = false;
  }
}

function getVacancyInterviewSections(id) {
  loading.value = true;
  InterviewService.getVacancyInterview(id)
    .then((response) => {
      const { data } = response.data;
      interviewKit.value = data;
      sections.value = data.interview_sections;
      if (sections.value.length > 0) {
        showAddKit.value = true;
        showEmptyKit.value = false;
      }
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  if (sections.value.length > 0) {
    showAddKit.value = true;
  }

  getVacancyInterviewSections(Number(props.interviewId));
});
</script>
