<template>
  <div class="space-y-8 divide-y divide-gray-200 bg-white">
    <div v-if="showEmptyKit" class="mt-6">
      <button
        type="button"
        @click="toggleEmptyKit()"
        class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
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

    <div v-if="showAddKit" id="newInterviewKit" class="mt-4">
      <div class="md:grid md:grid-cols-12 md:gap-6 pt-8 mb-4">
        <div class="mt-5 md:mt-0 md:col-span-10">
          <div class="px-6 bg-gray-50 shadow">
            <FormInput
              v-model="interviewKit.title"
              placeholder="Interview Name"
            />
          </div>
          <div v-for="(section, index) in sections" :key="section">
            <div class="shadow overflow-hidden sm:rounded-md mb-4">
              <div class="px-4 py-2 bg-gray-50 sm:p-6 shadow">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-6">
                    <input
                      v-model="section.title"
                      type="text"
                      placeholder="Title"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-6">
                    <textarea
                      id="question"
                      v-model="section.question"
                      name="question"
                      rows="5"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Question"
                    />
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-100 sm:px-6">
                <AppButton
                  type="button"
                  @click="saveSection(section)"
                  :disabled="interviewSectionId === 0 || section.title === '' || section.question === ''"
                  class="inline-flex justify-center mr-2 w-auto px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 rounded-md sm:text-sm sm:leading-5"
                >
                  <template v-if="savingQuestion">
                    <div class="loading"><div></div><div></div><div></div><div></div></div>
                    Processing...
                  </template>
                  <template v-if="!savingQuestion">
                    Save Section
                  </template>
                </AppButton>
                <span
                  @click="deleteSection(index)"
                  class="inline-flex cursor-pointer justify-center w-auto px-4 py-2 text-base font-medium leading-6 text-red-700 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                >
                  Delete Section
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <ul>
            <li
              @click="saveInterview"
              class="text-green-700 text-sm cursor-pointer font-medium mb-2"
            >
              Save Interview Kit
            </li>
            <!-- <li @click="openModal()" class="text-indigo-700 text-sm cursor-pointer font-medium mb-2">Preview Interview</li> -->
            <li
              @click="addNewSection"
              class="text-indigo-700 text-sm cursor-pointer font-medium mb-2"
            >
              Add New Section
            </li>
            <li
              @click="deleteInterview"
              :disabled="deletingInterview"
              class="text-red-700 text-sm cursor-pointer font-medium mb-2"
            >
              Delete Interview
            </li>
          </ul>
        </div>
      </div>
    </div>
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
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
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
              class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-7xl sm:w-full sm:p-6"
            >
              <div>
                <div
                  class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
                >
                  <CheckIcon
                    class="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 font-medium text-gray-900"
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
                  class="mt-3 w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-12 sm:text-sm"
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
import { CheckIcon } from "@heroicons/vue/outline";
import VacancyInterviewSectionService from "../../service/vacancy-interview-section.service";
import VacancySectionQuestionService from "../../service/vacancy-interview-section-question.service";

// import { MenuIcon, TrashIcon } from "@heroicons/vue/solid";

const toast = useToast();
const open = ref(false);
const savingQuestion = ref(false);
const savingInterview = ref(false);
const deletingInterview = ref(false);
const showAddKit = ref(false);
const showEmptyKit = ref(true);
const interviewSectionId = ref(0);
const interviewKit = ref({
  title: "",
});

const sections = ref([]);

const props = defineProps({
  interviewId: Number,
});

function toggleEmptyKit() {
  showEmptyKit.value = false;
  showAddKit.value = true;

  let section = {
    title: "",
    question: "",
  };

  sections.value.push(section);
}

function saveInterview() {
  if (interviewKit.value.title !== "") {
    savingInterview.value = true;
    if (interviewSectionId.value === 0) {
      if (sections.value[0].title === "" || sections.value[0].question === "") {
        toast.warning("Please add at least one question");
        savingInterview.value = false;
        return;
      }
      /// save new
      if (sections.value.length > 0) {
        const payload = {
          title: interviewKit.value.title,
          interview_id: props.interviewId,
          questions: sections.value,
        };
        VacancyInterviewSectionService.create(payload)
          .then((result) => {
            console.log(result);
            const { data } = result.data;
            interviewSectionId.value = data.id;
            toast.success("Interview kit successfully saved");
          })
          .catch(() => {})
          .finally(() => {
            savingInterview.value = false;
          });
      }
    }

    if (interviewSectionId.value > 0) {
      /// update
      const payload = {
        title: interviewKit.value.title,
        interview_id: props.interviewId,
      };

      VacancyInterviewSectionService.update(interviewSectionId.value, payload)
        .then(() => {
          toast.success("Interview kit successfully updated");
        })
        .catch(() => {})
        .finally(() => {
          savingInterview.value = false;
        });
    }
    return;
  }

  toast.error("Enter Interview Name");
}

function addNewSection() {
  let section = {
    title: "",
    question: "",
  };
  sections.value.push(section);
}

// function openModal() {
//   open.value = true;
// }

function saveSection(section) {
  savingQuestion.value = true;
  const payload = {
    title: section.title,
    question: section.question,
    interview_section_id: interviewSectionId.value
  }

  if ('id' in section) {
    VacancySectionQuestionService.update(Number(section.id), payload).then(() => {
      toast.info("Question successfully updated");
    }).catch(() => {})
    .finally(() => {
      savingQuestion.value = false;
    })
    return;
  }

  VacancySectionQuestionService.create(payload).then(() => {
    toast.info("Question successfully saved");
  }).catch(() => {})
  .finally(() => {
    savingQuestion.value = false;
  })
}

function deleteSection(index) {
  const section = sections.value[index];
  if ('id' in section) {
    VacancySectionQuestionService.delete(Number(section.id)).then(() => {
      toast.info('Question successfully deleted')
    })
  }
  
  sections.value.splice(index, 1);
  if (sections.value.length == 0 && interviewSectionId.value === 0) {
    showEmptyKit.value = true;
    showAddKit.value = false;
  }
}

function deleteInterview() {
  if (interviewSectionId.value !== 0) {
    deletingInterview.value = true;
    VacancyInterviewSectionService.delete(interviewSectionId.value).then(() => {
      toast.success("Interview kit successfully deleted");
    }).catch(() => {})
    .finally(() => {
      deletingInterview.value = false;
    })
  }
  sections.value = [];
  showEmptyKit.value = true;
  showAddKit.value = false;
}

onMounted(() => {
  if (sections.value.length > 0) {
    showAddKit.value = true;
  }

  // VacancyInterviewSectionService.single(interviewSectionId.value).then(result => {
  //   const { data } = result.data;
  //   interviewKit.value.title = data.title;
  //   sections.value = data.inteview_questions;
  // })
});
</script>
