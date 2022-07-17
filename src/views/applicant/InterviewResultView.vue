<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-md">
    <h3 v-if="items.length === 0" class="p-8 text-center text-md">
      No interview result(s) found
    </h3>
    <ul v-if="items.length > 0" role="list" class="divide-y divide-gray-200">
      <li v-for="item in items" :key="item.id">
        <a href="#" class="block hover:bg-gray-50">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-indigo-600 truncate">
                {{ item.interview.title }}
              </p>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="flex-col sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  Feedback:
                  <b class="ml-2">{{ item.feedback }}</b>
                </p>
                <p class="flex items-center mt-2 text-sm text-gray-500 sm:mt-0">
                  Score
                  <b class="ml-2">{{ item.score }}</b>
                </p>
              </div>
              <div
                class="flex flex-col items-end mt-2 text-sm text-gray-500 sm:mt-0"
              >
                <p>
                  From {{ FormatLongDate(item.start_time) }} to
                  {{ FormatLongDate(item.end_time) }}
                </p>
                <AppButton
                  loading-text="loading.."
                  :processing="processing"
                  @click="openResultDetail(item.id)"
                  class="mt-2 text-md"
                  >View Detail</AppButton
                >
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <AppModal
    :showModal="showResult"
    @closeModal="showResult = false"
    :show-submit-button="false"
    title="Interview Result Detail"
  >
    <div class="">
      <p>
        Feedback: <b>{{ results.feedback }}</b>
      </p>
      <dl
        class=""
        v-for="feedback in results.applicant_interview_feedbacks"
        :key="feedback.id"
      >
        <div
          class="px-2 py-1 pb-3 mb-1 bg-white border-b border-gray-200 sm:px-6"
        >
          <div
            class="flex flex-wrap items-center justify-between -ml-2 sm:flex-nowrap"
          >
            <div class="">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ feedback.interview_section.title }}
              </h3>
            </div>
            <div class="flex-shrink-0 ml-4">
              <star-rating
                disabled="true"
                starSize="20"
                v-model="feedback.rating"
              />
            </div>
          </div>
          <div
            v-for="(question, index) in feedback.interview_section
              .interview_questions"
            :key="question.id"
            class="flex flex-col w-full"
          >
            <p class="mt-2 text-xs text-gray-700">
              <b>{{ ++index }}.</b>
              {{ question.question }}
            </p>
          </div>
        </div>
      </dl>
    </div>
  </AppModal>
</template>

<script setup>
import { ref } from "vue";
import { FormatLongDate } from "../../util/Formatter";
import InterviewService from "../../service/interview.service";
import AppModal from "../../components/commons/modal/AppModal.vue";

defineProps({
  items: Array,
});

const showResult = ref(false);
const processing = ref(false);
const results = ref(null);

function openResultDetail(id) {
  console.clear();
  processing.value = true;
  InterviewService.singleByInterviewId(id)
    .then((response) => {
      results.value = response.data.data;
      showResult.value = true;
    })
    .catch(() => {})
    .finally(() => {
      processing.value = false;
    });
}
</script>
