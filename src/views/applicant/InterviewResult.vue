<template>
  <AppModal
    :showModal="showResultsModal"
    @closeModal="closeApplicantResult"
    :showSubmitButton="false"
    title="Interview Results"
  >
    <div class="grid grid-cols-6">
      <div class="col-span-6">
        <div class="flex flex-col" v-for="result in results" :key="result.id">
          <div class="pb-2 mb-2 text-sm border-b">
            <h5>Feedback: {{result.feedback}}</h5>
            <h4>Score: {{result.score}}</h4>
            <p>Start time: {{FormatLongDate(result.start_time)}}</p>
            <p>End time: {{FormatLongDate(result.end_time)}}</p>
          </div>
        </div>
      </div>
    </div>
  </AppModal>
</template>
<script setup>
import { ref, watch } from "vue";
import { FormatLongDate } from '../../util/Formatter'
const emits = defineEmits(["toggleResultModal"]);
const props = defineProps({
  results: Array,
  toggle: Boolean,
});

const showResultsModal = ref(false);

watch(
  () => props.toggle,
  (newValue) => {
    showResultsModal.value = newValue;
  }
);

function closeApplicantResult() {
  showResultsModal.value = false;
  emits("toggleResultModal");
}
</script>
