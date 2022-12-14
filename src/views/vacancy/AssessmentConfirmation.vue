<template>
  <AppModal
    :showModal="showAddConfirmation"
    :processing="processing"
    @closeModal="closeConfirmation"
    @submit="submit"
    title="Assessment Confirmation"
  >
    <div class="grid grid-cols-6">
      <div class="col-span-6">
        <label
          for="duration"
          class="block mb-2 text-sm font-medium text-gray-700"
          >Duration (Minutes)</label
        >
        <NumberInput
          id="duration"
          :error="v$.duration.$error"
          v-model="formData.duration"
        ></NumberInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="pass-score"
          class="block mb-2 text-sm font-medium text-gray-700"
          >Pass Score</label
        >
        <NumberInput
          id="pass-score"
          :error="v$.pass_score.$error"
          v-model="formData.pass_score"
        ></NumberInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="questionNo"
          class="block mb-2 text-sm font-medium text-gray-700"
          >Question Per Candidate</label
        >
        <NumberInput
          id="questionNo"
          :error="v$.questions_per_candidate.$error"
          v-model="formData.questions_per_candidate"
        ></NumberInput>
      </div>
      <div class="col-span-6 mt-2 md:mt-4">
        <label
          for="dueDate"
          class="block mb-2 text-sm font-medium text-gray-700"
          >Deadline</label
        >
        <DatePicker
          id="dueDate"
          :error="v$.deadline.$error"
          v-model="formData.deadline"
        ></DatePicker>
      </div>
      <div class="col-span-6">
        <div class="flex items-start mt-4">
          <div class="flex items-center h-5">
            <input
              type="checkbox"
              v-model="formData.is_timed"
              class="w-4 h-4 mr-3 text-indigo-600 border-gray-300 rounded hover:cursor-pointer focus:ring-indigo-500"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="comments" class="font-medium text-gray-700"
              >Is Timed</label
            >
          </div>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { FormatLongDate } from '../../util/Formatter';
const emits = defineEmits(["toggleDepartment", "save"]);
const props = defineProps({
  toggle: Boolean,
  processing: Boolean,
  assessmentInfo: Object
});

const showAddConfirmation = ref(false);
const formData = ref({
  deadline: '',
  duration: 0,
  is_timed: false,
  pass_score: 0,
  questions_per_candidate: 0,
});

const rules = {
  deadline: { required },
  duration: { required },
  is_timed: { required },
  pass_score: { required },
  questions_per_candidate: { required },
};

const v$ = useVuelidate(rules, formData);

function closeConfirmation() {
  showAddConfirmation.value = false;
  emits("toggleDepartment");
}

async function submit() {
  const valid = await v$.value.$validate();
  if (valid) {
    formData.value.deadline = FormatLongDate(formData.value.deadline);
    emits('save', formData.value);
  }
}

watch(
  () => props.toggle,
  (newValue) => {
    showAddConfirmation.value = newValue;
  }
);

watch(
  () => props.assessmentInfo,
  (value) => {
    if (value !== null) {
      formData.value.duration = value.duration;
      formData.value.is_timed = value.is_timed;
      formData.value.pass_score = value.pass_score;
      formData.value.questions_per_candidate = value.questions_per_candidate;
      formData.value.deadline = value.deadline;
    }
  }
);
</script>

<style></style>
